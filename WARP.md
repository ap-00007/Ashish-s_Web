# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview
This is Ashish Panda's personal portfolio website built with Next.js 13, React 18, and TypeScript. It features a modern, clean design with advanced animations using Framer Motion and a comprehensive UI component library built on Radix UI and shadcn/ui.

## Development Commands

### Package Manager
This project uses **pnpm** as the package manager (evidenced by `pnpm-lock.yaml`).

### Core Commands
- **Development server**: `pnpm dev` (starts Next.js dev server)
- **Production build**: `pnpm build` (builds for production)
- **Start production**: `pnpm start` (serves production build)
- **Linting**: `pnpm lint` (runs ESLint with Next.js config)

### Testing
This project does not currently have test scripts configured in package.json.

## Architecture & Structure

### Framework & Technology Stack
- **Framework**: Next.js 13 with App Router
- **Language**: TypeScript with strict configuration
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for advanced interactions
- **UI Components**: Radix UI primitives with shadcn/ui styling
- **Package Manager**: pnpm

### Key Architectural Patterns

#### Component Architecture
- **Sections-based layout**: Main page composed of discrete sections (`hero-section`, `about-section`, `technologies-section`, `projects-section`, `contact-section`, `call-to-action-section`)
- **UI component library**: Comprehensive set of reusable components in `/components/ui/`
- **Custom animations**: Specialized animation components like `LetterGlitch`, `Aurora`, `GridBackground`

#### Styling System
- **CSS Variables**: Comprehensive design system with HSL color values
- **Dark/Light mode**: Automatic theme switching via CSS media queries
- **Custom scrollbar**: Styled across light and dark themes
- **Glass effects**: Backdrop blur effects for navigation elements

#### File Organization
```
/app                    # Next.js App Router pages
  /globals.css         # Global styles and CSS variables
  /layout.tsx          # Root layout with metadata
  /page.tsx            # Main page composition
/components
  /sections/           # Page section components
  /ui/                # Reusable UI components
  /magicui/           # Advanced UI effects
  /layout/            # Layout-specific components
/lib
  /utils.ts           # Utility functions (cn helper)
/hooks                 # Custom React hooks
/public               # Static assets
```

### Design System
- **Colors**: Monochrome palette with Apple-inspired blue accent (`214 91% 50%`)
- **Typography**: Inter font with careful spacing and line heights
- **Border radius**: Consistent `0.75rem` for Apple-like feel
- **Animations**: Custom keyframes for marquee and accordion effects

### Component Patterns

#### Path Aliases
- `@/components` → `./components`
- `@/lib` → `./lib`
- `@/hooks` → `./hooks`

#### Animation Components
- **LetterGlitch**: Character-based text animation effects
- **Aurora**: WebGL-based background gradients
- **GridBackground**: Animated grid overlay
- **Marquee**: Infinite scrolling animations

#### Key Configuration Files
- **shadcn/ui**: Configured in `components.json` with custom paths
- **Tailwind**: Extended theme in `tailwind.config.ts` with CSS variables
- **TypeScript**: Strict mode with Next.js plugin
- **ESLint**: Next.js recommended config with build bypassing

### Development Notes
- ESLint errors are ignored during builds (`ignoreDuringBuilds: true`)
- Images are unoptimized for static export compatibility
- Using React 18 concurrent features
- Framer Motion for page transitions and micro-interactions

### Component Import Patterns
When working with this codebase:
- Use the established path aliases (`@/components`, `@/lib`)
- Follow the section-based component organization
- Leverage the existing UI component library before creating new ones
- Maintain the monochrome + accent color scheme
- Use Framer Motion for any new animations to maintain consistency

### Static Assets
- Profile images stored in `/public/`
- All images configured for static export (unoptimized)
