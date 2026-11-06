# ENERGY UI/UX review

Reviewed the earlier interface at source commit `479a2f6` and implemented the changes in this revision. The review covers desktop and a 375 px phone content viewport, page hierarchy, navigation, product information, and enquiry validation.

## Why the previous design felt like a template

| Area | Observed problem | Effect | Change in this revision |
| --- | --- | --- | --- |
| Header | Logo, four equal links and a red stockist CTA formed a familiar service-site header. | Business conversion competed with the drink before the visitor had seen the product. | Replaced with a brand masthead, a small Original/250 ml product identifier and a full-screen product menu. |
| Hero | ENERGY. ORIGINAL. repeated the identity; the following sentence described the visible packaging. Two CTAs competed. | The page had large typography without a distinct campaign proposition. | Introduced CRACK OPEN ORIGINAL. and one product-discovery action. Kept the approved film and removed service copy from the first screen. |
| Copy | Repeated references to the black can, coming soon and returning for the taste appeared across consecutive sections. | Each section felt like another version of the same prompt. | Shortened the story and product copy, removed repeated packaging narration and gave the hero, story, product and trade sections separate jobs. |
| Consumer enquiries | Another boxed form collected an area and then revealed a second contact action. | Looking for the drink felt like filling in a lead form. | Replaced it with a compact shop-enquiry section and one direct WhatsApp link. It does not pretend to be a live stockist locator. |
| Trade enquiries | A floating rounded form card and three numbered process cards resembled SaaS onboarding. | The business section looked borrowed from a software landing page. | Removed the card shell and process cards, used clearer form text and kept useful trade topics together. |
| Interaction behavior | Menu, dialog and focus behavior were individually implemented. | More custom behavior needed separate maintenance and verification. | Adopted Radix Dialog for the product menu and label sheet. Added Motion for brief menu entrances and respected reduced-motion preferences. |
| Initial load | The Three.js import began when the page mounted, despite the product appearing below the hero and story. | Product-rendering work could start before it was useful. | Deferred 3D initialization until the product approaches the viewport, retaining the static photo fallback. |
| Styles | Old navigation and hero styling survived several redesigns. | Unused rules obscured the active design. | Removed the original navigation/hero blocks and separated the current masthead, overlay and trade styling into `src/brand-ui.css`. Some historical responsive rules remain in the older stylesheet. |

## What a UI library contributes

Radix supplies dialog semantics, focus handling, Escape behavior and modal containment. Motion supplies the brief menu-link and product-image entrances. Both are used underneath the brand presentation rather than applying a generic dashboard theme.

Documentation: [Radix Dialog](https://www.radix-ui.com/primitives/docs/components/dialog), [Motion React animation](https://motion.dev/docs/react-animation).

## Interaction checks

- Desktop and phone hero presentation; no hero pause button added.
- Full-screen menu opens with focus on Close.
- Shift+Tab wraps inside the menu rather than reaching the page behind it.
- Escape closes the menu and returns focus to its trigger.
- A menu section link closes the menu, scrolls to the destination and focuses its heading.
- Label & ingredients remains available, has an accessible name, and fits a phone viewport without horizontal overflow.
- Empty trade enquiries focus Business name and show field errors.
- Phone content fits its 375 px viewport without horizontal overflow.

## Launch readiness

The changes address visual hierarchy and the interactions checked above. The site remains a pre-launch product presentation: its formula, nutrition label, price and retail locations are not yet confirmed. Those details must come from approved brand information rather than design copy. A broad real-device/GPU audit has not been performed. The 3D model still uses a front photograph with a limited turn, rather than approved full-wrap production artwork. The WhatsApp enquiry flow is intentionally a contact handoff, not an inventory or order-management system.
