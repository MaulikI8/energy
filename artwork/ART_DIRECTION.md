# Campaign assets and prompts

Created with the built-in image generation tool. The source can is the supplied ENERGY artwork, including its black body, silver lightning bolt, red lettering and mountain motif. Original artwork remains unchanged in `public/can.png` and `public/can-refined.png`.

## Empty studio stage

Source: `stage-source.png`. Delivery version: `public/media/stage.webp`.

Prompt: Use case: ads-marketing. Asset type: widescreen 16:9 photographic environment plate for a high-end energy drink product film. Create an EMPTY product stage, NO cans or bottles and NO lettering anywhere. Scene: obsidian black wet slate surface in bottom quarter, a few sculptural clear ice fragments concentrated at bottom right, low real crimson-red smoke curling from behind the stage on the right and charcoal haze above. Frame: left 45% is almost pure black negative space for live web typography; right 55% is the commercial studio stage, open at center-right for a separate upright can. Extremely photographic crisp ice refraction, fine water beads on the slate, moody restrained hard silver rimlight from upper right and deep scarlet bounced light. Premium global beverage campaign photography, 35mm lens, wide landscape frame. Keep floor horizon low. Mostly black, silver, deep crimson. No sci-fi, no grids, no particles drawn as dots, no light beams, no neon, no text, no products, no logos, no people. This is a physical photographic scene, not a design mockup.

## Can on ice

Source: `campaign-source.png`. Delivery version: `public/media/campaign-ice.webp`.

Reference: `public/can-refined.png`.

Prompt: Use case: compositing. Asset type: widescreen 16:9 commercial energy drink campaign photograph. Input image 1 is the exact product reference. Preserve the can shape and the black silver red artwork, lightning bolt, original ENERGY DRINK label, mountains and 250 ml volume. Compose a stunning REAL photographic close-up: the same cold can lies diagonally from lower left toward upper right in a bed of rough translucent ice on black wet stone. View from just above at a low three-quarter angle; the silver lightning bolt and ENERGY DRINK label are large, clearly recognizable, and in razor sharp focus, with tactile condensation. Controlled crimson light through some ice, silver highlights, deep almost black shadows. Make it feel like a global beverage advertising photograph taken with a macro lens. Dramatic but physically plausible. Fill the frame with product and ice; can cropped modestly at edges is fine. No people, no new labels or words, no ingredients, no fabricated logos, no neon, no sci-fi elements, no UI, no extra overlay typography. Do not alter the label into another brand. Color palette only deep black, metallic silver and red.

## Grounded studio hero, version 2

Source: `hero-packshot-v2.png`. Input reference: `public/can-refined.png`.

Prompt: Use case: compositing. Asset type: exceptionally high quality 16:9 widescreen product-film hero photograph for the exact ENERGY drink in the supplied reference. Preserve the slim can dimensions and all front packaging: silver lightning bolt, red and silver ENERGY DRINK lettering, black body, mountain illustration, 250 ml. Make a photographed REAL PHYSICAL CAN, upright and resting firmly on a low black slate plinth in a dark commercial studio. It must have real contact shadow and a restrained natural wet reflection, never appear to float. Composition: keep left 48% of frame empty nearly pure black for website copy. Place the entire can at 76% horizontal position, from 9% to 91% vertical position so the top rim and bottom are fully visible. Camera slightly below can midpoint, front three-quarter view only very subtly, 85 mm product lens, crystal clear condensation, precise aluminum rim. Black negative space, sculptural silver edge lighting and tightly controlled deep red backlight. Small amount of real low mist behind the base, minimal scene, no huge cloud of smoke. Fine droplets on the black plinth, dark background, one or two small ice pieces beside the base only. Premium dramatic studio photography, strong tonal depth, highly realistic physical materials. Do not add any text overlays or typography. No extra cans, no floating products, no artificial neon light streaks, no UI, no grids, no sci-fi, no extra label designs, no hands, no people. The can must be the clear hero, sharp and grounded. Color palette black, silver and crimson.

## Motion

`scripts/render-product-film.cjs` renders slow camera moves across complete photographic scenes, then encodes desktop and phone H.264 files with ffmpeg. There is no isolated cutout rotation, artificial floor reflection or doubled-can dissolve. One clean cut introduces the packaging close-up. Final framing matches the opening frame for the loop. No sound is included. Generated marketing imagery should be compared against approved print artwork before commercial use.

### White campaign photograph
Mode: built-in image generation, edit of `artwork/campaign-source.png`.
Source saved at: `artwork/campaign-white-source.png`.
Website asset: `public/media/campaign-white.webp`.
Final prompt:
Use case: precise-object-edit. Edit target: the attached ENERGY Original black can campaign photograph. Asset: product photograph for a white website section. Change ONLY the dark environment and illumination into a high-key seamless PURE WHITE studio ice setup. Preserve the same black ENERGY can, silver lightning bolt, red details, printed lettering and 250ml branding, cylindrical proportions, condensation, and the same dramatic diagonal orientation. The can remains black, not white. Keep the product believable and sharply detailed, with a few clear ice pieces immediately around it and restrained red reflections. Remove all black stone and dark background. Compose a complete can, fully within the frame, on a clean white surface; bright clear ice and very soft gray contact shadows naturally fade into pure white at ALL four outer edges. Leave generous pure-white empty margins so there is no rectangular photograph boundary when placed on a white webpage. White background must be RGB white, not cream or gray. Premium realistic beverage advertising photo, soft silver highlights, no blown-out label. Horizontal landscape composition, approximately 3:2. No extra typography, no new objects, no extra cans, no borders, no frames, no watermarks.
