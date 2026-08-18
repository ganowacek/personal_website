# George A Nowacek II Personal Website

Personal website for George A Nowacek II, built as a fast static React site for GitHub Pages.

Current status:

- The repository is private while I review and revise the site.
- GitHub Pages is currently disabled, so there is no public URL yet.
- The site content should follow from `public/George_Nowacek_CV.pdf`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

With the current GitHub Pages project-site base path, local preview opens at:

```text
http://127.0.0.1:5173/george-nowacek.com/
```

Build the production site:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Updating Content

Most content is stored in small data files:

- Research: `src/data/research.ts`
- Publications: `src/data/publications.ts`
- Teaching: `src/data/teaching.ts`
- Experience: `src/data/experience.ts`
- Education: `src/data/education.ts`
- Site-wide settings, links, current focus, and `/now`: `src/data/site.ts`

Use the CV as the source of truth for public content. Do not add biographical, research, teaching, publication, experience, or education details unless they are supported by the CV or intentionally added to it first.

To add a publication, edit `src/data/publications.ts` and add an object with fields such as `title`, `authors`, `journal`, `year`, `doi`, `pubmed`, `pdf`, `citation`, and `status`.

To add the CV, place the PDF at:

```text
public/George_Nowacek_CV.pdf
```

Then set `cvAvailable: true` in `src/data/site.ts`.

To update the headshot, replace:

```text
public/headshot.jpg
```

Keep the same filename, or update the image path in `src/pages/HomePage.tsx`.

Contact and social URLs live in `src/data/site.ts`. Unknown links are intentionally blank so the site does not invent contact information.

## Visual System

The homepage uses a browser-native canvas scene inspired by Manim-style programmatic mathematical animation. Manim itself is not bundled into the GitHub Pages site; Manim-generated assets should be rendered outside the app and added to `public/` as static web media.

## Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

While the repository is private and the public site is paused, the workflow runs only when started manually from the Actions tab. When the site is ready to publish again, make the repository public if needed, re-enable GitHub Pages, and either run the workflow manually or add the `push` trigger back.

When run, the workflow:

1. Checks out the repository.
2. Installs dependencies with `npm ci`.
3. Configures GitHub Pages.
4. Builds the Vite site.
5. Uploads the `dist` folder as a Pages artifact.
6. Deploys that artifact to GitHub Pages.

The workflow follows GitHub's custom workflow pattern for Pages deployment using official GitHub Pages actions. See GitHub's documentation for [using custom workflows with GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Enabling GitHub Pages

After pushing the repository to GitHub:

1. Open the repository on GitHub.
2. Go to Settings -> Pages.
3. Under Build and deployment, set Source to GitHub Actions.
4. Push to `main` or run the workflow manually from the Actions tab.

## Notes

The app uses a post-build step to create static files for `/now/` and `404.html`, so direct navigation works on GitHub Pages. The Vite base is `/george-nowacek.com/`, which is required because this is deployed as a GitHub Pages project site rather than a custom-domain apex site.
