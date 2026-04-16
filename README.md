# Health Decoded

**Building an international community of youth using health education to change the world.**

[![Website](https://img.shields.io/badge/Website-healthdecodedinitiative.org-blue)](https://healthdecodedinitiative.org)
[![Linktree](https://img.shields.io/badge/Linktree-linktr.ee/healthdecodedinit-green)](https://linktr.ee/healthdecodedinit)

## About Health Decoded

Health Decoded is a nonprofit organization dedicated to bridging the health literacy gap for youth by transforming complex healthcare information into clear, accessible, and culturally responsive education. We aim to ensure that every young person—regardless of background, language, or socioeconomic status—has the knowledge to understand their health, navigate medical systems, and make informed decisions.

### Our Mission

Healthcare touches everyone, and so should health education. Health Decoded empowers young people—especially those from under-resourced or multilingual communities—to understand healthcare in a way that feels simple, supportive, and culturally aware. We provide a space where medical information is broken down into something approachable and human, regardless of a student's background or prior knowledge.

### Our Programs

- **School Workshops**: In-school and after-school workshops teaching essential health literacy skills, from navigating doctor visits to understanding prescriptions and insurance
- **Peer Health Ambassador Program**: Training program for youth to become peer health ambassadors, developing communication skills and advocacy expertise

### Our Story

Health Decoded began with an observation that many people, even in well-resourced environments, lacked fundamental health literacy education. Despite healthcare being universal—something everyone will interact with throughout their lives—young people are rarely taught how to navigate it. This realization led to the creation of Health Decoded, an organization that empowers young people to understand healthcare in an accessible, culturally aware way.

## Tech Stack

This website is built as a Next.js application with static export output.

### Frontend Framework
- **Next.js 15 (App Router)** - Routing, layouts, metadata, and build system
- **React 19** - Component and UI rendering layer
- **TypeScript** - Type-safe application and component development

### Styling & UI
- **Tailwind CSS** - Utility-first styling
- **PostCSS + Autoprefixer** - CSS processing pipeline
- **Framer Motion** - Animations and transitions
- **Lucide React** - Icon system
- **clsx + tailwind-merge** - Conditional and conflict-safe class composition

### Code Quality
- **ESLint (Next.js config)** - Linting and code quality checks

### Analytics & Forms
- **Google Analytics (gtag.js)** - Website analytics and event tracking
- **Web Vitals** - Performance metric support
- **Formspree** - Contact form submission service

### Deployment
- **Static export** using Next.js `output: 'export'`
- **GitHub Pages** deployment via `gh-pages` and the generated `out/` directory

## Features

### User Experience
- ✅ Fully responsive design (mobile, tablet, desktop)
- ✅ Accessible navigation with ARIA labels and keyboard support
- ✅ Smooth page transitions and animations
- ✅ Sticky navigation with scroll effects
- ✅ Mobile-friendly hamburger menu
- ✅ Modal dialogs for user interactions

### Content Pages
- **Home**: Hero section, value propositions, featured programs, call-to-action
- **About Us**: Mission statement and organization overview
- **Our Story**: The founding story and vision behind Health Decoded
- **Our Team**: Meet the team members driving the mission forward
- **Programs**: Detailed information about workshops and ambassador programs
- **Get Involved**: Multiple ways to participate (volunteer, ambassador, chapters, partnerships)
- **Contact**: Contact form with validation and direct email option

### SEO & Performance
- ✅ Dynamic page titles for each route
- ✅ Comprehensive meta tags (Open Graph, Twitter Cards)
- ✅ Structured data (JSON-LD) for search engines
- ✅ Sitemap.xml for search engine indexing
- ✅ Optimized images with lazy loading
- ✅ Web manifest for PWA capabilities

### Accessibility
- ✅ Semantic HTML structure
- ✅ ARIA labels and roles
- ✅ Keyboard navigation support
- ✅ Focus management for modals
- ✅ Screen reader friendly
- ✅ High contrast ratios for readability

## Project Structure

```
healthdecoded/
├── app/                    # App Router pages, layouts, and global styles
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── contact/
│   ├── about/
│   ├── programs/
│   └── get-involved/
├── components/             # Shared UI and feature components
│   ├── ui/
│   └── motion/
├── utils/
│   └── analytics.ts        # Google Analytics utilities
├── public/
│   ├── index.html
│   ├── sitemap.xml
│   ├── manifest.json
│   ├── robots.txt
│   └── CNAME
├── next.config.js          # Static export and Next.js config
├── tailwind.config.js
├── postcss.config.mjs
├── package.json
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/healthdecoded.git
cd healthdecoded
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm run start` - Starts the production server (non-static hosting use)
- `npm run lint` - Runs ESLint
- `npm run typecheck` - Runs TypeScript type checks
- `npm run deploy` - Deploys to GitHub Pages

## Configuration

### Contact Form Setup

The contact form uses Formspree. To configure:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form endpoint in `app/contact/page.tsx`:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Google Analytics Setup

1. Create a Google Analytics account
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add your tracking ID to environment variables and reference it in the app analytics setup

### Environment Variables (Optional)

Create a `.env` file in the root directory:
```
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
```

## Design System

The website uses a consistent design system built with CSS custom properties:

- **Colors**: Primary blue gradient, secondary purple, accent raspberry
- **Typography**: Responsive font scales with consistent line heights
- **Spacing**: Consistent spacing scale using CSS variables
- **Shadows**: Layered shadow system for depth
- **Border Radius**: Consistent rounded corners
- **Transitions**: Smooth animations respecting `prefers-reduced-motion`

## Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment:

```bash
npm run build
npm run deploy
```

### Other Platforms

The project can be deployed to:
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Ensure publish output points to `out/` for static export
- **Any static hosting**: Upload the `out` folder contents

## Team

- **Ruvanthika Sivaprakasini Veerasikku** - Executive Director
- **Celdave Weaver** - Director of Education & Outreach
- **Ryan Purakal** - Director of Technology
- **Gil Shenoy** - Director of Operations
- **Kartik Narula** - Director of Communications

## Contact

- **Email**: kartikn@healthdecodedinitiative.org
- **Website**: [healthdecodedinitiative.org](https://healthdecodedinitiative.org)
- **Linktree**: [linktr.ee/healthdecodedinit](https://linktr.ee/healthdecodedinit)

## License

This project is proprietary and confidential. All rights reserved by Health Decoded Initiative.

## Contributing

This is a private project for Health Decoded Initiative. For inquiries about contributing or partnerships, please contact us through our website.

---

**Built with ❤️ by the Health Decoded team**
