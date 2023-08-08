import Link from "next/link";

export default async function Todo() {

  return (
    <div className="main">
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
        <li>Add home tag sorting</li>
        <li>More reviews</li>
        <li>More translations</li>
        <li>More analysis links</li>
        <li>Add further readings from each book</li>
        <li>How to use this site</li>
        <li>Quiz to find your translation (popularity, accuracy, prose/verse)</li>
      </ul>
    </div>
  )
}