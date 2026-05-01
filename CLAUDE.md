# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Critical Notice: Next.js 16 Breaking Changes

**This is NOT the Next.js you know.** This project uses Next.js 16.2.4, which has significant breaking changes from previous versions. APIs, conventions, and file structures may differ from training data. Before writing any code, read the relevant guide in `node_modules/next/dist/docs/` and pay attention to deprecation notices.

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
```
src/
├── app/
│   ├── components/           # Landing page UI components
│   │   ├── Navbar.tsx        # Fixed nav with scroll effect
│   │   ├── Hero.tsx          # Hero section with invoice preview
│   │   ├── InvoicePreview.tsx # Invoice mockup
│   │   ├── Features.tsx      # Feature cards (staggered)
│   │   ├── SocialProof.tsx   # Stats & testimonials
│   │   ├── Pricing.tsx       # Pricing tiers
│   │   └── Footer.tsx        # Footer with CTAs
│   ├── dashboard/
│   │   ├── page.tsx          # Dashboard with invoice list
│   │   ├── LogoutButton.tsx  # Logout component
│   │   └── invoices/
│   │       ├── new/
│   │       │   ├── page.tsx  # Create invoice form
│   │       │   └── actions.ts # Server action: create invoice
│   │       └── [id]/
│   │           ├── page.tsx  # Invoice detail view
│   │           ├── actions.ts # Server actions: get, toggle status, delete
│   │           └── InvoiceActions.tsx # Client component: buttons
│   ├── login/
│   │   └── page.tsx          # Magic link login form
│   ├── auth/callback/
│   │   └── route.ts          # OAuth callback handler
│   ├── layout.tsx            # Root layout with fonts
│   ├── page.tsx              # Landing page
│   └── globals.css           # Global styles & Tailwind v4
lib/
├── supabase/
│   ├── client.ts            # Browser Supabase client
│   ├── server.ts            # Server Supabase client
│   └── middleware.ts        # Session update helper
└── invoice.ts              # Invoice number generator (INV-001, INV-002...)
middleware.ts               # Route protection & auth redirects
```

### Tech Stack
- **Next.js 16.2.4** - React framework with App Router
- **React 19.2.5** - Latest React with new features
- **TypeScript 5** - Strict mode enabled
- **Tailwind CSS v4** - Latest version with CSS-based configuration
- **Supabase** - Authentication, database, and row-level security
- **@supabase/ssr** - Server-side rendering support for Supabase

### Key Configuration Patterns

**Import Alias:** `@/*` maps to `./src/*` for clean imports:
```typescript
import Component from "@/components/Component" // maps to src/components/Component
```

**Tailwind CSS v4:** This project uses Tailwind v4 which does NOT use `tailwind.config.ts`. Configuration is done through:
- `postcss.config.mjs` - PostCSS plugin setup
- `src/app/globals.css` - CSS imports and theme variables using `@import "tailwindcss"`

**ESLint Flat Config:** Uses `eslint.config.mjs` with the new flat config format.

## Authentication & Authorization

### Auth Flow

**Login:**
1. User enters email at `/login` → Magic link sent to email
2. User clicks link → Redirect to `/auth/callback`
3. Callback exchanges code for session → Redirect to `/dashboard`

**Route Protection ([`middleware.ts`](middleware.ts)):**
```typescript
// Protected: /dashboard/* (requires auth)
if (!user && pathname.startsWith('/dashboard')) {
  return NextResponse.redirect('/login')
}

// Redirect authenticated users from /login
if (user && pathname === '/login') {
  return NextResponse.redirect('/dashboard')
}
```

**Supabase Clients:**
- [`lib/supabase/client.ts`](lib/supabase/client.ts) → `createBrowserClient` for client components
- [`lib/supabase/server.ts`](lib/supabase/server.ts) → `createServerClient` for server components

**Data Access Control:**
- All database access protected by Row Level Security (RLS)
- Users can only view/edit their own invoices
- Policies enforced at database level via Supabase
- Migration SQL in `supabase/migrations/001_create_invoices.sql`

## Application Features

### 1. Landing Page (`/`)
- **Hero Section:** Tagline + invoice preview (60/40 asymmetric grid)
- **Features:** 3 cards with staggered layout
- **Social Proof:** Stats + testimonials with overlapping cards
- **Pricing:** Gratis/Pro tiers with highlighted Pro plan
- **Footer:** Links + final CTA

### 2. Authentication (`/login`)
- Magic link authentication (no password)
- Email-based login flow
- Auto-redirect to dashboard after login
- Protected by middleware

### 3. Dashboard (`/dashboard`)
**Display:**
- Table with columns: Tanggal Buat, Nomor Invoice, Client, Total, Status, Jatuh Tempo
- Status badges: "Lunas" (green) / "Belum Dibayar" (yellow)
- Empty state with CTA when no invoices
- Click any row → View invoice detail

**Features:**
- Fetch user's invoices from Supabase
- Format numbers as Rupiah
- Format dates in Indonesian
- Link to invoice detail page

### 4. Create Invoice (`/dashboard/invoices/new`)

**Form Fields:**
- Invoice Number (auto-generated, read-only)
- Client Name (required)
- Client Email (optional)
- Due Date (optional, date picker)
- Notes (optional, textarea)
- Items (dynamic add/remove):
  - Item Name (required, text input)
  - Quantity (number, min 1)
  - Price (Rupiah format, e.g., "Rp 500.000")
  - Subtotal (auto-calculated)
