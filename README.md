# George A Nowacek II Personal Website

Personal website for George A Nowacek II, built as a fast static React site for GitHub Pages and the custom domain `george-nowacek.com`.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
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
- Projects: `src/data/projects.ts`
- Publications: `src/data/publications.ts`
- Teaching: `src/data/teaching.ts`
- Experience: `src/data/experience.ts`
- Education: `src/data/education.ts`
- Site-wide settings, links, current focus, and `/now`: `src/data/site.ts`

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

Add real contact and social URLs in `src/data/site.ts`. Unknown links are intentionally blank so the site does not invent contact information.

## Deployment

This repository includes a GitHub Actions workflow at `.github/workflows/pages.yml`.

On every push to `main`, the workflow:

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

## Custom Domain

The file `public/CNAME` contains:

```text
george-nowacek.com
```

Vite copies this into the production build, which tells GitHub Pages the intended custom domain.

In GitHub repository settings:

1. Go to Settings -> Pages.
2. Enter `george-nowacek.com` as the custom domain.
3. Save the domain.
4. Wait for DNS and certificate provisioning.
5. Enable Enforce HTTPS once GitHub makes it available.

For current DNS records, use GitHub's official custom-domain documentation rather than copying IP addresses from this README:

- [Managing a custom domain for your GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [About custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages)
- [Troubleshooting custom domains and GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages)

For the apex domain `george-nowacek.com`, configure the apex records your DNS provider supports according to GitHub's current docs. Do not use wildcard DNS records.

For `www.george-nowacek.com`, configure the `www` subdomain according to GitHub's current docs, typically as the canonical `www` record pointing to the GitHub Pages host GitHub specifies. Once both apex and `www` are configured correctly, GitHub Pages can redirect between the two forms based on the custom domain selected in repository settings.

GitHub also supports domain verification for additional protection. If available for the account, verify `george-nowacek.com` in GitHub account or organization settings before relying on the domain for a public professional site.

## Notes

The app uses a post-build step to create static files for `/now/` and `404.html`, so direct navigation works on GitHub Pages without assuming a repository subpath. The Vite base is `/`, which is appropriate for the custom apex domain.
