# Luxe Miami Aesthetics

Static landing page for the Coral Gables practice opening in 2028. Not yet offering treatments. Suited to static hosting (the site root is the public folder).

## Hero film

| File | Role |
| --- | --- |
| `hero.mp4` | Muted H.264, 1920×1080, about 12 seconds. The red LED treatment dissolves into the Miami night skyline. Wired with `preload="none"`, `muted`, `autoplay`, `loop`, and `playsinline`. The page crossfades to `night.mp4` near the end of each pass, then returns to the treatment. |
| `night.mp4` | Muted H.264, 1920×1080, about 9 seconds. The Miami night half of `hero.mp4`, played forward and back so the loop stays still. Used in the hero crossfade and the full-bleed moment. Not downloaded when `prefers-reduced-motion` is set. |
| `night-poster.jpg` | Still of that skyline, shown before `night.mp4` plays and in place of it when motion is reduced. |
| `hero-poster.jpg` | Shown before playback and whenever `prefers-reduced-motion` is set. Also the Open Graph image. |
| `hero-mobile.mp4` | Optional. Not in the repo. Phones use `hero.mp4` until a shorter cut is added. |

Footage is Mixkit Free License: clinic clip 52164 and Miami night lights clip 12028. `night.mp4` is adapted from the night portion of `hero.mp4` (clip 12028). No additional stock.

`confirmed.html` is the no-JavaScript waitlist confirmation (Formspree `_next`). With JavaScript, a successful signup stays on the page and shows the same confirmation. The form still posts to the placeholder `https://formspree.io/f/your-form-id` until a real Formspree id is set.

Replace `hero.mp4` and `hero-poster.jpg` in the site root and keep those names. To use a mobile cut, add `hero-mobile.mp4` and a `<source>` with `media="(max-width: 760px) and (prefers-reduced-motion: no-preference)"` ahead of the default source in `index.html`.

The header and footer use `logo.png` (white script “luxe” only) with the words “Miami Aesthetics” set in small type underneath. `founder.jpg` is Mateo’s rooftop portrait, shown in full in the Founder section.
