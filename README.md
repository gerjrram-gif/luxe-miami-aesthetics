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

## Hero film

| File | Role |
| --- | --- |
| `hero.mp4` | Muted H.264, 1920×1080, about 12 seconds. The red LED treatment dissolves into the Miami night skyline. Wired with `preload="none"`, `muted`, `autoplay`, `loop`, and `playsinline`. The page crossfades to `night.mp4` near the end of each pass, then returns to the treatment. |
| `night.mp4` | Muted H.264, 1920×1080, about 9 seconds. The Miami night half of `hero.mp4`, played forward and back. Used in the hero crossfade. Not downloaded when `prefers-reduced-motion` is set. |
| `night-poster.jpg` | Still of that skyline. Hero fallback, the Coral Gables location card, and the “Own a Luxe” band. |
| `hero-poster.jpg` | Shown before playback and whenever `prefers-reduced-motion` is set. Also the Open Graph image. |
| `hero-mobile.mp4` | Optional. Not in the repo. Phones use `hero.mp4` until a shorter cut is added. |

Footage is Mixkit Free License: clinic clip 52164 and Miami night lights clip 12028. `night.mp4` is adapted from the night portion of `hero.mp4`. No additional stock.

The header uses `logo.png` (white script “luxe”, darkened with CSS on the light bar) and the words “Miami Aesthetics” in small type underneath. The footer keeps the white script on navy. `founder.jpg` is Mateo’s rooftop portrait, shown in full in About.

What’s coming is four planned services, labeled as not offered yet. Hours say the studio is not open. Franchise copy is interest only: Coral Gables first, other cities including Colombia only after that flagship is real. No fees, maps, or disclosure.
