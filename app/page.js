import fs from 'fs'
import Link from 'next/link'

export default async function Home() {

  const translatorData = await getTranslators()
  const translators = Object.keys(translatorData)

  const comparisonData = await getComparisons()
  const comparisonsList = Object.keys(comparisonData)


  return (
    <div>
      <h1>Iliad Translations</h1>
      <p>The Iliad of Homer is an epic, ancient Greek poem. It is one of the oldest works of literature still read. It takes place near the end of the siege of Troy by the Greeks (also known as the Trojan War). The story depicts argument between King Agamemnon and the great warrior Achilles, and the ensuing consequences on all parties involved.</p>
      <p>The Iliad has been translated 100s of times. This site lists and compares some of the most popular ones to help you find the version that works for you.</p>
      <h2>Individual Translations</h2>
      <ul>
        {translators.map((translator) => (
          <li key={translator}>
            <Link href={`/details/${translator}`}>{translatorData[translator].translator}</Link>
          </li>
        ))}
      </ul>
      <h2>Comparisons</h2>
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
      <h2>Future Todos</h2>
      <ul>
        <li>Pull popular details and comparisons from PostHog in JSON</li>
        <ul>
          <li>Pageviews</li>
          <li>Unique users who say they read it (custom event)</li>
        </ul>
        <li>Write tests</li>
        <ul>
          <li>Check data.json has all the fields</li>
          <li>Check all the pages are generated</li>
        </ul>
        <li>Add tags</li>
        <ul>
          <li>Free, oldest, best</li>
          <li>Verse, prose</li>
          <li>Enable sorting by these</li>
        </ul>
        <li>More reviews</li>
        <li>More translations</li>
        <li>More analysis links</li>
        <li>Add further readings from each book</li>
        <li>How to use this site</li>
        <li>Home page compare</li>
        <li>Quiz to find your translation (popularity, accuracy, prose/verse)</li>
      </ul>
    </div>
  )
}

async function getTranslators() {
  const data = fs.readFileSync('data.json');
  const jsonData = JSON.parse(data);
  return jsonData;
}

async function getComparisons() {
  const data = fs.readFileSync('comparisons.json');
  const jsonData = JSON.parse(data);

  return jsonData;
}