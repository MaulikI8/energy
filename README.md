# ENERGY / Original

React landing page for a physical-market energy drink launch in Nepal. Uses Vite, Tailwind CSS, Teko, Manrope and Lucide React. Product sales and enquiries are directed to physical retail and the supplied WhatsApp contact.

## Run

Node.js 20.19+ or 22.12+:

```sh
npm ci
npm run dev
npm test
npm run build
```

Deploy `dist/` over HTTPS. Fonts, photography and video are bundled. There is no backend, payment flow, CRM or browser storage of personal details.

## Product film

The hero includes a 10-second H.264 MP4 loop made from complete AI-generated studio photographs using the supplied can artwork as reference. Slow camera moves and one clean macro cut preserve consistent lighting, contact shadows and reflections. The can does not float or spin. This is a photographic motion edit, not a 360-degree model or a generative-video recording.

- `public/media/energy-film-v2.mp4`: 1600 x 900, 24 fps desktop film.
- `public/media/energy-film-small-v2.mp4`: 960 x 540 phone version, under 1 MB.
- `public/media/film-poster-v2.webp`: still fallback and first paint.
- `public/media/campaign-ice.webp`: generated campaign photograph used as the single product image.
- `artwork/`: original photographic plates and prompt/provenance notes.

Playback is muted and inline, loops automatically where permitted, pauses off screen or when the document is hidden, without visible playback controls. Reduced-motion and data-saving preferences use the still poster. Browsers that deny autoplay retain the poster.

To regenerate the film, install ffmpeg on the host and run:

```sh
npm run render:film
```

Canvas and Sharp are development dependencies. No frame-rendering code runs in the visitor's browser.

## Components

- `src/components/CinematicHero.jsx`: responsive video, poster, playback preferences and controls.
- `src/components/ProductImage.jsx`: interactive 3D product can with photo fallback.
- `src/components/TradeInformation.jsx`: keyboard-accessible retailer, sample and distributor tabs.
- `src/components/Disclosure.jsx`: animated FAQ disclosures.
- `src/main.jsx`: remaining page components, label dialog and inquiry forms.
- `src/cinematic.css`: campaign layout and responsive styling.
- `src/wholesale.js`: contact validation and encoded WhatsApp message.

The area enquiry prepares a message about the visitor's requested area. It does not claim an outlet exists there. Business enquiries are validated locally; visitors review and send the prepared message themselves in WhatsApp. Destination: +977 9848951422.

## Content boundaries

One original flavor and a 250 ml can are based on the supplied brief and packaging. Exact ingredients, nutrition, approvals, pricing, case quantities, minimum orders, shop addresses and delivery commitments require approved brand information. The Label & ingredients dialog clearly says Awaiting confirmation. No testimonials, stockist counts, taste notes or certifications have been fabricated. Future flavors are not presented as available.

Generated imagery is marketing artwork, not an approved packaging proof. Compare the printed artwork with approved files before commercial use. The original supplied photograph and original transparent can artwork remain included.

## Verification

Production build and existing unit tests pass. Browser checks cover actual MP4 playback, pause controls, business tabs and keyboard navigation, mobile video source selection, and off-screen pause behavior. Responsive frames at 360 px and 390 px have no horizontal overflow. Earlier checks cover label-dialog behavior and enquiry validation. Browser media preference emulation was not available; reduced-motion behavior is implemented with matchMedia and a poster-first load policy.

Latest refinement: removed all three photograph selectors and their styling. The versioned v2 media paths prevent old film files from remaining cached after this update. Desktop and phone playback and the single product photograph were checked in the browser.

## Interactive product can
The product section now uses a dynamically imported Three.js cylinder with front artwork projected from the supplied can photograph. Turning is limited because the back label is not available. Drag horizontally or use arrow keys; the pause button stops automatic motion. Reduced-motion preferences disable the automatic turn. The hero film is unchanged. A static can photo remains visible when WebGL is unavailable. The QA browser could not create a WebGL context, so the fallback was verified visually; GPU animation needs verification on a WebGL-capable device.

## Current design
The photographic v2 hero and the original interactive can presentation are restored. The entire product section is now black, with a soft red backdrop behind the can, light text and subtle dividers. Label & ingredients and its awaiting-confirmation dialog are retained. The reduced-motion and WebGL fallback behavior remain in place.

## Development-stage brand copy
The client context confirms that the product is still being developed. Zero sugar and a smooth taste are development goals. Final sugar content, caffeine amount, ingredients, retail price and launch date are not published as settled facts. The first market test is planned around one Original flavor and physical shops. Launch enquiries and future sample enquiries are welcome; the site does not present stock as available. No claims of health benefits, everyday safety or regulatory caffeine limits have been added. The horizontal divider above the product has been removed.

