import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'

export default async function Comparisons({ params }) {
  const { slug } = params
  
  const data = await getData(slug)
  const comparison = await getComparisonData(slug)

  const t1 = data[Object.keys(data)[0]]
  const t2 = data[Object.keys(data)[1]]

  return (
    <div>
      <h1>{t1.translator} vs {t2.translator} Iliad Translation Comparison</h1>
      <h2>Years: {t1.year} and {t2.year}</h2>
      <p>{comparison.description}</p>
      
      <h2>Passage comparison</h2>
      <p>A row of buttons to select from available passages</p>
      <Selector data={data}></Selector>
      
      <h2>Details</h2>
      <ul>
        <li>
          <Link href={`/details/${Object.keys(data)[0]}`}>
            {t1.translator}
          </Link>
        </li>
        <li>
          <Link href={`/details/${Object.keys(data)[1]}`}>
            {t2.translator}
          </Link>
        </li>
      </ul>
    </div>
  )
}

async function getData(slug) {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);
  const translators = slug.split("-vs-")

  const filteredJson = Object.keys(jsonData)
  .filter(key => translators.includes(key))
  .reduce((result, key) => {
    result[key] = jsonData[key];
    return result;
  }, {});

  return filteredJson
}

async function getComparisonData(slug) {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);
  const comparison = jsonData[slug];

  return comparison
}

export async function generateStaticParams() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);
  const comparisons = Object.keys(jsonData);
 
  return comparisons
}

export async function generateMetadata({ params }) {
  const data = await getData(params.slug)
  const compare = await getComparisonData(params.slug)

  const t1 = data[Object.keys(data)[0]]
  const t2 = data[Object.keys(data)[1]]

  return {
    title: `${t1.translator} vs ${t2.translator} Iliad Translations Comparison`,
    description: compare.description
  }
}