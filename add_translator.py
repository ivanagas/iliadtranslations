# Scaffolds a new translator entry in translators.json with empty placeholder fields.
# Update `name` below, run the script, then fill in year, links, and quotes by hand.
# The `description` field is left blank — generate_descriptions.py will fill it in.
#
# Run:
#   python add_translator.py

import json
import sys

name = "Michael Reck"

with open('translators.json', 'r') as file:
    data = json.load(file)

name_key = name.lower().split()[-1]

if name_key in data:
    print(f"Entry for {name} already exists.")
    sys.exit(0)

new_entry = {
    "translator": name,
    "year": 1900,
    "tags": [],
    "links": {
        "amazon": "",
        "online": ""
    },
    "description": "",
    "quotes": {
        "Book 1 - Intro": "",
        "Book 5 - Athena encourages Diomedes": "",
        "Book 6 - Leaves": "",
        "Book 9 - Glory or long life": "",
        "Book 21 - Moaning about death": ""
    }
}

data[name_key] = new_entry

with open('new_translators.json', 'w') as new_outfile:
    json.dump(data, new_outfile, indent=2)

print(f"New entry added for {name}. Wrote new_translators.json — review and copy over translators.json when ready.")
