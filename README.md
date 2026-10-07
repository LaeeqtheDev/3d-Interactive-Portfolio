<h1 align="center">3D Interactive Portfolio</h1>

<p align="center">
  A WebGL island you rotate to move through four stages, with About, Projects and Contact pages behind it.<br/>
  Built to load fast on a mid-range phone and to stay maintainable.
</p>

<p align="center">
  <a href="https://laeeqthedevportfolio.vercel.app"><img src="https://img.shields.io/badge/Live_Site-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live site"></a>
</p>

---

## What it is

The landing route is a single React Three Fiber scene: a low-poly island, a biplane, a bird and a sky dome. Dragging the island, or holding the arrow keys, rotates it. The rotation angle maps to four stages (Intro, Background, Work, Contact), and each stage shows a card that links to the matching page. The three inner pages are ordinary DOM routes that open under the same sky.

Putting a 3D scene on a web page is easy. The work in this repository is everything that makes it cheap: what is in the first download, what waits, what stops rendering when nobody is looking, and what never touches React's render cycle.

---

## Engineering decisions

**The landing bundle carries only the scene.** `Home` is imported statically because it is the first thing a visitor sees. `About`, `Projects` and `Contact` are `React.lazy` routes. Once the browser is idle, `App.jsx` prefetches those chunks so navigation is instant, and it skips the prefetch entirely on Data Saver or a 2G/3G connection.

**Three.js is cached separately from everything else.** `vite.config.js` splits `three`, `@react-three/*` and `@react-spring/*` into one vendor chunk and React into another. A copy change on the About page does not invalidate 237 KB of WebGL code in a returning visitor's cache.

**The animation library is not on the landing route.** GSAP and ScrollTrigger live in their own chunk that only the inner pages import. The one animated component on the landing page, the stage bar, is plain CSS (`StageProgress.jsx`) so that a single `scaleX` transition did not drag 45 KB of gzipped JavaScript in front of first paint.

**Per-frame work stays out of React.** The island's rotation, damping and stage detection run in `useFrame` and mutate refs. React state changes only when the stage changes or a drag starts or ends. Pointer and keyboard listeners are attached once and read the latest handlers from a ref, so a drag does not add and remove five listeners on every render (`models/Island.jsx`).

**A canvas that nobody can see does not render.** `useCanvasActive` combines an `IntersectionObserver` with the Page Visibility API and feeds R3F's `frameloop`. The plane on the About page and the fox on the Contact page stop drawing when they scroll out of view or the tab is hidden.

**Nothing third-party sits in front of first paint.** The models are Draco-compressed, so without the decoder nothing renders. The decoder is served from `/draco/` on this origin (`lib/draco.js`) instead of the library's default CDN, and the three fonts are self-hosted Latin subsets. The page makes no cross-origin request before the scene is on screen.

**Resolution is capped where it is wasted.** Device pixel ratio is limited to 1.5 on phones and 2 on desktop, antialiasing is off on phones, and `performance={{ min: 0.5 }}` lets R3F lower resolution during a drag and restore it afterwards.

**Motion follows four rules** (`lib/motion.js`): only `transform` and `opacity` are animated; every scroll reveal runs once and then stops observing; `prefers-reduced-motion` reduces everything to a short fade; and every page wraps its animations in `gsap.context()` and reverts them on unmount. The counters on the About page write to `textContent` directly so a count-up does not re-render the section sixty times a second.

**Every route has an address that works.** `vercel.json` rewrites unknown paths to `index.html`, so `/about`, `/projects` and `/contact` load when opened directly instead of returning 404. Each page sets its own title, description and canonical URL through `usePageMeta`, and `robots.txt` and `sitemap.xml` list the four routes.

**Content is data.** Profile, experience, skills and projects live in `src/constants/index.js`. Pages render from it, and a project card shows only the buttons it has a real URL for.

---

## Measured

Numbers from `npm run build` on this commit, gzip level 9.

| What a visitor downloads | Size |
|---|---|
| Landing JavaScript (app + React + Three.js) | 300 KB gzipped |
| of which Three.js vendor chunk | 237 KB gzipped |
| Stylesheet | 7 KB gzipped |
| Animation chunk, inner pages only | 45 KB gzipped |
| About / Projects / Contact route chunks | 2 to 4 KB gzipped each |
| Landing scene models (island, sky, bird, plane) | 1.03 MB |
| Fox model, loaded with the Contact page | 99 KB |
| Fonts (three woff2 files) | 111 KB |

The Three.js chunk is the floor for this design. It is the price of the scene, and it is why everything around it is kept small.

---

## Accessibility

- The island rotates with the left and right arrow keys as well as by dragging.
- The stage bar announces the current stage through an `aria-live` region.
- Split-word headline animations keep one `aria-label` on the heading so a screen reader hears a sentence, not fragments.
- Keyboard focus is always visible, the mobile menu exposes `aria-expanded`, and reduced-motion preferences are respected in both CSS and JavaScript.
- A `<noscript>` message gives a contact address when JavaScript is unavailable.

