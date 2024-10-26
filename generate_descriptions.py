import json
import os
from dotenv import load_dotenv
import openai

openai_generate = True

with open('translators.json', 'r') as f:
  translators = json.load(f)

  load_dotenv()
  openai.api_key = os.getenv("OPENAI_API_KEY")

  for translator in translators:
    print(f'Generating description for {translator}...')
    translator_data = translators[translator]

    prompt = f"""I want you to generate a one paragraph description of {translator_data['translator']}'s translation of the Iliad of Homer. Focus on the translation style and how it compares to other translations.
    Use your knowledge of the translator and their translation of the Iliad as well as the selection of quotes below.
    The description should be written in a simple, direct, accessible style for a general and not poetic or academic. It should be concise and to the point.
    It should be factually accurate. Do not make up information you do not know about the translators or their translation of the Iliad.
    Here are a selection of quotes from {translator_data['translator']}'s translation of the Iliad: {translator_data['quotes']}"""

    if openai_generate:
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

    translators[translator]['description'] = response_content

    with open('translators.json', 'r+') as file:
      existing_data = json.load(file)
      existing_data[translator]['description'] = response_content
      file.seek(0)
      json.dump(existing_data, file)
      file.truncate()