- Total (auto-calculated from all items)

**Validation:**
- Client name required
- All items must have names filled
- Minimum 1 item
- Quantity ≥ 1, Price ≥ 0
- Server-side double-check

**Server Actions:**
- Auto-generate invoice number (INV-001, INV-002, etc.)
- Per-user sequence (each user starts from INV-001)
- Calculate total from items
- Insert to database with user_id
- Revalidate dashboard cache
- Redirect to dashboard

### 5. Invoice Detail (`/dashboard/invoices/[id]`)

**Display:**
- Invoice header: Number, status badge, date created
- Client info: Name, email, due date (if exists)
- Items table: Name, quantity, unit price, subtotal
- Total (large, burnt orange color)
- Notes section (if exists)

**Actions (Client Component):**
- **Toggle Status:** Button changes color based on status
  - If unpaid: Green button "Tandai Lunas"
  - If paid: Yellow button "Tandai Belum Bayar"
  - Updates database via server action
- **Share Link:** Copy invoice URL to clipboard
- **Delete Invoice:** 2-step confirmation before delete
- **Back to Dashboard:** Navigate back to list

**Protection:**
- Server-side user_id check
- RLS enforcement
- Redirect to dashboard if not owner

## Typography System

- **Montserrat** - Headings font (weights: 400, 600, 700, 800)
- **Source Sans 3** - Body font (weights: 400, 600)
- Loaded via `next/font/google` with `display: "swap"`
- CSS variables: `--font-montserrat`, `--font-source-sans`
- Tailwind classes: `font-heading` for Montserrat, `font-body` for Source Sans 3

**Important:** Do NOT use Geist, Inter, Roboto, Arial, Open Sans, or Lato fonts.

## Color Palette

Custom warm palette defined in `src/app/globals.css`:
```css
--background: #FFFBF5; /* Warm white */
--foreground: #1A1A1A; /* Almost black */
--accent: #E85D04;     /* Burnt orange */
```

**Usage:**
- Primary: `text-[#E85D04]` or `bg-[#E85D04]`
- Shadows: `shadow-[#E85D04]/20`
- Status paid: Green (#16a34a)
- Status unpaid: Yellow (#ca8a04)
- Actions: Blue (share), Red (delete)

## Utility Functions

### formatRupiah
```typescript
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}
// 500000 → "Rp 500.000"
```

### formatDate
```typescript
const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}
// "2024-05-01" → "1 Mei 2024"
```

### generateInvoiceNumber
```typescript
// In lib/invoice.ts
const { invoiceNumber } = await generateInvoiceNumber(userId, supabase)
// Returns: "INV-001", "INV-002", etc. (per-user sequence)
```

## Server Actions Pattern

All database mutations use Server Actions:

```typescript
// actions.ts
'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createInvoice(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Validate input...

  // Insert to database...

  revalidatePath('/dashboard')
  redirect('/dashboard')
}
```

**Best Practices:**
- Always check user authentication
- Validate on both client and server
- Use `revalidatePath` for cache updates
- Return `{ error: string }` for errors
- Use `redirect` for success cases

## Design Patterns

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

## Responsive Design

Mobile-first approach with Tailwind breakpoints:
- Base styles: Mobile (default)
- `sm:`: 640px (small phones, landscape)
- `md:`: 768px (tablets)
- `lg:`: 1024px+ (desktop)

## Next.js 16 Specific Notes

- App Router is the default (no Pages Router)
- Use `async/await` in Server Components by default
- Client Components require `"use client"` directive
- Route groups and parallel routes supported in `src/app/`
- TypeScript path aliases pre-configured in `tsconfig.json`
- Metadata API in `layout.tsx` for SEO
- Server Actions for mutations (no API routes needed)

## Development Workflow

### Creating an Invoice
1. Navigate to `/dashboard/invoices/new`
2. Invoice number auto-generated (INV-XXX format)
3. Fill form: client name, items, notes, due date
4. Add/remove items as needed
5. Submit → Saves to database → Redirects to dashboard

### Viewing Invoice Details
1. Click any invoice row in dashboard
2. View all details (client, items, total, notes)
3. Actions available: toggle status, share link, delete

### Testing Authentication
1. Logout → Visit `/dashboard` → Should redirect to `/login`
2. Login → Visit `/login` → Should redirect to `/dashboard`
3. Middleware enforces protection on all `/dashboard/*` routes

### Database Setup (One-time)
1. Open Supabase Dashboard → SQL Editor
2. Run migration: `supabase/migrations/001_create_invoices.sql`
3. Creates tables, indexes, and RLS policies
4. Required before app can create/store invoices

## Common Issues

### "Redirect to dashboard when viewing invoice detail"
**Cause:** Migration not run or RLS policies not set
**Solution:** Run `supabase/migrations/001_create_invoices.sql` in Supabase SQL Editor

### Invoice number not generating
**Cause:** Called from client component without user context
**Solution:** Use server-side `generateInvoiceNumber()` in server action

### Null date errors
**Solution:** Always check for null before formatting:
```typescript
const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  // ... format logic
}
```

### Revalidation not working
**Solution:** Use full path in `revalidatePath()`:
```typescript
revalidatePath('/dashboard')  // ✅ Correct
revalidatePath('dashboard')   // ❌ Wrong
```
