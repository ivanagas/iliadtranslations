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
    <div>
      <h1>Here's a list of every comparison</h1>
      <ul>
        {comparisonList.map((comparison) => (
          <li>
            <Link href={`/compare/${comparison}`}>{comparisons[comparison].name}</Link>
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
