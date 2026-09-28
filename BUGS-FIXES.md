# Bugs and fixes record

This record links reported problems to a reproducible check and a tracked
change. It is part of the resubmission evidence and should be kept current as
new testing is completed.

## Resubmission fixes

| Issue | Change made | Verification | Status |
| --- | --- | --- | --- |
| Mobile overflow was reported by the marker | Added horizontal overflow protection to the document and media elements; allowed small-screen buttons to wrap instead of forcing a single line | Test at 320px, 375px and 390px widths; confirm `document.documentElement.scrollWidth === document.documentElement.clientWidth` | To be completed with dated screenshots |
| Official HTML and CSS evidence was missing | Added `VALIDATION.md` with direct W3C validator links and a repeatable evidence table | Run the validators against the deployed URL and record the results | To be completed after deployment |
| Manual test evidence was incomplete | Expanded `TESTING.md` and added a repeatable local-link check | Run `npm run check:site` and `npm run check:links`; complete the browser matrix | Static checks complete; browser evidence pending |
| Development history was too short | Each resubmission change is committed separately with a descriptive message | Review the GitHub commit history | In progress |

## Student evidence log

Add the date, browser/device, result and screenshot path for every completed
check. Do not replace this section with an unsupported claim that a test
passed.

| Date | Browser/device | Test | Result | Evidence |
| --- | --- | --- | --- | --- |
|  |  |  |  |  |

