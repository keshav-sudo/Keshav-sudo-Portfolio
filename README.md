# High-Quality Portfolio Website

A modern, visually stunning portfolio website built with Next.js, TailwindCSS, and GSAP animations.

## 🚀 Features

- **Premium UI Design**: Clean, modern interface with glass-morphism effects
- **GSAP Animations**: Smooth, professional animations throughout
- **Responsive Design**: Perfect on all devices
- **Custom SVG Icons**: Unique, minimalist line-art icons
- **Performance Optimized**: Fast loading and smooth interactions
- **TypeScript**: Type-safe codebase

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: TailwindCSS
- **Animations**: GSAP (GreenSock)
- **Language**: TypeScript
- **Icons**: Custom SVG components

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🎨 Customization

### Update Personal Information

1. **GitHub Username**: Replace `yourusername` in `components/GitHubStats.tsx`
2. **Social Links**: Update links in `components/Footer.tsx`
3. **Projects**: Edit project data in `components/Projects.tsx`
4. **Profile Image**: Add your image to `public/images/` or update the placeholder in `components/HeroSection.tsx`

### Color Scheme

Modify the color palette in `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#0a0e27',      // Background dark
    darker: '#050811',    // Background darker
    accent: '#00d9ff',    // Accent color (teal)
  },
}
```

### Add Resume

Place your resume PDF as `public/resume.pdf` for the download button to work.

## 🎯 Key Sections

1. **Hero Section**: Animated introduction with profile and CTAs
2. **About Me**: Personal background and achievements
3. **Tech Stack**: Animated grid of technologies with hover effects
4. **Projects**: Showcase of featured projects with 3D hover effects
5. **Open Source**: Contribution highlights
6. **GitHub Stats**: Live GitHub statistics and activity
7. **Footer**: Contact information and social links

## 🌟 Animation Highlights

- **Scroll-triggered reveals**: Each section animates as it enters viewport
- **Staggered animations**: Elements appear in sequence
- **Hover interactions**: GSAP-powered micro-interactions
- **3D card effects**: Parallax hover on project cards
- **Smooth transitions**: All state changes are animated

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
```

## 📄 License

MIT License - feel free to use this for your own portfolio!

## 👨‍💻 Author

**Keshav Sharma**
- Full-Stack Developer
- Backend-first MERN+PostgreSQL Specialist
- DevOps Enthusiast

---

Built with ❤️ using Next.js, TailwindCSS & GSAP