## Brand copy rewrite
The public copy now presents the drink and brand rather than an internal development roadmap. The market-test and future-feedback paragraph and its three-column section have been removed. Hero, product, stockist, shop enquiry, FAQ and footer copy were rewritten. `BrandStory.jsx` adds a campaign photograph and a taste-led brand section. Zero sugar remains a goal rather than a confirmed nutrition claim; final formula details remain in Label & ingredients. No competitor slogans, performance claims, endorsements or exact prices were added. The restored hero and the black product section are retained. Desktop and 375 px content-width browser checks passed with no horizontal overflow; the label dialog opened and closed correctly.

## White campaign above the product
Page order is hero, white campaign story, black interactive product section, then shop and business enquiries. The campaign photograph was edited with built-in image generation for a seamless white studio background. `public/media/campaign-white.webp` is the optimized web asset; `artwork/campaign-white-source.png` is the saved source. The image has no border or card background and uses multiply blending over white. Dark copy replaces the previous light copy. Desktop and phone checks verified the section order, image presentation and no horizontal overflow.

## Hero identity and playback
The hero now reads ENERGY. ORIGINAL. with shorter can-focused copy. Visible pause/play controls, film captions and progress indicators have been removed at the owner's request. The existing v2 film still autoplays muted and loops, with off-screen and background-tab resource management. Reduced-motion, data-saving and autoplay-blocked browsers retain the poster. Desktop and phone checks confirmed actual playback, zero hero buttons and no horizontal overflow. The white campaign section stays above the black interactive product section.

## Product-first UI revision
See `UI_UX_REVIEW.md` for the findings and changes. The header is now `BrandHeader.jsx`, using Radix Dialog for the full-screen menu and Motion for menu entrances. `IngredientsButton.jsx` uses the same dialog primitives. `FindOriginal.jsx` replaces the consumer lead form with direct contact. `brand-ui.css` owns these styles and the new CRACK OPEN ORIGINAL. hero treatment. The trade form no longer sits inside a floating card. Its validation and WhatsApp handoff are retained. Three.js initialization is deferred until the product approaches the viewport. The white campaign section still precedes the black product section.

## Compact content below Find Original
`KnowYourCan.jsx` adds a short consumer-facing label-information section directly after Find Original and before the trade section. It draws on the client's interest in reading sugar, caffeine and ingredient information. The section uses the existing Radix label dialog, with a unique title ID per instance. It does not publish unconfirmed ingredient amounts or health claims. Desktop and phone layout, the second dialog trigger and focus return were checked in the browser.

## Header and launch essentials
The hero film now fits inside a smaller stage with top and bottom clearance. Its desktop media uses contain instead of cover, and its phone stage is 330px tall. The masthead is opaque and isolated. The full-screen menu shell no longer translates or fades over a second logo; the inner link and product entrances are retained.

The necessary-only privacy notice stores `energy:privacy-notice:v1=acknowledged` on the current device when dismissed. It adds no analytics, advertising cookies, tracking scripts or external fonts. Privacy & cookies remains accessible from the footer. Enquiry details still stay in memory until the visitor opens WhatsApp and chooses to send them. If optional tracking is added in future, implement real consent controls before loading it and update the notice.

`public/robots.txt`, `public/sitemap.xml`, social metadata, Organization structured data, SVG/PNG icons, a browser manifest and a branded `404.html` are included. The current Site is an owner-private demo: robots disallows crawling and the page has noindex. Before a public launch, change robots to Allow, remove the noindex meta directive, confirm the production domain in canonical/OG/schema/sitemap/robots, review the privacy details against the actual hosting and business practices, and submit the sitemap. These files do not change access permissions. No service worker is registered, so there is no extra offline cache to invalidate. Configure HTTPS, response security headers, index.html revalidation and hashed-asset caching on the final host. Custom 404 routing/status is host-dependent; the static error page is supplied.

## Hero scale refinement
The film stage uses 16px of desktop top and bottom clearance, with contain sizing retained. The can is about 7% larger than in the previous revision without returning to the oversized cover crop. Tablet media gets a 5% optical scale adjustment within its letterboxed stage; phone stages are 355px tall (322px on narrow phones). The opaque sticky masthead and stationary menu shell are retained.

## Vercel handoff
`vercel.json` selects Vite, `npm run build` and the `dist` output. It includes basic response security headers, revalidation for the home document and immutable caching for Vite's hashed assets. This is a single-page anchor site: there is no catch-all rewrite turning unknown URLs into successful pages. No Vercel account or project has been linked yet. The exact production domain is pending. Keep the current noindex directives until the owner supplies and connects that domain, then update canonical, Open Graph, schema, sitemap and robots for the public launch.
