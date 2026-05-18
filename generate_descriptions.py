# Regenerates the `description` field for every translator in translators.json.
# Output is written to translators.staging.json so you can diff before committing.
#
# Setup:
#   source env/bin/activate
#   pip install anthropic python-dotenv
#   echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env
#
# Run:
#   python generate_descriptions.py

import json
import os
from dotenv import load_dotenv
import anthropic

MODEL = "claude-opus-4-7"
INPUT_FILE = "translators.json"
PASSAGES_FILE = "passages.json"
OUTPUT_FILE = "translators.staging.json"

SYSTEM_PROMPT = (
    "You are a comparative-literature reviewer helping a general reader choose "
    "between English translations of Homer's Iliad. You write in plain, direct "
    "prose — never poetic, never academic."
)

PROMPT_TEMPLATE = """Write one paragraph (~120 words) describing this English translation of the Iliad for a reader deciding which version to read.

Translator: {name}
Year: {year}
Tags: {tags}

Five passages from this translation, each shown alongside the Greek original:

{passages_block}

Cover:
- verse form, rhythm, line length (or prose, if prose)
- diction: archaic vs. modern, plain vs. ornamented
- how the translator handles the gap between Greek and English — point to a specific choice visible in one of the passages above
- who this translation suits

You may include brief, relevant background about the translator (era, training, stated approach, reception) where you are confident. If you are not certain of a fact, omit it. Do not invent biographical or reception detail.

Rules:
- Ground stylistic claims in the passages shown.
- One paragraph, around 120 words. Plain prose.
- No hedging ("perhaps", "arguably"), no concluding summary sentence.

Voice rules. Avoid AI-generated patterns:
- No reframe. Do not reject one frame to assert another. Banned shapes: "not X but Y", "less X, more Y", "it is not about X, it is about Y", "where a literal version would give X, this gives Y", "while X may seem... it actually...". State the positive claim directly.
- No rule of three. If two qualities matter, name two. Do not pad to three for rhythm.
- No metaphor verbs for abstract work. Do not say a translation is carved out, distilled, crystallized, sharpened, stripped back, sanded down, woven, threaded, anchored, molded, stitched together, layered, surfaced, amplified, channeled. Use literal verbs: cuts, removes, adds, changes, shows, names, repeats.
- No analogies. No "like X", "as if", "functions as", "a lens for", "a bridge between", "the engine of".
- No bloated verbs. Use "is" and "has", not "serves as", "stands as", "marks a", "boasts a", "represents a", "offers a".
- Banned vocabulary: delve, realm, intricate, intricacies, crucial, pivotal, meticulous, vibrant, underscore, leverage, testament, highlight, emphasize, showcase, foster, holistic, accentuate, transformative, seamless, elevate, immersive, dynamic, captivate, interplay, robust, nuanced, resonant.
- No em dashes. Use commas, periods, colons, or parentheses.
- No dead transitions: furthermore, additionally, moreover, that said.
- Vary sentence length. Mix short and long."""


def build_passages_block(translator_quotes, passages):
    blocks = []
    for passage_name, passage in passages.items():
        quote = translator_quotes.get(passage_name, "").strip()
        if not quote:
            continue
        greek = passage.get("greek", "").strip() or "(Greek not yet provided)"
        blocks.append(
            f"Passage: {passage_name} (Iliad {passage['lines']})\n"
            f"Greek:\n{greek}\n\n"
            f"Translation:\n{quote}"
        )
    return "\n\n---\n\n".join(blocks)


def main():
    load_dotenv()
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    with open(INPUT_FILE) as f:
        translators = json.load(f)
    with open(PASSAGES_FILE) as f:
        passages = json.load(f)

    # Start from a fresh copy so partial runs are committable.
    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE) as f:
            output = json.load(f)
    else:
        output = json.loads(json.dumps(translators))

    limit = int(os.environ.get("LIMIT", 0)) or len(translators)

    for i, (key, data) in enumerate(translators.items()):
        if i >= limit:
            break
        print(f"Generating description for {key} ({i + 1}/{limit})...")

        passages_block = build_passages_block(data.get("quotes", {}), passages)
        prompt = PROMPT_TEMPLATE.format(
            name=data["translator"],
            year=data.get("year", "unknown"),
            tags=", ".join(data.get("tags", [])) or "none",
            passages_block=passages_block,
        )

        response = client.messages.create(
            model=MODEL,
            max_tokens=600,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        description = response.content[0].text.strip()

        output[key]["description"] = description

        with open(OUTPUT_FILE, "w") as f:
            json.dump(output, f, indent=2)

    print(f"Done. Review {OUTPUT_FILE} and copy over {INPUT_FILE} when satisfied.")


if __name__ == "__main__":
    main()
