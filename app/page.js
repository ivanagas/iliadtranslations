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
      <p>See details on individual translations like:</p>
      <ul>
        {translators.map((translator) => (
          <li>
            <Link href={`/details/${translator}`}>{translatorData[translator].translator}</Link>
          </li>
        ))}
      </ul>
      <p>Also see any comparisons between the two like:</p>
      <ul>
        {comparisonsList.map((comparison) => (
          <li>
            <Link href={`/compare/${comparison}`}>{comparisonData[comparison].name}</Link>
          </li>
        ))}
      </ul>
      <h4>Future</h4>
      <p>
        - Pull popular details and comparisons from PostHog in JSON
          - Unique users who say they read it (custom event)
          - Pageviews 
        - Add tags
          - Free, oldest, best
          - Verse, prose
          - Enable sorting by these
        - Write tests
          - Check data.json has all the fields
          - Check all the pages are generated
        - More reviews
        - More translations
        - More analysis links
        - Add further readings from each book
        - How to use this site
        - Home page compare
      </p>
      <Link href="http://johnstoniatexts.x10host.com/homer/homertranslations.html">A site with a full list of Translations.</Link><span> </span>
      <Link href="http://johnstoniatexts.x10host.com/homer/iliadessay8html.html">Commentary from Ian Johnston on Iliad Translations</Link>
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