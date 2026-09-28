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
| `BUGS-FIXES.md` | Marker feedback, fixes and dated evidence log |
| `VALIDATION.md` | Official HTML/CSS and Lighthouse evidence record |

## Deploy to Vercel

1. Import `kwayymine/BrightScrub-Cleans-Code-Institute` in Vercel.
2. Use the project root (`./`) and the **Other** framework preset.
3. Deploy the `main` branch and open the generated URL.
4. Add a custom domain under **Project settings > Domains** if required.

The repository is deployed on Vercel at:

`https://brightscrub-cleans-code-institute.vercel.app/`

The quote form markup retains the Netlify-compatible attributes from the
original build, but Vercel does not process Netlify Forms. Before treating the
form as production-ready, connect it to a Vercel-compatible email/form service
and record the endpoint and test result in `VALIDATION.md`. Until then, the
phone and WhatsApp alternatives remain the reliable contact paths.

The legacy `netlify.toml` file is retained only as historical deployment
configuration from the original build; it is not used by Vercel.

## Optional MCP endpoint

The site exposes an MCP server at:

- `https://brightscrubcleans.co.uk/mcp` (legacy Netlify deployment)
- `https://brightscrubcleans.co.uk/.netlify/functions/mcp` (legacy Netlify deployment)

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
- Complete `BUGS-FIXES.md` and `VALIDATION.md` against the deployed URL.
- Validate HTML/CSS, test keyboard and mobile layouts, and record a Lighthouse
  audit.
- Replace draft reviews and the Google verification placeholder with verified
  information.
- Keep the Git history meaningful and submit the live URL, repository link and
  README as part of your own assessed evidence.
