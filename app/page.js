import fs from 'fs'
import Link from 'next/link'
import Selector from './selector'
import { GFS_Neohellenic } from 'next/font/google'

const neohellenic  = GFS_Neohellenic({ subsets: ['greek'], weight: '400' })

export default async function Home() {

  const translatorData = await getTranslators()
  const translators = Object.keys(translatorData)

  const comparisonData = await getComparisons()
  const comparisonsList = Object.keys(comparisonData)

  return (
    <div>
      <div className='max-w-2xl mx-auto'>
        <h1 className={`${neohellenic.className} text-6xl my-5`}>Iliad Translations</h1>
        <p className='mb-2'>The Iliad of Homer is an epic, ancient Greek poem. It is one of the oldest works of literature still read. It takes place near the end of the siege of Troy by the Greeks (also known as the Trojan War). The story depicts an argument between King Agamemnon and the great warrior Achilles, and the consequences of it on the ongoing war between Trojans and Greeks.</p>
        <p className='mb-2'>The Iliad has been translated 100s of times, so versions vary widely. Some are faithful to Homer&apos;s original Greek, others focus on readability. Some are in verse, others in prose. The experience of reading the Iliad can be dramatically different depending on the version you choose.</p>
        <p>To help you make this choice, this site lists some of the most popular translations with a summary and passages to see which you like best.</p>
        <h2 className={`${neohellenic.className} text-5xl my-5`}>Compare Translations</h2>
      </div>
      <Selector data={translatorData}></Selector>
      <div className='max-w-2xl mx-auto'>
        <h2 className={`${neohellenic.className} text-5xl my-5`}>Individual Translations</h2>
        <ul className='grid grid-cols-2'>
          {translators.map((translator) => (
            <li key={translator}>
              <Link 
                href={`/details/${translator}`}
                className='underline hover:text-red-900'
              >
                {translatorData[translator].translator}
              </Link>
            </li>
          ))}
        </ul>
        <p className='my-5'>
          <Link className='underline hover:text-red-900' href="/tag/free">
            Free
          </Link> - <Link className='underline hover:text-red-900' href="/tag/oldest">
            Oldest
          </Link> - <Link className='underline hover:text-red-900' href="/tag/newest">
            Newest
          </Link> - <Link className='underline hover:text-red-900' href="/tag/prose">
            Prose
          </Link> - <Link className='underline hover:text-red-900' href="/tag/verse">
            Verse
          </Link>
        </p>
        <h2 className={`${neohellenic.className} text-5xl my-5`}>Comparisons</h2>
        <ul className='grid grid-cols-2'>
          {comparisonsList.map((comparison) => (
            <li key={comparison}>
              <Link className='underline hover:text-red-900' href={`/compare/${comparison}`}>{comparisonData[comparison].name}</Link>
            </li>
          ))}
        </ul>
        <h2 className={`${neohellenic.className} text-5xl my-5`}>Further Reading</h2>
        <ul>
          <li><Link className='underline hover:text-red-900' href="http://johnstoniatexts.x10host.com/homer/homertranslations.html">A full list of Iliad translations.</Link></li>
          <li><Link className='underline hover:text-red-900' href="http://johnstoniatexts.x10host.com/homer/iliadessay8html.html">Commentary from Ian Johnston on Iliad translations</Link></li>
          <li><Link className='underline hover:text-red-900' href="https://www.reddit.com/r/classics/comments/l7yl6h/every_modern_iliad_translation_compared/">Reddit thread comparing modern translations</Link></li>
        </ul>
        <p><Link className='underline hover:text-red-900' href="https://github.com/ivanagas/iliadtranslations">Contribute or make a suggestion on GitHub</Link></p>
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