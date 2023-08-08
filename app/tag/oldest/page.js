import fs from 'fs'
import Link from 'next/link'

export const metadata = {
  title: 'Oldest Translations of the Iliad',
  description: 'A list of the oldest Iliad translations by Homer.',
}

export default async function DetailsList() {
  const data = await getData()
  const translators = Object.keys(data)

  return (
    <div className="main">
      <h1>Oldest Iliad Translations</h1>
      <p>Here is a list of the Iliad sorted oldest to newest. Remember that older does not always mean better.</p>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link href={`/details/${translator}`}>{data[translator].translator}</Link> - {data[translator].year}
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

  const sortedKeys = Object.keys(jsonData).sort((a, b) => jsonData[a].year - jsonData[b].year);
  const sortedTranslations = {};

  for (const key of sortedKeys) {
    sortedTranslations[key] = jsonData[key];
  }

  return sortedTranslations;
}
