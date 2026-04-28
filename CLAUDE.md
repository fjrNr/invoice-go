# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Notice: Next.js 16 Breaking Changes

**This is NOT the Next.js you know.** This project uses Next.js 16.2.1, which has significant breaking changes from previous versions. APIs, conventions, and file structures may differ from training data. Before writing any code, read the relevant guide in `node_modules/next/dist/docs/` and pay attention to deprecation notices.

## Development Commands

```bash
# Start development server (http://localhost:3000)
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run ESLint
npm run lint
```

## Architecture Overview
### Project Structure
- **`src/`** - All source code (using src directory pattern)
- **`src/app/`** - App Router pages and layouts
- **`src/app/components/`** - Reusable UI components for the landing page
- **`public/`** - Static assets (SVGs, images)

### Tech Stack
- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.5** - Latest React with new features
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS v4** - Latest version with CSS-based configuration
- **ESLint flat config** - Using eslint.config.mjs (not .eslintrc)

### Key Configuration Patterns

**Import Alias:** `@/*` maps to `./src/*` for clean imports:
```typescript
import Component from "@/components/Component" // maps to src/components/Component
```

**Tailwind CSS v4:** This project uses Tailwind v4 which does NOT use `tailwind.config.ts`. Configuration is done through:
- `postcss.config.mjs` - PostCSS plugin setup
- `src/app/globals.css` - CSS imports and theme variables using `@import "tailwindcss"`

**ESLint Flat Config:** Uses `eslint.config.mjs` with the new flat config format, combining `next/core-web-vitals` and `next/typescript` presets.

### Typography System
- **Montserrat** - Headings font (weights: 400, 600, 700, 800)
- **Source Sans 3** - Body font (weights: 400, 600)
- Loaded via `next/font/google` with `display: "swap"`
- CSS variables: `--font-montserrat`, `--font-source-sans`
- Tailwind classes: `font-heading` for Montserrat, `font-body` for Source Sans 3

**Important:** Do NOT use Geist, Inter, Roboto, Arial, Open Sans, or Lato fonts (explicitly avoided per design requirements).

### Color Palette
Custom warm palette defined in `src/app/globals.css`:
```css
--background: #FFFBF5; /* Warm white */
--foreground: #1A1A1A; /* Almost black */
--accent: #E85D04;     /* Burnt orange */
```
Use `text-[#E85D04]` or `bg-[#E85D04]` for accent colors, `shadow-[#E85D04]/20` for colored shadows.

### Component Architecture
The landing page is composed of 7 main components in `src/app/components/`:

1. **Navbar.tsx** - Fixed navigation with scroll-based floating effect
2. **Hero.tsx** - Main hero section with tagline and invoice preview (60/40 asymmetric grid)
3. **InvoicePreview.tsx** - Realistic HTML/CSS invoice mockup
4. **Features.tsx** - 3 feature cards in asymmetric staggered grid
5. **SocialProof.tsx** - Stats and testimonials with overlapping cards
6. **Pricing.tsx** - 2-tier pricing (Gratis/Pro) with highlighted Pro plan
7. **Footer.tsx** - Final CTA and footer links

**Client Components:** Navbar, Features, SocialProof, and Pricing use `"use client"` for scroll animations and interactivity.

### App Router Structure
- **`src/app/layout.tsx`** - Root layout with Montserrat/Source Sans 3 fonts, SEO metadata
- **`src/app/page.tsx`** - Landing page composition with all sections
- **`src/app/globals.css`** - Global styles, Tailwind v4 config, custom animations, noise texture overlay

### Animation System
Custom animations defined in `src/app/globals.css`:

**Staggered Fade-in:**
```css
.animate-fade-in-up - Main animation
.animation-delay-100 through .animation-delay-500 - Stagger delays
```

**Navbar Floating:**
```css
Applied when scrolled in tablets and desktop view
```

**Usage Pattern:**
- Page load: Add `animate-fade-in-up` with staggered delays
- Scroll: Use Intersection Observer in client components to trigger animations
- Hover: Use Tailwind's `hover:` prefixes for transitions

### Design Patterns

**Asymmetric Layouts:**
- Hero: 60/40 grid (text left, invoice right)
- Features: Staggered cards with `transform: translateY()` offsets
- Testimonials: Overlapping cards with different vertical positions
- Pricing: Pro plan scaled up with `transform: scale(1.05)`

**Avoid:**
- Perfectly centered layouts
- Generic symmetric grids
- Basic fade-in animations (use staggered)
- Inter, Roboto, Arial, Open Sans, Lato fonts
- Purple gradients
- Cookie-cutter designs

**Use:**
- Colored shadows with burnt orange (`shadow-[#E85D04]/20`)
- Overlapping elements with z-index
- Tight letter-spacing on headings (`tracking-tight`)
- Smooth easing: `cubic-bezier(0.4, 0, 0.2, 1)`

### Responsive Design
Mobile-first approach with Tailwind breakpoints:
- Base styles: Mobile (default)
- `sm:`: 640px (small phones, landscape)
- `md:`: 768px (tablets)
- `lg:`: 1024px+ (desktop)

## Next.js 16 Specific Notes

- App Router is the default (no Pages Router)
- Use `async/await` in Server Components by default
- Client Components require `"use client"` directive
- Route groups and parallel routes are supported in `src/app/`
- TypeScript path aliases are pre-configured in `tsconfig.json`
- Metadata API used in `layout.tsx` for SEO (title, description)
