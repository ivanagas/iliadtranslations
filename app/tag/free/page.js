import fs from 'fs'
import Link from 'next/link'

export const metadata = {
  title: 'Free Translations of the Iliad',
  description: 'A list of free Iliad translations by Homer.',
}

export default async function DetailsList() {
  const data = await getData()
  const translators = Object.keys(data)

  return (
    <div className="main">
      <h1>Free Iliad Translations</h1>
      <p>Here is a list of freely available copies of the Iliad online. Many of these are hosted by Universities, others by Gutenberg or Internet Archive.</p>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link href={`/details/${translator}`}>{data[translator].translator}</Link> - <Link href={data[translator].links.online}>Read</Link>
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
      if (translation.tags.includes('free')) {
        freeTranslations[translationKey] = translation;
      }
    }
  }

  return freeTranslations;
}
