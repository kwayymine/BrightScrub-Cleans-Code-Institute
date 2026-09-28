# Testing plan and evidence

Run these checks before presenting the project. Keep the result and date in
your evidence folder or project journal.

The marker specifically requested completed manual testing, live internal-link
checks and a clear bugs-and-fixes record. Use `BUGS-FIXES.md` for the change
log and run `npm run check` for the repeatable local checks before recording
browser results.

| Area | Test | Expected result | Result |
| --- | --- | --- | --- |
| Navigation | Open every header and footer link | Correct page loads; active state is meaningful | `[ ]` |
| Responsive layout | Test at 320px, 768px and desktop widths | No horizontal scroll; content remains readable | `[ ]` |
| Responsive overflow | Compare `scrollWidth` and `clientWidth` at 320px and 390px | Values match; no clipped content or sideways scrolling | `[ ]` |
| Mobile menu | Open, close, press Escape and select a link | Menu state and `aria-expanded` stay in sync | `[ ]` |
| FAQ | Open one question, then another | Previous answer closes; keyboard focus remains usable | `[ ]` |
| Gallery | Open and close an image | Dialog has an accessible name and restores focus | `[ ]` |
| Quote form | Submit empty/invalid values | Native validation prevents submission | `[ ]` |
| Quote form | Complete valid values and submit on Netlify | Success or useful fallback message is shown | `[ ]` |
| Form safety | Fill the honeypot field | Submission is ignored | `[ ]` |
| Keyboard | Tab through the page | Focus order is logical and visible | `[ ]` |
| Images | Inspect images without loading CSS | Alternative text communicates purpose | `[ ]` |
| HTML/CSS | Run W3C validators | Fix all errors; document unavoidable warnings | `[ ]` |
| Performance | Run Lighthouse mobile audit | Record performance, accessibility, best-practice and SEO scores | `[ ]` |

## Browser matrix

Record your own results for current versions of Chrome, Edge, Firefox and a
mobile browser. Include screenshots for any issue and the commit that fixes
it.

## Defect evidence

For every failed check, record the symptom, likely cause, fix commit and a
repeat test in `BUGS-FIXES.md`. Evidence must be dated and based on the
deployed resubmission, not only on a local preview.
