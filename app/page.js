import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'

export default async function Home() {

  const translatorData = await getTranslators()
  const translators = Object.keys(translatorData)

  const comparisonData = await getComparisons()
  const comparisonsList = Object.keys(comparisonData)

  return (
    <div>
      <div className='main'>
        <h1>Iliad Translations</h1>
        <p>The Iliad of Homer is an epic, ancient Greek poem. It is one of the oldest works of literature still read. It takes place near the end of the siege of Troy by the Greeks (also known as the Trojan War). The story depicts an argument between King Agamemnon and the great warrior Achilles, and the consequences of it on the ongoing war between Trojans and Greeks.</p>
        <p>The Iliad has been translated 100s of times, so versions vary widely. Some are faithful to Homer&apos;s original Greek, others focus on readability. Some are in verse, others in prose. The experience of reading the Iliad can be dramatically different depending on the version you choose.</p>
        <p>To help you make this choice, this site lists some of the most popular translations with a summary and passages to see which you like best.</p>
        <h2>Compare Translations</h2>
      </div>
      <Selector data={translatorData}></Selector>
      <div className='main'>
        <h2>List of Individual Translations</h2>
        <ul>
          {translators.map((translator) => (
            <li key={translator}>
              <Link href={`/details/${translator}`}>{translatorData[translator].translator}</Link>
            </li>
          ))}
        </ul>
        <h2>List of Comparisons</h2>
        <ul>
          {comparisonsList.map((comparison) => (
            <li key={comparison}>
              <Link href={`/compare/${comparison}`}>{comparisonData[comparison].name}</Link>
            </li>
          ))}
        </ul>
        <h2>Further reading</h2>
        <ul>
          <li><Link href="http://johnstoniatexts.x10host.com/homer/homertranslations.html">A site with a full list of Iliad translations.</Link></li>
          <li><Link href="http://johnstoniatexts.x10host.com/homer/iliadessay8html.html">Commentary from Ian Johnston on Iliad translations</Link></li>
        </ul>
        <p><Link href="https://github.com/ivanagas/iliadtranslations">Contribute or make a suggestion on GitHub</Link></p>
      </div>
    </div>
  )
}

async function getTranslators() {
  const data = fs.readFileSync('translators.json');
  const jsonData = JSON.parse(data);
  return jsonData;
}

async function getComparisons() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);

  return jsonData;
}