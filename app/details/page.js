import fs from 'fs'
import Link from 'next/link'

export const metadata = {
  title: 'A List of Iliad Translations',
  description: 'A list of Iliad translations.',
}

export default async function DetailsList() {
  const data = await getData()
  const translators = Object.keys(data)

  return (
    <div>
      <h1>Here is a list of all the Iliad Translations</h1>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link href={`/details/${translator}`}>{data[translator].translator}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getData() {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);
  return jsonData;
}
