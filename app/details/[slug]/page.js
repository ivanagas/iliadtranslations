import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'

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
    <div>
      <h1>{data.translator} Iliad Translation</h1>
      <h2>Year: {data.year}</h2>
      <p>{data.description}</p>
      <h2>Links:</h2>
      <ul>
        {Object.keys(data.links).map((link) => (
          <li>
            <Link href={data.links[link]}>{link}</Link>
          </li>
        ))}
      </ul>
      <h2>Passages:</h2>
      <Selector data={data}></Selector>
      <h2>Comparisons:</h2>
      {comparisonList.map((comparison) => (
        <li>
          <Link href={`/compare/${comparison}`}>{removeVsName(comparisons[comparison].name, slug)}</Link>
        </li>
      ))}
    </div>
  )
}

async function getData(slug) {
  const data = fs.readFileSync('data.json');
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
  const data = fs.readFileSync('data.json');
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
