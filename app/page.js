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
      <h3>Passages</h3>
      <ul>
        <li>Book 1 - Intro</li>
        <li>Book 16 - Wolves</li>
        <li>Book 22 - Hector before Death</li>
        <li>Book 6, 146-149 - Leaves: "Like the generations of leaves, the lives of mortal men. Now the wind scatters the old leaves across the earth, now the living timber bursts with the new buds and spring comes round again. And so with men: as one generation comes to life, another dies away."</li>
        <li>https://wist.info/homer/43262/</li>
        <li>Book 6 - Scared by Helmet "He stretched his arms towards his child, but the boy cried and nestled in his nurse's bosom, scared at the sight of his father's armor, and at the horse-hair plume that nodded fiercely from his helmet. His father and mother laughed to see him, but Hektor took the helmet from his head and laid it all gleaming upon the ground. Then he took his darling child, kissed him, and dandled him in his arms, praying over him the while to Zeus and to all the gods. "Zeus," he cried, "grant that this my child may be even as myself, chief among the Trojans; let him be not less excellent in strength, and let him rule Ilion with his might. Then may one say of him as he comes from battle, ‘The son is far better than the father.’ May he bring back the blood-stained spoils of him whom he has laid low, and let his mother's heart be glad."</li>
        <li>http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=6#:~:text=He%20stretched%20his,born%20in%20Ilion.%22</li>
        <li>Book 21 - Moaning about death "So the illustrious son of Priam begged for life
but only heard a merciless voice in answer: "Fool,
don't talk to me of ransom. No more speeches.
Before Patroclus met his day of destiny, true,
it warmed my heart a bit to spare some Trojans:
droves I took alive and auctioned off as slaves.
But now not a single Trojan flees his death,
not one the gods hand over to me before your gates,
none of all the Trojans, sons of Priam least of all!
Come, friend, you too must die. Why moan about it so?
Even Patroclus died, a far, far better man than you.
And look, you see how handsome and powerful I am?
The son of a great man, the mother who gave me life
a deathless goddess. But even for me, I tell you,
death and the strong force of fate are waiting.
There will come a dawn or sunset or high noon
when a man will take my life in battle too—
flinging a spear perhaps
or whipping a deadly arrow off his bow."</li>
          <li>https://home.ubalt.edu/ntygfit/ai_01_pursuing_fame/ai_01_tell/iliad21.htm#:~:text=Come%2C%20friend%2C%20you%20too%20must,handsome%20and%20powerful%20I%20am%3F</li>
        <li>Book 9 - Achilles, no riches compare. Against taking gifts from Agammemnon.</li>
        <li>Book 16 - Patroclus death</li>
        <li>http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=16</li>
        <li>Book 5 - Diomedes courage from Athena, saying that Aphordite is mortal, wounds Ares</li>
        <li>http://www.perseus.tufts.edu/hopper/text?doc=Perseus:text:1999.01.0217:book=5</li>
      </ul>

      <h4>TODO</h4>
      <p>
        - Template for details for each translation
          - Some quotes, formatted properly. 
          - More analysis (if available)
        - Template for comparions between two translations
          - Side by side quotes for each
          - More analysis (if available)
      </p>
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