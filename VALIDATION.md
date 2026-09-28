# Validation evidence

The marker requested official HTML and CSS validation evidence. Complete the
checks below against the deployed resubmission URL and keep the result with the
project evidence.

## Automated local checks

Run from the project root:

```text
npm run check:site
npm run check:links
```

The static site check reports the HTML page count and verifies doctypes,
language attributes and image alternative text. The link check verifies local
HTML targets and ignores external URLs, telephone links and form actions.

## Official validators

1. Open the deployed homepage in the [W3C Nu HTML Checker](https://validator.w3.org/nu/).
2. Validate the deployed stylesheet in the [W3C CSS Validator](https://jigsaw.w3.org/css-validator/).
3. Record the URL, date, error count and any warning that remains.
4. Fix errors, rerun the local checks and commit the change before recording a
   final result.

| Check | URL | Date | Errors | Warnings | Evidence |
| --- | --- | --- | ---: | ---: | --- |
| HTML homepage |  |  |  |  |  |
| HTML contact page |  |  |  |  |  |
| CSS stylesheet |  |  |  |  |  |

## Performance and accessibility

Run a Lighthouse mobile audit on the deployed homepage and contact page. Save
the report or screenshots and record the accessibility, best-practices,
performance and SEO scores in the project journal.

