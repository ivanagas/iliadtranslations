import fs from 'fs';
import Link from 'next/link';

export const metadata = {
  title: 'Comparisons of Iliad Translations',
  description: 'A list of comparisons of Iliad translations.',
}

export default async function ComparisonList() {
  const comparisons = await getData();

  const comparisonList = Object.keys(comparisons);

  return (
    <div className="max-w-2xl mx-auto">
      <Link className='underline hover:text-red-900 my-3' href="/">Go Home</Link>
      <h1 className='text-5xl my-5'>All Comparisons of Iliad Translations</h1>
      <ul className='grid grid-cols-2'>
        {comparisonList.map((comparison) => (
          <li key={comparison}>
            <Link 
              href={`/compare/${comparison}`}
              className='underline hover:text-red-900'
            >
              {comparisons[comparison].name}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

async function getData() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);

  return jsonData;
}
