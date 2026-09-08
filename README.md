# Bright Scrub Cleans — User-Centred Front-End Project

Multi-page static website for Bright Scrub Cleans Ltd, a UK domestic and
commercial cleaning company serving the West Midlands along the Wolverhampton,
Dudley and Birmingham corridor. The project is structured as a user-centred
front-end submission: it gives visitors clear service information, builds trust
and guides them towards a quote request.

The reference benchmark used during planning was the visual quality and media
storytelling of [Project Athena](https://github.com/lewisPratt/Project-Athena).
No third-party code or media has been copied from that repository.

## Pages

- Home: `/`
- Services overview: `/services/`
- Service pages: `/commercial-cleaning/`, `/office-cleaning/`,
  `/domestic-cleaning/`, `/regular-cleaning/`, `/deep-cleaning/`,
  `/end-of-tenancy-cleaning/`, `/after-builders-cleaning/`,
  `/airbnb-cleaning/`, `/student-accommodation-cleaning/`,
  `/communal-area-cleaning/`, `/carpet-upholstery-cleaning/`
- Areas overview: `/areas/`
- Location pages: `/cleaners-birmingham/`, `/cleaners-wolverhampton/`,
  `/cleaners-dudley/`, `/cleaners-tipton/`, `/cleaners-oldbury/`,
  `/cleaners-west-bromwich/`, `/cleaners-wednesbury/`, `/cleaners-smethwick/`,
  `/cleaners-halesowen/`, `/cleaners-stourbridge/`,
  `/cleaners-rowley-regis/`, `/cleaners-brierley-hill/`,
  `/cleaners-kingswinford/`, `/cleaners-bilston/`
- About: `/about.html`
- Contact / quote form: `/contact.html`
- Pricing: `/pricing.html`
- Legal: `/privacy-policy.html`, `/terms.html`, `/cookies-policy.html`
- Custom 404: `/404.html`

## Files

| File | Purpose |
| --- | --- |
| `index.html` and `services/`, `areas/` | Generated static pages |
| `styles.css` | Shared design system |
| `script.js` | Shared interactions and form handling |
| `netlify.toml` | Netlify build, security headers, caching, functions |
| `netlify/functions/mcp.mjs` | MCP endpoint (Streamable HTTP over JSON-RPC) |
| `.well-known/mcp.json` | MCP discovery for AI clients |
| `_redirects` | 404 fallback and `/mcp` shortcut |
| `robots.txt`, `sitemap.xml` | SEO files |
| `site.webmanifest` | PWA metadata |
| `LOCAL-SEO-KEYWORD-MAP.md` | Keyword map organised by page |
| `UX-DESIGN.md` | User stories, five-plane decisions and accessibility rationale |
| `TESTING.md` | Repeatable manual, responsive and accessibility test plan |
| `PROJECT-PLAN.md` | Delivery sequence and distinction-focused checklist |

## Deploy to Netlify

1. Go to https://app.netlify.com/drop and drag this folder onto the page.
2. Wait for the deploy to finish, then open the generated URL.
3. In **Site configuration > Forms**, enable form notifications for
   `quote-request` submissions.
4. Add your domain under **Domain management**.

The deployment headers and form configuration are defined in `netlify.toml`.

For GitHub Pages, publish the repository as a static site and check every
navigation path on the generated URL. Netlify is the recommended deployment
for this build because it supports the quote form configuration in
`netlify.toml`.

## MCP endpoint

The site exposes an MCP server at:

- `https://brightscrubcleans.co.uk/mcp`
- `https://brightscrubcleans.co.uk/.netlify/functions/mcp`

AI clients discover it at `https://brightscrubcleans.co.uk/.well-known/mcp.json`.
It supports `initialize`, `ping`, `tools/list`, `tools/call`,
`resources/list` and `resources/read`, with business, services, areas, FAQ and
contact data.

## SEO / AEO / geo notes

- Every page has unique titles, meta descriptions, canonical URLs, Open Graph
  and Twitter cards, geo meta tags (`geo.region`, `geo.placename`, `ICBM`) and
  JSON-LD: `LocalBusiness`, `Service`, `BreadcrumbList` and `FAQPage`.
- The `LocalBusiness` schema covers the full West Midlands service area
  (Wolverhampton to Coventry).
- Keep the business profile, service area and contact details consistent across
  the site and any linked business listings.

## Before launch

- Replace the sample review quotes with real, verified customer reviews and
  add a link to the Google Business Profile once it is fixed.
- Update the `google-site-verification` placeholder (add the token Google gives
  you in the `<head>` of `index.html`) and submit the sitemap in Search Console.
- Confirm phone, email, WhatsApp and service-area details are current in every
  page before launch.

## Distinction evidence checklist

- Add authentic user feedback and explain the design changes it caused in
  `UX-DESIGN.md`.
- Complete `TESTING.md` with dated results, screenshots and any fixes.
- Validate HTML/CSS, test keyboard and mobile layouts, and record a Lighthouse
  audit.
- Replace draft reviews and the Google verification placeholder with verified
  information.
- Keep the Git history meaningful and submit the live URL, repository link and
  README as part of your own assessed evidence.
