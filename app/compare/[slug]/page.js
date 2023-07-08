import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'
import path from 'path'

export default async function Comparisons({ params }) {
  const { slug } = params
  
  const data = await getData(slug)

  const translators = data['translators']
  const comparison = data['comparison']

  const t1 = translators[Object.keys(translators)[0]]
  const t2 = translators[Object.keys(translators)[1]]

  return (
    <div>
      <h1>{t1.translator} vs {t2.translator} Iliad Translation Comparison</h1>
      <h2>Years: {t1.year} and {t2.year}</h2>
      <p>{comparison.description}</p>
      
      <h2>Passage comparison</h2>
      <p>A row of buttons to select from available passages</p>
      <Selector data={translators}></Selector>
      
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
  const translatorData = fs.readFileSync('translators.json');
  const translatorJson = JSON.parse(translatorData);
  const translators = slug.split("-vs-");

  const filteredJson = Object.keys(translatorJson)
  .filter(key => translators.includes(key))
  .reduce((result, key) => {
    result[key] = translatorJson[key];
    return result;
  }, {});

  const comparisonData = fs.readFileSync('comparisons.json');
  const comparisonJson = JSON.parse(comparisonData);
  const comparison = comparisonJson[slug]

  return {
    'translators': filteredJson,
    'comparison': comparison
  }
}

export async function generateStaticParams() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);
  const comparisons = Object.keys(jsonData);

  const paths = comparisons.map((comparison) => ({
    slug: comparison,
  }))
 
  return paths
}


export async function generateMetadata({ params }) {
  const data = await getData(params.slug);

  const t1 = data[Object.keys(data)[0]];
  const t2 = data[Object.keys(data)[1]];

  return {
    title: `${t1.translator} vs ${t2.translator} Iliad Translations Comparison`,
    description: `Comparing the Iliad translations of ${t1.translator} and ${t2.translator} with a set of passages.`,
  }
}