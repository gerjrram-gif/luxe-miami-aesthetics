# Luxe Miami Aesthetics

Static site for the Coral Gables flagship, planned for 2028. Not yet offering treatments. A franchise is not being offered. The site root is the public folder.

The homepage follows a medspa landing rhythm — light header, full-bleed hero, perk band, treatment cards, a standards carousel, one location, an about split, a future-studio block, waitlist, and a dark footer — written entirely for Luxe.

## Pages

| File | Role |
| --- | --- |
| `index.html` | Homepage. Guest waitlist and future-studio interest both post to the Formspree placeholder. |
| `confirmed.html` | No-JavaScript confirmation for the guest waitlist. |
| `interest.html` | No-JavaScript confirmation for a future-studio note. It is not a franchise offer. |

With JavaScript, a successful signup stays on the homepage and shows the matching confirmation. Both forms still post to `https://formspree.io/f/your-form-id` until a real Formspree id is set.

## Photography

The homepage frame is the static black-and-white portrait `spa/hero-bw.jpg`. It is also the Open Graph image. `hero.mp4`, `night.mp4`, `hero-poster.jpg`, and `night-poster.jpg` stay in the repo and are not used on the hero or on Own a Luxe. The Own a Luxe band is `spa/own-golden-hour.jpg`, an original golden-hour photograph made for Luxe: a calm Coral Gables waterfront, cream Mediterranean houses, burgundy bougainvillea, antique-gold light. It is not a night skyline and not an asset from the reference medspa.

What’s coming uses four square black-and-white macros in `spa/`. About uses `spa/about-lifestyle.jpg`, a warm lifestyle portrait. That photo is not Mateo. `founder.jpg` stays in the repo. The Coral Gables card uses `spa/location-interior.jpg`, a burgundy tiled corridor in a 3:4 frame. These photographs were made for Luxe. They are not pictures of Unit 110, and they are not assets from the reference medspa.

The header and footer use `logo.png` (white script “luxe”, darkened with CSS on the light ground) and the words “Miami Aesthetics” in small type underneath. Page colors follow the light palette sampled from the reference site: `#fefbf5`, `#fdf7ee`, `#ffffff`, `#000000`, `#878787`, `#dddddd`, `#ede1d5`, `#c2a68d`, `#b27860`, and buttons `#000000` / `#fefbf5` with hover `#633631`.

What’s coming is four planned services. The squares do not carry a “not offered yet” label. The section copy still says they are planned for after licensure and are not available now. Hours say the studio is not open. Franchise copy is interest only: Coral Gables first, other cities including Colombia only after that flagship is real. No fees, maps, or disclosure.
