# Personal Portfolio

A plain HTML/CSS/JS portfolio. No build step, no dependencies.

## Files
- `index.html` – content and structure
- `style.css` – all styling, including dark mode (see the `:root` and `[data-theme="dark"]` blocks)
- `script.js` – theme toggle, mobile menu, scroll animations, contact form

## Customise (search for `EDIT` in the files)
1. **Name & title** – `<title>`, hero heading, footer, nav logo.
2. **Projects** – replace the 4 sample cards. Keep to 3–5 strong ones.
3. **About** – two short paragraphs. Replace the `YN` placeholder with `<img src="me.jpg" alt="Your Name" />`.
4. **Skills** – only list things you can discuss in an interview.
5. **Links** – email, GitHub, LinkedIn, Kaggle in the Contact section.
6. **Colours** – change the variables at the top of `style.css`.

## Make the contact form work
1. Sign up free at https://formspree.io and create a form.
2. Copy its ID (the part after `/f/`).
3. In `script.js`, set `FORMSPREE_ID` and `FALLBACK_EMAIL`.

Until you do, the form opens the visitor's email app instead.

## Run locally
Open `index.html` in a browser. Or run `python -m http.server` in this folder and visit http://localhost:8000.

## Deploy free
- **GitHub Pages:** push to a repo named `yourusername.github.io`, or enable Pages in repo settings.
- **Netlify:** drag the folder onto https://app.netlify.com/drop.

## Before you share it
- Add a real resume link and a photo.
- Remove every placeholder (`Your Name`, `#` links, `you@example.com`).
- Run Lighthouse in Chrome DevTools and check mobile view.
