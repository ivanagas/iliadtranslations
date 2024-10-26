import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'

export default async function Comparisons({ params }) {
  const { slug } = params
  
  const data = await getData(slug)

  const translators = data['translators']
  const comparison = data['comparison']

  const t1 = translators[Object.keys(translators)[0]]
  const t2 = translators[Object.keys(translators)[1]]

  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <h1 className='text-4xl my-5'>{t1.translator} vs {t2.translator} Iliad Translation Comparison</h1>
        <h2 className='text-xl mb-3'>Years: {t1.year} and {t2.year}</h2>
        <p className='whitespace-pre-line'>{comparison.description}</p>
        <h2 className='text-3xl my-3'>Passage comparison</h2>
      </div>
      <Selector data={translators}></Selector>
      <div className="max-w-2xl mx-auto">
        <h2 className='text-3xl my-3'>Details</h2>
        <ul>
          <li>
            <Link 
              href={`/details/${Object.keys(translators)[0]}`}
              className='underline hover:text-red-900'
            >
              {t1.translator}
            </Link>
          </li>
          <li>
            <Link 
              href={`/details/${Object.keys(translators)[1]}`}
              className='underline hover:text-red-900'
            >
              {t2.translator}
            </Link>
          </li>
        </ul>
        <Link className='underline hover:text-red-900' href="/">Go Home</Link> - <Link className='underline hover:text-red-900' href="/compare">All Comparions</Link>
      </div>
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
  const translators = data['translators']

  const t1 = translators[Object.keys(translators)[0]];
  const t2 = translators[Object.keys(translators)[1]];

  return {
    title: `${t1.translator} vs ${t2.translator} Iliad Translations Comparison`,
    description: `Comparing the Iliad translations of ${t1.translator} and ${t2.translator} with a set of passages.`,
  }
}