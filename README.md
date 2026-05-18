## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Python environment

The scripts use the Anthropic SDK. Set up:

```bash
uv venv env --python 3.11
source env/bin/activate
uv pip install anthropic python-dotenv
```

Then add your key to `.env`:

```
ANTHROPIC_API_KEY=sk-ant-...
```

## Add a new translation

1. Activate the virtual environment: `source env/bin/activate`
2. Edit `add_translator.py` and set `name = "<Translator Name>"`.
3. Run `python add_translator.py`. It scaffolds an entry in `new_translators.json`.
4. Diff against `translators.json` and copy over when satisfied.
5. Fill in `year`, `tags`, and `links` by hand.
6. Add the five passages by searching the translation for:
   - Book 1, intro (lines 1-14)
   - Book 5, Athena to Diomedes about Tydeus (line ~800)
   - Book 6, the leaves simile (line ~145)
   - Book 9, two fates / glory speech (line ~410)
   - Book 21, Achilles to Lycaon (line ~99)
7. Run `python generate_descriptions.py` to generate the new description (and refresh existing ones).
8. Run `python generate_comparisons.py` to generate pairwise comparisons with the new translator. `SKIP_EXISTING = True` means only new pairs are generated.
9. Both scripts write to `*.staging.json` files. Diff against the live JSON, then copy over when satisfied.
10. Commit.

## Regenerate all descriptions and comparisons

To force a full regenerate (not just new entries):

- `python generate_descriptions.py` always rewrites every description.
- For comparisons, set `SKIP_EXISTING = False` in `generate_comparisons.py` and delete `comparisons.staging.json` first.

The Greek passages used as context for both scripts live in `passages.json`.
