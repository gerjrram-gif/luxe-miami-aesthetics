# Luxe Miami Aesthetics

Static landing page for the Coral Gables practice opening in 2028. Not yet offering treatments. Suited to static hosting (the site root is the public folder).

## Hero film

| File | Role |
| --- | --- |
| `hero.mp4` | Muted H.264, 1920×1080, about 12 seconds. The red LED treatment dissolves into the Miami night skyline. Wired with `preload="none"`, `muted`, `autoplay`, `loop`, and `playsinline`. |
| `hero-poster.jpg` | Shown before playback and whenever `prefers-reduced-motion` is set. Also the Open Graph image. |
| `hero-mobile.mp4` | Optional. Not in the repo. Phones use `hero.mp4` until a shorter cut is added. |

Footage is Mixkit Free License: clinic clip 52164 and Miami night lights clip 12028.

Replace `hero.mp4` and `hero-poster.jpg` in the site root and keep those names. To use a mobile cut, add `hero-mobile.mp4` and a `<source>` with `media="(max-width: 760px) and (prefers-reduced-motion: no-preference)"` ahead of the default source in `index.html`.

The header and footer use `logo.png`: white script “luxe” and white “MIAMI AESTHETICS” on a transparent field, so the mark sits in the navy bar. The footer is the same navy so the white type stays readable.
