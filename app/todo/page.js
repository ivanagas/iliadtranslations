import Link from "next/link";

export default async function Todo() {

  return (
    <div className="max-w-2xl mx-auto">
      <Link className="underline hover:text-red-900" href="/">Go Home</Link>
      <h2 className="text-5xl my-5">Future Todos</h2>
      <ul>
        <li>Update summaries</li>
        <li>Better homepage structure</li>
        <li>Better detail page structure</li>
        <li>Rename selectors more accurately</li>
        <li>Mobile styling</li>
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