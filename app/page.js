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
      <p>This is a site dedicated to Iliad translations.</p>
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
      </p>
      <p>A site with a full list of Translations: http://johnstoniatexts.x10host.com/homer/homertranslations.html</p>
      <p>Commentary from him: http://johnstoniatexts.x10host.com/homer/iliadessay8html.html</p>
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