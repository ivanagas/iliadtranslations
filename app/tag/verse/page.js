import fs from 'fs'
import Link from 'next/link'

export const metadata = {
  title: 'Verse Translations of the Iliad',
  description: 'A list of free Iliad translations by Homer.',
}

export default async function DetailsList() {
  const data = await getData()
  const translators = Object.keys(data)

  return (
    <div className="main">
      <h1>Verse Iliad Translations</h1>
      <p>Here is a list of Iliad translations written in verse. Verse refers to lines of writing arranges in a specific metrical and rhythmic pattern, such as stress and unstressed syllables or rhymes.</p>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link href={`/details/${translator}`}>{data[translator].translator}</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Home</Link>
    </div>
  )
}

async function getData() {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);

  const freeTranslations = {};

  for (const translationKey in jsonData) {
    if (jsonData.hasOwnProperty(translationKey)) {
      const translation = jsonData[translationKey];
      if (translation.tags.includes('verse')) {
        freeTranslations[translationKey] = translation;
      }
    }
  }

  return freeTranslations;
}
