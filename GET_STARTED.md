# 🚀 Get Started with Your Portfolio

## Quick Setup (5 Minutes)

### 1. Start the Development Server
```bash
cd /home/keshav/portfolio-website
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see your portfolio!

### 2. Immediate Customizations

#### Replace GitHub Username
**File**: `components/GitHubStats.tsx` (Line 44)
```typescript
const githubUsername = 'your-github-username'  // ← Change this
```

#### Update Social Links
**File**: `components/Footer.tsx` (Lines 60-80)
```typescript
// Update these URLs:
href="https://github.com/your-username"
href="https://linkedin.com/in/your-username"
href="mailto:your.email@example.com"
```

#### Add Your Projects
**File**: `components/Projects.tsx` (Starting Line 17)
```typescript
const projects: Project[] = [
  {
    title: 'Your Amazing Project',
    description: 'What it does...',
    tech: ['React', 'Node.js', 'MongoDB'],
    github: 'https://github.com/you/project',
    demo: 'https://your-demo.com',
    status: 'Completed',
  },
  // Add more projects...
]
```

### 3. Optional: Add Your Profile Picture
1. Place image in `public/images/profile.jpg`
2. Update `components/HeroSection.tsx` (Line 80):
```typescript
<img 
  src="/images/profile.jpg" 
  alt="Your Name"
  className="w-full h-full object-cover"
/>
```

### 4. Add Your Resume
Place your resume as: `public/resume.pdf`

## 📁 Project Structure

```
portfolio-website/
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main page combining all sections
├── components/
│   ├── AboutSection.tsx     # About & achievements
│   ├── Footer.tsx           # Footer with social links
│   ├── GitHubStats.tsx      # GitHub statistics
│   ├── HeroSection.tsx      # Landing section
│   ├── Icons.tsx            # Custom SVG icons
│   ├── OpenSource.tsx       # Open source contributions
│   ├── Projects.tsx         # Project showcase
│   └── TechStack.tsx        # Technology grid
├── config/
│   └── site.config.ts       # Centralized configuration
├── public/
│   ├── images/              # Your images here
│   └── resume.pdf           # Your resume
├── README.md                # Project overview
├── SETUP_GUIDE.md           # Detailed setup instructions
├── FEATURES.md              # Complete feature list
└── package.json             # Dependencies
```

## 🎨 Key Features

✨ **GSAP Animations**: Smooth, professional animations throughout
🎯 **Responsive Design**: Perfect on all devices
⚡ **Performance**: Optimized with Next.js 15
🎨 **Custom Icons**: Unique SVG icons for all technologies
📊 **Live GitHub Stats**: Real-time GitHub activity
🔧 **TypeScript**: Full type safety
💅 **TailwindCSS**: Modern, maintainable styling

## 🔧 Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🎯 Customization Priority

1. **GitHub username** - Makes stats work
2. **Social links** - Connect with visitors
3. **Projects** - Showcase your work
4. **Profile image** - Add your photo
5. **Resume** - Add downloadable resume
6. **Colors** - Match your style (optional)

## 📚 Documentation

- **SETUP_GUIDE.md** - Complete customization guide
- **FEATURES.md** - All features and capabilities
- **README.md** - Project overview and deployment

## 🚀 Deploy Your Portfolio

### Vercel (Recommended - 2 minutes)
1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import repository
4. Deploy automatically!

### Netlify
1. Push code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. New site from Git
4. Deploy!

## 🎨 Color Customization

Want different colors? Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    dark: '#0a0e27',      // Background
    darker: '#050811',    // Darker sections
    accent: '#00d9ff',    // ← Change this for different accent!
  },
}
```

**Popular Options**:
- Neon Purple: `#a855f7`
- Hot Pink: `#ec4899`
- Emerald: `#10b981`
- Orange: `#ff6b35`

## 💡 Pro Tips

1. **Test on Mobile**: Always check mobile view
2. **Update Regularly**: Keep projects current
3. **Optimize Images**: Use WebP format
4. **Monitor Performance**: Use Lighthouse
5. **SEO**: Update meta tags in `app/layout.tsx`

## 🆘 Need Help?

### Common Issues

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

**Build errors?**
```bash
rm -rf .next node_modules
npm install
npm run dev
```

**Styling not working?**
- Restart dev server
- Clear browser cache

### Resources
- [Next.js Docs](https://nextjs.org/docs)
- [GSAP Docs](https://greensock.com/docs/)
- [Tailwind Docs](https://tailwindcss.com/docs)

## ✅ Checklist

Before deploying, ensure:
- [ ] GitHub username updated
- [ ] Social links updated
- [ ] Projects added with real data
- [ ] Resume PDF added
- [ ] Profile image added (optional)
- [ ] Meta tags updated
- [ ] Tested on mobile
- [ ] All links work
- [ ] No console errors

## 🌟 What's Included

### 7 Complete Sections
1. **Hero** - Animated introduction
2. **About** - Background & achievements
3. **Tech Stack** - Animated technology grid
4. **Projects** - Interactive project cards
5. **Open Source** - Contribution highlights
6. **GitHub Stats** - Live statistics
7. **Footer** - Contact & social links

### Animation Highlights
- Staggered entrances
- Scroll-triggered reveals
- 3D hover effects
- Smooth transitions
- Micro-interactions

### Custom Components
- 15+ custom SVG icons
- Reusable UI components
- Type-safe TypeScript
- Modular architecture

---

## 🎉 You're Ready!

Your portfolio is production-ready and waiting for your personal touch.
Start by updating the GitHub username and social links, then make it yours!

**Questions?** Check SETUP_GUIDE.md for detailed instructions.

**Happy coding!** 🚀
