# Anshu Kumar - Portfolio

A modern, interactive single-page portfolio website built with React, TypeScript, and Vite. Features a light rays WebGL background, smooth scroll navigation, and responsive design.

## Features

✨ **Visual**
- Light rays WebGL background effect using OGL library
- Signature font styling (Caveat) for hero title
- Smooth animations and transitions
- Responsive design (desktop and mobile)

🎯 **Interactive**
- Search-based navigation component
- Vertical social icons sidebar
- Smooth scroll navigation between sections
- Real-time clock display (GMT+5:30)
- Hover effects on interactive elements

📱 **Responsive**
- Mobile-first design
- Adaptive layouts
- Optimized for all screen sizes

## Tech Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript 5
- **Build Tool**: Vite 5
- **WebGL**: OGL
- **Styling**: CSS3
- **Fonts**: Playfair Display, Inter, Caveat

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/anshukr384/portfolio.git
cd portfolio_3

# Install dependencies
npm install

# Start development server
npm run dev
```

The portfolio will open at `http://localhost:5173`

## Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Click "New Project"
4. Select your GitHub repository
5. Vercel will auto-detect Vite settings
6. Deploy!

The portfolio is configured with `vercel.json` for optimal Vercel deployment.

### Other Platforms

The `dist` folder contains the production build and can be deployed to any static hosting:
- GitHub Pages
- Netlify
- AWS S3
- Firebase Hosting

## Project Structure

```
portfolio_3/
├── src/
│   ├── components/
│   │   └── LightRays.tsx          # WebGL light rays component
│   ├── App.tsx                    # Main app component
│   ├── App.css                    # Main styles
│   ├── index.tsx                  # Entry point
│   └── index.css                  # Global styles
├── index-react.html               # HTML template
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Dependencies and scripts
└── vercel.json                    # Vercel configuration
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Check TypeScript errors

## Sections

1. **Hero** - Welcome section with light rays background
2. **About** - Personal introduction and details
3. **Work** - Professional experience
4. **Experiments** - Projects and experiments
5. **Achievements** - Milestones and recognitions
6. **Colophon** - Portfolio build information
7. **Now Playing** - Music player section

## Customization

### Update Personal Information
Edit the content in `src/App.tsx`:
- Hero title
- Social media links
- About section
- Work history
- Projects

### Customize Colors
Update CSS variables in `src/App.css`:
```css
:root {
  --bg: #f8f8f8;
  --text-primary: #1a1a1a;
  --accent: #4f46e5;
  /* ... more variables */
}
```

### Light Rays Settings
Adjust WebGL effect in `src/App.tsx` LightRays props:
```tsx
<LightRays
  raysOrigin="top-center"
  raysColor="#00ffff"
  raysSpeed={1.5}
  /* ... more props */
/>
```

## Performance

- **Optimized Build**: Minified and tree-shaken production bundle
- **Code Splitting**: OGL library split into separate chunk
- **Responsive Images**: CSS-based backgrounds
- **Fast Loading**: Vite's instant HMR during development

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT License - feel free to use this portfolio as a template

## Author

**Anshu Kumar**
- GitHub: [@anshukr384](https://github.com/anshukr384)
- Email: anshukr384@gmail.com

## Support

For issues or suggestions, please create an issue on GitHub.

---

Built with ❤️ using React, TypeScript, and Vite
