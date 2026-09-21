# Shruti Halde Portfolio

A static portfolio for GitHub Pages. No build step and no dependencies.

## Files
- `index.html`: all page content
- `styles.css`: design tokens at the top, then components
- `script.js`: mobile menu, current-section nav highlight, copy-email button
- `ShrutiHaldeResume.pdf`: linked from the hero and contact section
- `fonts/`: self-hosted Bricolage Grotesque and Source Serif 4 (licenses in `fonts/LICENSES.txt`)
- `images/`: headshot in three sizes (`Shruti-profile.jpg`, `-640`, `-960`)

## Deploy to GitHub Pages
1. Copy these files into the root of your `shruti0603.github.io` repository, overwriting the old `index.html`, `styles.css`, and `script.js`.
2. Commit and push.
3. In the repo settings, open **Pages** and set the source to the main branch root.

## Customize
- **Colors and fonts:** edit the `:root` block at the top of `styles.css`. Green (`--signal`) is reserved for measurable results and availability.
- **Content:** edit `index.html`. Wrap a result in `<strong class="metric">` to make it green.
- **Availability line:** the "Open to software engineering roles" text sits at the top of the hero. Change or remove it when your status changes.
- **Social preview image:** the `og:image` URL in `index.html` assumes your site is at `shruti0603.github.io`. Update it if you use a custom domain.

## Optional cleanup
The repository still contains template leftovers that this page does not use: `css/`, `js/`, `lib/`, `scss/`, `prepros-6.config`, unused images (`bg_1.*`, `about-me.png`, `proj_*.jpg`, `Shruti pic.jpg`), and `.DS_Store` files. They are safe to delete.
