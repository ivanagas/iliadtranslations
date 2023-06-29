# activate env with: source env/bin/activate

import json
import os
from itertools import combinations
from dotenv import load_dotenv
import openai

# load data.json
with open('data.json') as json_file:
  data = json.load(json_file)

# create a list of unique translator pairs

translators = data.keys()

unique_pairs = list(combinations(translators, 2))

# comparsions_json = {
#     f"{entry[0]}-vs-{entry[1]}": {
#       "name": f"{entry[0].capitalize()} vs {entry[1].capitalize()}",
#       "description": "Placeholder"
#     }
#     for entry in unique_pairs
# }

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# response = {
#   "id": "chatcmpl-7V860EgjdVQnUzrve1pmdiRJpRNvR",
#   "object": "chat.completion",
#   "created": 1687653644,
#   "model": "gpt-3.5-turbo-0301",
#   "choices": [
#     {
#       "index": 0,
#       "message": {
#         "role": "assistant",
#         "content": "Robert Fagles' translation of the Iliad is a poetic masterpiece that captures the timeless tale of Achilles' wrath and the Trojan War with stunning clarity and vivid imagery."
#       },
#       "finish_reason": "stop"
#     }
#   ],
#   "usage": {
#     "prompt_tokens": 24,
#     "completion_tokens": 35,
#     "total_tokens": 59
#   }
# }

comparsions_json = {}

for entry in unique_pairs:
  comparison_key = f"{entry[0]}-vs-{entry[1]}"
  print(f'Generating comparison for {comparison_key}...')

  prompt = f"Write a one sentence summary comparing the Iliad translations of {entry[0].capitalize()} and {entry[1].capitalize()}."

  response = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[
      {"role": "system", "content": "You are an expert scholar on the Iliad by Homer."},
      {"role": "user", "content": prompt}
    ]
  )

  response_content = response["choices"][0]["message"]["content"]
  
  comparsions_json[comparison_key] = {
    "name": f"{entry[0].capitalize()} vs {entry[1].capitalize()}",
    "description": response_content
  }

# Create a new JSON file with the unique comparisons of translators
print(comparsions_json)
with open('ai_comparisons.json', 'w') as outfile:
  json.dump(comparsions_json, outfile)
