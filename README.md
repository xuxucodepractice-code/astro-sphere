# Zijian Xu Portfolio

Personal academic website for Zijian Xu, built with Astro, Tailwind CSS, and SolidJS.

The site presents my academic trajectory, research projects, writing, and contact information for PhD applications and research networking. The central theme is reliable AI decision systems under uncertainty, with finance as a rigorous testbed and connections to robotics, agentic AI, recommender systems, and sequential modeling.

Project name: `zijian-xu`

Production URL: https://zijian-xu-xuxucodepractice-codes-projects.vercel.app

## Site Structure

- `src/pages/index.astro` - Home page, hero, recent writing, recent projects, contact links.
- `src/pages/work/index.astro` - Education and academic background.
- `src/pages/blog` - Writing collection and article pages.
- `src/pages/projects` - Research and engineering project collection.
- `src/pages/about.astro` - Personal research preparation, systems, sport, and long-term development.
- `src/content` - Markdown content collections for writing, projects, education, and legal pages.
- `public` - Static assets, icons, scripts, fonts, and Open Graph image.

## Tech Stack

- Astro 4
- Tailwind CSS
- SolidJS islands for search and filters
- Fuse.js for local search
- Astro content collections for typed Markdown content
- Astro sitemap and RSS integrations

## Commands

All commands run from the project root.

| Command | Action |
| :-- | :-- |
| `npm install` | Install dependencies |
| `npm run dev` | Start local development server |
| `npm run dev:network` | Start local development server on the local network |
| `npm run build` | Run Astro checks and build the static site |
| `npm run preview` | Preview the production build locally |
| `npm run astro -- --help` | Show Astro CLI help |

## Content Updates

Add writing posts under `src/content/blog/<slug>/index.md`.

Add research projects under `src/content/projects/<slug>/index.md`.

Add education entries under `src/content/work/*.md`.

Each collection is typed in `src/content/config.ts`, so missing required frontmatter is caught during `npm run build`.

## Deployment

The canonical site URL is configured in `astro.config.mjs`. Update that value when moving from the current Vercel deployment to a custom domain.

## License

MIT
