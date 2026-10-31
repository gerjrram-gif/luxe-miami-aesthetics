# Luxe Miami Aesthetics

Static site for Luxe Miami Aesthetics, a practice taking shape. Neither door is open. Not yet offering treatments. There is no public shop. A franchise is not being offered, and The Atelier is not being offered. The site root is the public folder.

The homepage follows a medspa landing rhythm — light header, full-bleed hero, perk band, treatment cards, The Atelier, a Products shelf, a standards carousel, one location, an about split, a future-studio block, waitlist, and a dark footer — written entirely for Luxe.

## Pages

| File | Role |
| --- | --- |
| `index.html` | Homepage. Guest waitlist, future-studio interest, each shelf notify form, and the LX-06 Gratitude waitlist (`#lx-06`) post through FormSubmit to info@luxemiamiaesthetics.com. |
| `lx-06.html` | The same LX-06 Gratitude card and seal set waitlist, for a direct link. Interest only. Not a purchase. |
| `confirmed.html` | No-JavaScript confirmation for the guest waitlist, a shelf notify note, and the LX-06 waitlist. |
| `interest.html` | No-JavaScript confirmation for a future-studio note. It is not a franchise offer. |

With JavaScript, a successful signup stays on the homepage and shows the matching confirmation. Without JavaScript, the browser posts to `https://formsubmit.co/info@luxemiamiaesthetics.com` and `_next` opens `confirmed.html` (waitlist and shelf notify) or `interest.html` (future-studio note). FormSubmit must be activated once from the info@luxemiamiaesthetics.com inbox before the first delivery.

## Photography

The homepage frame is the static black-and-white portrait `spa/hero-bw.jpg`. It is also the Open Graph image. `hero.mp4`, `night.mp4`, `hero-poster.jpg`, and `night-poster.jpg` stay in the repo and are not used on the hero or on Own a Luxe. The Own a Luxe band is `spa/own-palm-beach.jpg`, an original photograph made for Luxe: a quiet Palm Beach clinic exterior, cream stucco, a burgundy awning, antique-gold lanterns, and royal palms. It is a still for the future Palm Beach office. It is not a photograph of that office, and it is not an asset from the reference medspa. That band is not a placeholder.

In the works uses nine square black-and-white macros in `spa/`, lifted so the squares read lighter while staying black and white. About uses `founder.jpg`, a photograph of Mateo Ramirez on a Miami terrace at night. `spa/about-lifestyle.jpg` stays in the repo and is not used on the page. The Coral Gables card uses `spa/location-interior.jpg`, a burgundy tiled corridor in a 3:4 frame. The Palm Beach card uses an original sepia Florida map, `spa/florida-map.jpg`, and an original line drawing, `spa/palm-beach-line.jpg`, on a paper card marked Taking Shape. These were made for Luxe. They are not pictures of either place, and they are not assets from the reference medspa.

The header, hero, footer, confirmation pages, and Palm Beach paper card use a live wordmark: Allura for lowercase “luxe”, with no registration mark, and “Miami Aesthetics” in Cormorant SC. Small-cap rules do not set `text-transform: uppercase`, so the small-cap glyphs can paint. Display titles stay in Cormorant Garamond, including section titles, perk-tile titles, and Standards. Navigation uses Inter at every width. On ivory the script is velvet `#6b1e2e` and the line under it is antique gold. On the hero photograph and the velvet footer the script is ivory so it still reads. Founder labels use the same Cormorant small-cap gold. The mark is not repeated in body copy. The page title and Open Graph title are “Luxe Miami Aesthetics”. `logo.png` remains in the repo for the favicon artwork. Unused `luxe-logo.svg` is the older red tile and is not on the page. The footer sits on red velvet. Page colors are quiet luxury beside the hero: ivory grounds `#f7f2ea` and `#f3ebe2`, ink `#1c1214`, red velvet `#6b2434` (deep `#3a121c`) for buttons and the footer, and restrained antique gold `#7a6240` / `#c6b48c` for kickers, the timeline, and the Own a Luxe rule. Buttons are velvet with ivory type. Hover is `#4a1522`.

In the works is nine planned services. The squares do not carry a “not offered yet” label. The section copy says they follow RN licensure, injector training, and a Physician, and that treatments are still ahead. Injectables are members-only and only under a Physician. The imported shelf — Paris, Madrid, and South Korea — is named on The Atelier card “Skin, in time,” and again on Products. There is no public shop. The Atelier is a future members-only circle with no fee and no rate. Hours say the practice is on the horizon. Franchise copy is interest only. The Palm Beach office is not for sale. No fees or disclosure.

The LX-06 Gratitude card and seal set is a separate waitlist at `#lx-06` and on `lx-06.html`. It is not one of the shelf pieces, and nothing on that block is for sale. The header label Gratitude and the footer link point there. The Products campaign still links to the guest waitlist.

Products sits after The Atelier and before Standards. The LX-06 block sits after Products and before Standards. Nuit de Velours is the fragrance campaign: a cinematic still, `spa/products/LX-B06-nuit-de-velours-campaign.jpg`, velvet, frost, orchids, and a gold ribbon. That campaign frame stays; it is not the shelf portrait. The eight shelf frames in `spa/products/` are the nano2 masters, `LX-B01-signet-rouge.jpg` through `LX-B08-agua-de-seda.jpg`, shown four at a time on a quiet blue-gray ground. Each card posts a notify note for that SKU through the same FormSubmit address, with the SKU in the subject and body. Status language on that shelf is only Members only, By member appointment, In the works, Taking shape, and On the horizon. Nothing on it is for sale. The pack lettering in these photographs is larger than a tiny house line, and the seals are large medallions. They are used as photographed. Names on the shelf still need a trademark check before a public launch.
