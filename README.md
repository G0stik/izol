# Izol systém, s.r.o. Portfolio Website

A modern React TypeScript portfolio website for Izol systém, s.r.o., a thermal insulation company based in Trenčín, Slovakia.

## Features

- ✅ React 18 with TypeScript
- ✅ React Router for multi-page navigation
- ✅ CSS Modules for component styling
- ✅ Responsive design
- ✅ Modern UI with blue and red color scheme
- ✅ Logo placeholder in navigation

## Tech Stack

- **React 18.2.0** - UI library
- **TypeScript 5.2.2** - Type safety
- **Vite 5.0.0** - Build tool
- **React Router DOM 6.20.0** - Routing
- **pnpm** - Package manager (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Install pnpm globally (if not already installed):
```bash
npm install -g pnpm
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Build for production:
```bash
pnpm build
```

5. Preview production build:
```bash
pnpm preview
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   └── *.module.css     # Component styles
├── pages/               # Page components
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Products.tsx
│   ├── Services.tsx
│   ├── Projects.tsx
│   ├── Gallery.tsx
│   ├── Contact.tsx
│   └── *.module.css     # Page styles
├── App.tsx              # Main app component
├── App.css              # App-level styles
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## Pages

- **/** - Home page with hero section
- **/about** - About Us page
- **/products** - Products page
- **/services** - Services page
- **/projects** - Projects showcase
- **/gallery** - Image gallery
- **/contact** - Contact form and information

## Customization

### Adding a Logo

Replace the logo placeholder in `src/components/Navigation.tsx`:

```tsx
<div className={styles.logoPlaceholder}>
  <img src="/logo.png" alt="Izol systém logo" />
</div>
```

### Color Scheme

Update CSS variables in `src/index.css`:

```css
:root {
  --primary-blue: #1e40af;
  --primary-red: #dc2626;
  /* ... other colors */
}
```

## License

© 2024 Izol systém, s.r.o. All rights reserved.

