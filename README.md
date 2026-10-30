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

The homepage frame is the static black-and-white portrait `spa/hero-bw.jpg`. It is also the Open Graph image. `hero.mp4`, `night.mp4`, `hero-poster.jpg`, and `night-poster.jpg` stay in the repo and are not used on the hero. `night-poster.jpg` is still the “Own a Luxe” band: the Miami skyline, with the future-studio note on top of it. That band is not a placeholder and does not say “Coming soon.”

What’s coming uses four square black-and-white macros in `spa/`. About uses `founder.jpg`, a photograph of Mateo Ramirez on a Miami terrace at night. `spa/about-lifestyle.jpg` stays in the repo and is not used on the page. The Coral Gables card uses `spa/location-interior.jpg`, a burgundy tiled corridor in a 3:4 frame. These photographs were made for Luxe. They are not pictures of Unit 110, and they are not assets from the reference medspa.

The header uses `logo.png` (white script “luxe”, darkened with CSS on the light ground) and the words “Miami Aesthetics” in small type underneath. The footer sits on red velvet, so the same logo is left white. Page colors are quiet luxury beside the hero: ivory grounds `#f7f2ea` and `#f3ebe2`, ink `#1c1214`, red velvet `#6b2434` (deep `#3a121c`) for buttons and the footer, and restrained antique gold `#7a6240` / `#c6b48c` for kickers, the timeline, and the Own a Luxe rule. Buttons are velvet with ivory type. Hover is `#4a1522`.

What’s coming is four planned services, labeled as not offered yet. Hours say the studio is not open. Franchise copy is interest only: Coral Gables first, other cities including Colombia only after that flagship is real. No fees, maps, or disclosure.
