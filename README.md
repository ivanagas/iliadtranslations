## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Python

To activate virtual environment:

```bash
source env/bin/activate
```

## Add new translation

1. Activate virtual environment
2. Update `add_translation.py` with new translator name.
3. Run `python add_translator.py`
4. Check that no unintended changes were made.
5. Add quotes by searching:
  - Book 1, intro
  - Book 5, "Tydeus" look towards end of book (line ~815)
  - Book 6, "Leaves" (line ~145)
  - Book 9, Thetis, fate, glory (line ~410)
  - Book 21, Patroclus (line ~95)
6. Update date, links
7. Run `python generate_comparisons.py`
8. Check that no unintended changes were made.
9. Commit changes.
