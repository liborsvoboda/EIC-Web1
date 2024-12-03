# Interactive SQL Examples in JavaScript

_This was my early attempt to provide interactive SQL snippets in the browser. Later, I created [Codapi](https://codapi.org/) — an open-source tool for embedding interactive code examples into any kind of technical writing. Give it a try!_

Reading about SQL is fun, but trying out live examples is even better! With Sqlime JavaScript widgets, you can turn static SQL code in your articles into interactive examples.

Widgets are an independent part of the Sqlime project — they have zero dependencies on the Sqlime itself.

It looks something like this:

```
┌───────────────────────────────────────────┐
│ select * from employees                   │
│ order by salary                           │
│ limit 5;                                  │
│                                           │
│ run ►                                     │
└───────────────────────────────────────────┘
┌────┬───────┬────────┬────────────┬────────┐
│ id │ name  │  city  │ department │ salary │
├────┼───────┼────────┼────────────┼────────┤
│ 11 │ Diane │ London │ hr         │ 70     │
│ 12 │ Bob   │ London │ hr         │ 78     │
│ 21 │ Emma  │ London │ it         │ 84     │
│ 22 │ Grace │ Berlin │ it         │ 90     │
│ 31 │ Cindy │ Berlin │ sales      │ 96     │
└────┴───────┴────────┴────────────┴────────┘
```

Here is a [working example](https://sqlime.org/employees.html).

And here are the four steps to creating executable SQL examples in your own articles or documentation:

## 1. Include Sqlime JS widgets

You'll need three JavaScript files:

-   `sqlite3.js` — SQLite compiled for the browser.
-   `sqlime-db.js` — the database web component.
-   `sqlime-examples.js` — the interactive example web component.

Include them from CDN or (better) download and host locally:

```
<script src="https://unpkg.com/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.js"></script>
<script src="https://unpkg.com/sqlime/dist/sqlime-db.js"></script>
<script src="https://unpkg.com/sqlime/dist/sqlime-examples.js"></script>
```

You'll also need to download and serve the SQLite WASM file if you're hosting locally:

```
https://unpkg.com/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm
```

`sqlite3.wasm` is used internally by the `sqlite3.js` script, so place them in the same folder.

I suggest you host SQLite locally because it weighs ≈1Mb, and CDNs tend to be quite slow with such large files.

You can install all of these using `npm`:

```
npm install @sqlite.org/sqlite-wasm
npm install sqlime
```

## 2. Write an article as usual

Suppose you are writing a short post about ranking data in SQL:

```
<p>To rank data in SQL, we use the
<code>rank()</code> window function:</p>

<pre class="example">select
  rank() over w as "rank",
  name, department, salary
from employees
window w as (order by salary desc)
order by "rank", id;</pre>

<p>the article goes on...</p>
```

Which renders as ordinary HTML:

---

To rank data in SQL, we use the `rank()` window function:

```
select
  rank() over w as "rank",
  name, department, salary
from employees
window w as (order by salary desc)
order by "rank", id;
```

the article goes on...

---

## 3. Load the database

You can create a database from a binary SQLite file or SQL script. I'll go with the latter and use [employees.sql](./employees.sql), which creates the `employees` table and populates it with data.

Load the database using the `sqlime-db` web component:

```
<sqlime-db name="employees" path="./employees.sql"></sqlime-db>
```

-   `name` is the name we'll use later to refer to the database.
-   `path` is the URL path to the SQL (or binary) database file.

## 4. Init the examples

The only thing left is to convert your HTML `pre` code snippets into interactive examples. Use the `sqlime-examples` web component to do this:

```
<sqlime-examples db="employees" selector="pre.example" editable></sqlime-examples>
```

-   `db` is the name of the database we defined earlier.
-   `selector` is the CSS selector for your SQL code snippets.
-   `editable` makes the examples editable (remove for read-only).

And that's it!

`sqlime-examples` converts all the snippets with the specified selector, so you only need to include it once (unless you have multiple databases to run your examples on).

## Summary

Executable SQL examples are an excellent fit for any kind of documentation:

-   They are more informative than static snippets.
-   They increase engagement and encourage experimentation.
-   They are lightweight, easy to set up, and do not require a server.

Try adding interactive SQL to your articles, or [ask a question](https://github.com/nalgeon/sqlime/issues/new) if you have one.

Last but not least:

**⭐️ Star the project** if you like it

🚀 [**Subscribe**](https://antonz.org/subscribe/) to stay on top of new features

🍋 [**Use Sqlime**](https://sqlime.org/) to debug and share SQL snippets
