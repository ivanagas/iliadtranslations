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
    <div className="max-w-2xl mx-auto">
      <Link className='underline hover:text-red-900 my-3' href="/">Go Home</Link>
      <h1 className='text-5xl my-5'>All Iliad Translations by Author</h1>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link 
              href={`/details/${translator}`}
              className='underline hover:text-red-900'
            >
              {data[translator].translator}
            </Link>
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
