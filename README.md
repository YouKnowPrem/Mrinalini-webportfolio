# Academic Portfolio: Next.js & Headless WordPress

This is a production-ready, highly optimized, and elegant "Digital Academic Archive" built with Next.js (App Router), TailwindCSS, GSAP, and Headless WordPress.

## Project Structure Overview
```
/academic-portfolio/
│── src/                   # Next.js Application Root
│   ├── app/               # App Router pages and layouts
│   │   ├── globals.css    # Global Tailwind & base styling
│   │   ├── layout.tsx     # Root layout (Fonts, Header, Footer)
│   │   ├── page.tsx       # Landing Page (Hero, Biography, Milestones)
│   │   ├── publications/  # Publications Archive View
│   │   └── archive/       # Writing Archive (Dynamic routes for WP Posts)
│   ├── components/        # Reusable UI Elements (Header, Footer, GsapAnimations)
│   └── lib/               # Utility functions (WP API Fetchers)
│
│── wordpress-cpt.php      # WordPress custom plugin logic (Must-Use or standard plugin)
│── tailwind.config.ts     # Tailwind theme containing brand tokens
│── postcss.config.js      # PostCSS config
│── package.json           # Node dependencies
└── tsconfig.json          # TypeScript config
```

## Environment Variables
Create a `.env.local` file in the Next.js root:

```env
# The URL where WordPress is installed. 
# For example, if your root domain is https://janedoe.edu and WP is in a /cms folder:
NEXT_PUBLIC_WP_URL=https://janedoe.edu/cms/wp-json/wp/v2
```

## Backend: WordPress Setup (/cms)

1. **Install WordPress** via your shared hosting provider (cPanel, cPanel -> Softaculous, etc.) into a subdirectory named `cms`. Your WordPress admin will be available at `yourdomain.com/cms/wp-admin`.
2. **Disable Default Front-end**: Since it's a headless setup, you want WordPress strictly as a backend. Go to Settings > Reading, and ensure Search Engine Visibility is "Discourage search engines from indexing this site".
3. **Register Custom Post Types (CPT)**:
   - Take the `wordpress-cpt.php` file included in this directory.
   - Place it inside `wp-content/plugins/` as a folder (e.g., `wp-content/plugins/academic-portfolio/wordpress-cpt.php`) or `wp-content/mu-plugins/` (Recommended).
   - Activate the plugin. It will create a "Publications" menu on the dashboard and expose it at `/wp-json/wp/v2/publications`.
4. **Permalinks**: Go to Settings > Permalinks and select "Post name". This ensures the REST API endpoints are activated correctly.
5. **Create Content**: Start creating standard "Posts" for essays/blogs and "Publications" for academic papers. Add Custom Fields (e.g., using Advanced Custom Fields plugin) aligned with what `wordpress-cpt.php` expects (`journal_name`, `publication_year`, `external_link`).

## Frontend: Local Development

1. Ensure Node.js (v18+) is installed.
2. Run `npm install` inside the project folder.
3. Edit `.env.local` to point to your live or local WP instance.
4. Run `npm run dev` to start the Next.js server locally at `http://localhost:3000`.

## Production Deployment to Shared Hosting

Most shared hosting platforms (like Bluehost, HostGator, SiteGround) use cPanel and are heavily optimized for PHP/Apache, not Node.js servers. You have two options for Next.js:

### Option A: Static Export (Recommended for Shared Hosting)

Since the website is mostly static content managed by an academic, exporting Next.js to static HTML/CSS/JS is highly performant and requires zero Node.js server support.

1. **Update `next.config.mjs` (or `.js`)**:
   ```javascript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     images: {
       unoptimized: true, // Required for static export
     },
   };
   module.exports = nextConfig;
   ```
2. Run `npm run build`. Next.js will fetch all WordPress data during build time and generate static HTML files inside an `out/` directory.
3. **Deploying**:
   - Access your shared hosting via FTP or cPanel File Manager.
   - Navigate to `public_html/`.
   - Upload the *contents* of your `out/` folder directly into `public_html/`.
   - Your site is now live! 
   
*Note: Using Static Export means if you update a post in WordPress, you must manually rebuild and re-upload the Next.js app. Alternatively, use GitHub Actions to automate this on a schedule.*

### Option B: Node.js App via cPanel

If your shared host supports Node.js applications (e.g., via Phusion Passenger):

1. Run `npm run build`.
2. Create a Node.js Application in cPanel. Set the entry point to `.next/standalone/server.js` (You must enable `output: 'standalone'` in Next.js config first).
3. Copy `.next/standalone`, `public/`, and `.next/static/` to the server root.
4. Restart the Node.js app pointing to `/`.

Option A is drastically simpler and more secure for this use case.

## Architecture Highlights
- **GSAP Animations**: Used sparsely. Only a `FadeInBlock` component adds a subtle upward translate reveal.
- **Tailwind**: Global styles enforce `Lora` for body texts and `Playfair Display` for headings, matching the #F5F1E8 and #3A2E2A color scheme.
- **API Utilities**: Isolated in `lib/wp.ts` to fetch WordPress data seamlessly via the JSON REST API. 
