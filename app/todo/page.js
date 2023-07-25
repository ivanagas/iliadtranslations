import Link from "next/link";

export default async function Todo() {

  return (
    <div>
      <Link href="/">Go Home</Link>
      <h2>Future Todos</h2>
      <ul>
        <li>Pull popular details and comparisons from PostHog in JSON</li>
        <ul>
          <li>Pageviews</li>
          <li>Unique users who say they read it (custom event)</li>
        </ul>
        <li>Write tests</li>
        <ul>
          <li>Check translators.json has all the fields</li>
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