# Regenerates the pairwise comparisons of every translator combination.
# Output is written to comparisons.staging.json so you can diff before committing.
#
# Setup:
#   source env/bin/activate
#   pip install anthropic python-dotenv
#   echo "ANTHROPIC_API_KEY=sk-ant-..." >> .env
#
# Run:
#   python generate_comparisons.py

import json
import os
from itertools import combinations
from dotenv import load_dotenv
import anthropic

MODEL = "claude-sonnet-4-6"
TRANSLATORS_FILE = "translators.json"
PASSAGES_FILE = "passages.json"
OUTPUT_FILE = "comparisons.staging.json"
SKIP_EXISTING = True  # set False to force regeneration of every pair

SYSTEM_PROMPT = (
    "You are a comparative-literature reviewer helping a general reader choose "
    "between English translations of Homer's Iliad. You write in plain, direct "
    "prose — never poetic, never academic. You never declare one translation "
    "better than another."
)

PROMPT_TEMPLATE = """Compare these two English translations of the Iliad for a reader deciding between them.

Translation A: {name_a} ({year_a}; tags: {tags_a})
Translation B: {name_b} ({year_b}; tags: {tags_b})

For each passage below, you have the Greek original and both translations:

{passages_block}

Write two paragraphs, ~120 words each.

Paragraph 1 — Form and diction: verse vs. prose, line length, register (archaic / contemporary / colloquial), rhythm. Cite at least one specific passage from above and quote a short phrase from each translation to illustrate.

Paragraph 2 — Approach to the Greek: what each translation prioritises (fidelity, readability, performance, scholarship) and what each gains and loses. Cite at least one specific passage.

You may include brief, relevant background about either translator (era, training, stated approach, reception) where you are confident. If you are not certain of a fact, omit it. Do not invent biographical or reception detail.

Rules:
- Neutral tone. Do not declare one better.
- Ground stylistic claims in the passages above.
- Two paragraphs, around 120 words each. Plain prose.
- No hedging, no concluding "in summary" sentence.

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


def build_passages_block(quotes_a, quotes_b, passages):
    blocks = []
    for passage_name, passage in passages.items():
        qa = quotes_a.get(passage_name, "").strip()
        qb = quotes_b.get(passage_name, "").strip()
        if not qa or not qb:
            continue
        greek = passage.get("greek", "").strip() or "(Greek not yet provided)"
        blocks.append(
            f"Passage: {passage_name} (Iliad {passage['lines']})\n"
            f"Greek:\n{greek}\n\n"
            f"A:\n{qa}\n\n"
            f"B:\n{qb}"
        )
    return "\n\n---\n\n".join(blocks)


def main():
    load_dotenv()
    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))

    with open(TRANSLATORS_FILE) as f:
        translators = json.load(f)
    with open(PASSAGES_FILE) as f:
        passages = json.load(f)

    if os.path.exists(OUTPUT_FILE):
        with open(OUTPUT_FILE) as f:
            output = json.load(f)
    else:
        output = {}

    pairs = list(combinations(translators.keys(), 2))
    print(f"{len(pairs)} pairs to process.")

    for index, (a, b) in enumerate(pairs, start=1):
        key = f"{a}-vs-{b}"
        alt_key = f"{b}-vs-{a}"

        if SKIP_EXISTING and (key in output or alt_key in output):
            print(f"[{index}/{len(pairs)}] {key} exists, skipping.")
            continue

        data_a = translators[a]
        data_b = translators[b]

        passages_block = build_passages_block(
            data_a.get("quotes", {}),
            data_b.get("quotes", {}),
            passages,
        )

        prompt = PROMPT_TEMPLATE.format(
            name_a=data_a["translator"],
            year_a=data_a.get("year", "unknown"),
            tags_a=", ".join(data_a.get("tags", [])) or "none",
            name_b=data_b["translator"],
            year_b=data_b.get("year", "unknown"),
            tags_b=", ".join(data_b.get("tags", [])) or "none",
            passages_block=passages_block,
        )

        print(f"[{index}/{len(pairs)}] generating {key}...")
        response = client.messages.create(
            model=MODEL,
            max_tokens=900,
            system=SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}],
        )
        description = response.content[0].text.strip()

        output[key] = {
            "name": f"{a.capitalize()} vs {b.capitalize()}",
            "description": description,
        }

        with open(OUTPUT_FILE, "w") as f:
            json.dump(output, f, indent=2)

    print(f"Done. Review {OUTPUT_FILE} and copy over comparisons.json when satisfied.")


if __name__ == "__main__":
    main()
