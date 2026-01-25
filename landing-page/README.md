# DevOS CLI Landing Page

A modern, responsive landing page for DevOS CLI built with Next.js 16, TypeScript, and Tailwind CSS.

## Features

- 🚀 Next.js 16 with App Router
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Optimized for performance
- 🔒 Security headers configured
- 🌐 Production-ready deployment

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build & Deploy

### Build for production
```bash
npm run build
```

### Deploy to Vercel
```bash
vercel --prod
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── docs/
│   │   └── page.tsx          # Documentation page
│   └── pages/                # Page components
│       ├── unified-page.tsx  # Main landing page
│       └── ...               # Other page variants
├── components/
│   └── ui/                   # UI components
└── lib/
    └── utils.ts              # Utility functions
```

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Framer Motion** - Animations

## Deployment

This project is configured for Vercel deployment with:

- ✅ Automatic builds
- ✅ Static optimization
- ✅ Security headers
- ✅ Proper caching
- ✅ Clean URLs

## License

MIT License