---

## Tech stack

| Layer | Choice | Why |
|---|---|---|
| 3D runtime | Three.js | Mature WebGL abstraction with predictable performance |
| React bindings | React Three Fiber, drei | Declarative scene composition with direct access to Three.js objects by ref |
| Animation | GSAP + ScrollTrigger | Timeline control and scroll-linked reveals, isolated to the inner pages |
| Routing | React Router 6 | Route-level code splitting with `React.lazy` |
| Styling | Tailwind CSS plus a small layer of named classes | No runtime cost; design tokens in one config |
| Contact form | EmailJS | Sends mail without a backend; the address is shown as a fallback if it fails |
| Build | Vite | Fast iteration when tuning a scene by eye, with manual chunking where it matters |

---

## Project structure

```
public/
  draco/           Draco decoder, served from this origin
  og-image.jpg     Share image for link previews
  robots.txt, sitemap.xml
src/
  assets/3d/       Draco-compressed .glb models
  assets/fonts/    Self-hosted woff2 fonts and their licences
  components/      UI: navbar, footer, stage bar, landing cards, counters, icons
  constants/       All site content as data
  hooks/           useCanvasActive (pause offscreen canvases), usePageMeta, useAlert
  lib/             draco.js (decoder path), motion.js (animation rules and helpers)
  models/          One component per 3D model
  pages/           Home (the scene), About, Projects, Contact
  App.jsx          Routes, lazy loading, idle prefetch
vercel.json        Rewrite so deep links resolve to the app
```

---

## Running locally

Requires Node 18 or newer.

```bash
git clone https://github.com/LaeeqtheDev/3d-Interactive-Portfolio.git
cd 3d-Interactive-Portfolio
npm install
npm run dev        # http://localhost:5173
```

```bash
npm run build      # production build
npm run preview    # serve the build locally
```

The contact form reads three variables from `.env.local`:

```
VITE_APP_EMAILJS_SERVICE_ID=
VITE_APP_EMAILJS_TEMPLATE_ID=
VITE_APP_EMAILJS_PUBLIC_KEY=
```

---

## Trade-offs

- **The landing page needs WebGL.** The inner pages work without it, but there is no 2D version of the island. That is acceptable for a portfolio aimed at a technical audience and would be the wrong call for a general one.
- **The site is client-rendered.** Search engines that run JavaScript see each route's own title and description. Link previews do not run JavaScript, so every shared URL shows the home page's card, and crawlers that skip scripts get only the metadata, the JSON-LD profile and the `<noscript>` text. Prerendering the three inner routes is the fix.
- **JavaScript, not TypeScript.** The scene passes enough props between components that types would pay for themselves. The migration is planned, not done.
- **No automated tests.** The rotation-to-stage mapping is the one piece of logic worth unit testing, and it is currently inline in a frame callback. It should be a pure function with tests.
- **The decoder adds a request.** Draco compression keeps the five models at 1.1 MB in total and costs one WebAssembly fetch before the first model can decode.

---

## Roadmap

- [ ] Extract the stage mapping into a tested pure function
- [ ] Prerender About, Projects and Contact
- [ ] TypeScript migration
- [ ] Lighthouse budget in CI that fails on regression

---

## Origins and credits

The island scene, its models and the drag-to-rotate interaction started from JavaScript Mastery's 3D portfolio tutorial. The work in this repository is what was built on that base: the bundle splitting and prefetching, the render-loop and listener fixes, canvas pausing, model compression and self-hosted decoding, the stage bar, the three inner pages and their design, accessibility, and the content model.

3D models, from Sketchfab, each under its author's licence:

- Island: [Fox's islands](https://sketchfab.com/3d-models/foxs-islands-163b68e09fcc47618450150be7785907)
- Biplane: [Stylized WW1 Plane](https://sketchfab.com/3d-models/stylized-ww1-plane-c4edeb0e410f46e8a4db320879f0a1db)
- Bird: [Phoenix bird](https://sketchfab.com/3d-models/phoenix-bird-844ba0cf144a413ea92c779f18912042)
- Fox: [Fox](https://sketchfab.com/3d-models/fox-f372c04de44640fbb6a4f9e4e5845c78)

Fonts: Bricolage Grotesque, Work Sans and B612 Mono, all under the SIL Open Font License.

---

## Author

**Syed Laeeq Ahmed**, Founder & Lead Engineer at North Foundry

[Portfolio](https://laeeqthedevportfolio.vercel.app) · [LinkedIn](https://www.linkedin.com/in/syed-laeeq-ahmed/) · [GitHub](https://github.com/LaeeqtheDev) · laeeqthedev@gmail.com

## License

All rights reserved for the code, copy and personal branding. The source is public to read. The 3D models and fonts remain under their own licences.
