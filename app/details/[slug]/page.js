import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'
import ReadLikeButtons from '@/app/components/ReadLikeButtons'

export default async function Details({ params }) {
  const { slug } = params
  const data = await getData(slug)

  const comparisons = await getComparisons(slug)
  const comparisonList = Object.keys(comparisons);

  const removeVsName = (inputString, variableName) => {

    const names = inputString.split(" vs ");
    const upperCaseName = variableName.charAt(0).toUpperCase() + variableName.slice(1);
    const variableIndex = names.indexOf(upperCaseName);
  
    if (variableIndex !== -1) {
      names.splice(variableIndex, 1);
    }
  
    return `vs ${names[0]}`;
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <h1 className='text-4xl my-5'>{data.translator} Iliad Translation</h1>
      <div className='text-xl grid grid-cols-2'>
        <h2>Year: {data.year}</h2>
        <h2>Tags: {data.tags.map((tag, index) => (
          <span key={index}>
            <Link
              href={`/tag/${tag}`}
              className='underline hover:text-red-900'
            >
              {tag}
            </Link>
            {index !== data.tags.length - 1 && ', '}
          </span>
        ))}</h2>
      </div>
      <p className='my-3'>{data.description}</p>
      <div className='grid grid-cols-2'>
        <div>
          <h2 className='text-xl'>Links:</h2>
          <ul>
          {Object.keys(data.links).map((link) => (
            <li key={link}>
              <Link 
                href={data.links[link]}
                className='underline hover:text-red-900'
              >
                {link}
              </Link>
            </li>
            ))}
          </ul>
        </div>
        <div>
          <ReadLikeButtons slug={slug} />
        </div>
      </div>
      <h2 className='text-3xl my-3'>Passages:</h2>
      <Selector data={data}></Selector>
      <h2 className='text-3xl my-3'>Comparisons:</h2>
      <ul className='grid grid-cols-2 mb-3'>
      {comparisonList.map((comparison) => (
        <li key={comparison}>
          <Link 
            href={`/compare/${comparison}`}
            className='underline hover:text-red-900' 
          >
            {removeVsName(comparisons[comparison].name, slug)}
          </Link>
        </li>
      ))}
      </ul>
      <Link 
        className='underline hover:text-red-900' 
        href="/"
      >
        Go Home
      </Link> - <Link 
        className='underline hover:text-red-900' 
        href="/details"
      >
        All Translations
      </Link>
    </div>
  )
}

async function getData(slug) {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);
  return jsonData[slug];
}

async function getComparisons(slug) {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);

  const filteredComparisons = Object.keys(jsonData)
  .filter(key => key.includes(slug))
  .reduce((filtered, key) => {
    filtered[key] = jsonData[key];
    return filtered;
  }, {});

  return filteredComparisons
}

export async function generateStaticParams() {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);
  const translators = Object.keys(jsonData);

  const paths = translators.map((translator) => ({
    slug: translator,
  }))
 
  return paths
}

export async function generateMetadata({ params }) {
  const data = await getData(params.slug)

  return {
    title: `${data.translator} Iliad Translation`,
    description: data.description
  }
}
