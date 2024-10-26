# activate env with: source env/bin/activate

import json
import os
from itertools import combinations
from dotenv import load_dotenv
import openai

skip_existing = True
openai_generate = True

# load translators.json
with open('translators.json') as translator_data_file, open('comparisons.json') as comparison_data_file:
  translator_data = json.load(translator_data_file)
  comparison_data = json.load(comparison_data_file)

# Create a list of unique translator pairs
translators = translator_data.keys()
unique_pairs = list(combinations(translators, 2))

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

comparsions_json = {}

# Option to start at a different index
start_index = 0

for index, entry in enumerate(unique_pairs[start_index:], start=start_index):
  print(f"Processing pair {index + 1} of {len(unique_pairs)}")
  comparison_key = f"{entry[0]}-vs-{entry[1]}"
  alt_comparison_key = f"{entry[1]}-vs-{entry[0]}"

  # Skip if comparison already exists
  if skip_existing and (comparison_key in comparison_data or alt_comparison_key in comparison_data):
    print(f'Comparison for {comparison_key} already exists. Skipping...')
    comparsions_json[comparison_key] = comparison_data[comparison_key]
    continue
  
  # Get the translator name and quote for each entry
  entry_0_name = translator_data[entry[0]]["translator"]
  entry_1_name = translator_data[entry[1]]["translator"]

  entry_0_quote = next(iter(translator_data[entry[0]]["quotes"].items()))[1]
  entry_1_quote = next(iter(translator_data[entry[1]]["quotes"].items()))[1]

  if not entry_0_quote or not entry_1_quote or not entry_0_name or not entry_1_name:
    print(f'Could not find quote or name for {entry[0]} or {entry[1]}. Skipping...')
    continue

  if openai_generate:
    # Generate comparison
    print(f'Generating comparison for {comparison_key}...')

    prompt = f"""I want you to generate a two paragraph summary comparing two different translations of the Iliad of Homer. 
    The two translations are {entry_0_name} and {entry_1_name}.
    Use your knowledge of both authors and their translations of the Iliad as well as the selection of quotes below.
    The summary should be written in a simple, direct, accessible style for a general and not poetic or academic. It should be concise and to the point
    It should be factually accurate. Do not make up information you do not know about the translators or their translation of the Iliad.
    The summary should be written in a neutral tone and not favor one translation over the other.
    Here are a selection of quotes from {entry_0_name}'s translation of the Iliad: {translator_data[entry[0]]['quotes']} 
    Here are a selection of the same quotes from {entry_1_name}'s translation of the Iliad: {translator_data[entry[1]]['quotes']}"""

    response = openai.ChatCompletion.create(
      model="gpt-4o",
      messages=[
        {"role": "system", "content": "You are an expert scholar on the Iliad by Homer."},
        {"role": "user", "content": prompt}
      ]
    )
    response_content = response["choices"][0]["message"]["content"]
  else:
    response_content = "This is a placeholder description."
  
  comparsions_json[comparison_key] = {
    "name": f"{entry[0].capitalize()} vs {entry[1].capitalize()}",
    "description": response_content
  }

  # Add the new entry to the existing JSON file with comparisons of translators
  with open('comparisons.json', 'r+') as file:
    existing_data = json.load(file)
    existing_data.update(comparsions_json)
    file.seek(0)
    json.dump(existing_data, file)
    file.truncate()
  