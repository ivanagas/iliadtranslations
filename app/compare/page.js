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
    <div className="main">
      <h1>Here is a list of every comparison</h1>
      <ul>
        {comparisonList.map((comparison) => (
          <li key={comparison}>
            <Link href={`/compare/${comparison}`}>{comparisons[comparison].name}</Link>
          </li>
        ))}
      </ul>
      <Link href="/">Home</Link>
    </div>
  )
}

async function getData() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);

  return jsonData;
}
