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

This website is built with modern web technologies to provide a fast, accessible, and user-friendly experience.

### Frontend Framework
- **React 19.2.0** - Modern UI library for building interactive user interfaces
- **React Router DOM 7.9.6** - Client-side routing for single-page application navigation

### Styling
- **CSS3 with Custom Properties** - Modern CSS with CSS variables for a consistent design system
- **Responsive Design** - Mobile-first approach with breakpoints for all device sizes
- **CSS Modules** - Scoped styling to prevent conflicts

### Development Tools
- **Create React App 5.0.1** - Build tooling and development environment
- **React Scripts** - Zero-configuration build setup
- **ESLint** - Code linting and quality assurance

### Analytics & Tracking
- **Google Analytics** - Website analytics and user behavior tracking
- **Web Vitals** - Performance monitoring

### Form Handling
- **Formspree** - Contact form submission service (no backend required)

### Deployment
- **GitHub Pages** - Static site hosting via `gh-pages`
- **Vercel/Netlify Ready** - Configured for modern deployment platforms

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
├── public/
│   ├── index.html          # Main HTML template with meta tags
│   ├── sitemap.xml         # SEO sitemap
│   ├── manifest.json        # PWA manifest
│   └── og-image.jpg        # Social media preview image
├── src/
│   ├── App.js              # Main application component with routing
│   ├── App.css             # Global styles and design system
│   ├── index.js            # Application entry point
│   ├── utils/
│   │   └── analytics.js   # Google Analytics utilities
│   └── components/         # (Future: component organization)
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

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
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run deploy` - Deploys to GitHub Pages

## Configuration

### Contact Form Setup

The contact form uses Formspree. To configure:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form endpoint in `src/App.js` (line ~779):
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
   ```

### Google Analytics Setup

1. Create a Google Analytics account
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Update `public/index.html` with your tracking ID (around line 50)

### Environment Variables (Optional)

Create a `.env` file in the root directory:
```
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
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
- **Netlify**: Drag and drop the `build` folder or connect via Git
- **Any static hosting**: Upload the `build` folder contents

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
