# Portfolio Setup Guide

## 🎯 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## ✏️ Customization Checklist

### 1. Personal Information

#### Update GitHub Username
File: `components/GitHubStats.tsx`
```typescript
// Line 44: Replace 'yourusername' with your GitHub username
const githubUsername = 'your-actual-username'
```

#### Update Social Links
File: `components/Footer.tsx`
```typescript
// Update these URLs (around lines 60-80):
- GitHub: https://github.com/your-username
- LinkedIn: https://linkedin.com/in/your-username
- Email: your.email@example.com
```

#### Update Projects
File: `components/Projects.tsx`
```typescript
// Update the projects array (starting around line 17)
// Add your actual project details:
const projects: Project[] = [
  {
    title: 'Your Project Name',
    description: 'Your project description',
    tech: ['React', 'Node.js', ...],
    github: 'your-github-url',
    demo: 'your-demo-url',
    status: 'In Progress' or 'Completed'
  },
  // ... more projects
]
```

### 2. Profile Image

**Option A: Use your own image**
1. Add your image to `public/images/profile.jpg`
2. Update `components/HeroSection.tsx` (around line 80):
```typescript
<img 
  src="/images/profile.jpg" 
  alt="Keshav Sharma"
  className="w-full h-full object-cover"
/>
```

**Option B: Keep the gradient placeholder**
- Current design uses initials "KS" with gradient
- Change initials in line 82 of `components/HeroSection.tsx`

### 3. Resume

1. Place your resume PDF in: `public/resume.pdf`
2. Or update the link in `components/HeroSection.tsx` (line 137)

### 4. Color Scheme

File: `tailwind.config.js`

```javascript
colors: {
  primary: {
    dark: '#0a0e27',      // Main background
    darker: '#050811',    // Darker sections
    accent: '#00d9ff',    // Accent color (change this!)
  },
}
```

Popular accent color alternatives:
- Electric Blue: `#00d9ff` (current)
- Neon Purple: `#a855f7`
- Vibrant Orange: `#ff6b35`
- Emerald Green: `#10b981`
- Hot Pink: `#ec4899`

### 5. Tech Stack Icons

File: `components/TechStack.tsx`

Add or remove technologies from the `techStack` array (line 28):
```typescript
const techStack: TechItem[] = [
  { name: 'React', Icon: ReactIcon, category: 'Frontend' },
  // Add more...
]
```

To add new icons, create them in `components/Icons.tsx` following the existing pattern.

### 6. About Section

File: `components/AboutSection.tsx`

Update:
- Background info (line 49-55)
- Current goals (line 64-70)
- Achievement details (line 92-100)

### 7. Open Source Stats

File: `components/OpenSource.tsx`

Update the contribution numbers (lines 81-95):
```typescript
<div className="text-3xl font-black gradient-text mb-1">50+</div>
```

## 🎨 Advanced Customization

### Modify Animations

GSAP animations are in each component's `useEffect` hook.

Example from `HeroSection.tsx`:
```typescript
gsap.to(element, {
  opacity: 1,
  y: 0,
  duration: 0.8,  // Animation duration
  ease: 'power3.out',  // Easing function
})
```

Common easing functions:
- `power1.out`, `power2.out`, `power3.out`
- `back.out(1.7)` - bouncy effect
- `elastic.out(1, 0.5)` - elastic effect

### Add New Sections

1. Create new component in `components/YourSection.tsx`
2. Import and add to `app/page.tsx`:
```typescript
import YourSection from '@/components/YourSection'

export default function Home() {
  return (
    <main>
      {/* ... other sections ... */}
      <YourSection />
    </main>
  )
}
```

### Modify Font

Update `app/globals.css` (line 6):
```css
@import url('https://fonts.googleapis.com/css2?family=Your-Font:wght@300;400;500;600;700&display=swap');
```

Then update the font family in the same file (line 24).

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy! (automatic configuration)

### Deploy to Netlify

1. Push your code to GitHub
2. Visit [netlify.com](https://netlify.com)
3. Add new site from Git
4. Build command: `npm run build`
5. Publish directory: `.next`

### Environment Variables

No environment variables needed for basic setup. If you add API features:

Create `.env.local`:
```
NEXT_PUBLIC_API_URL=your-api-url
```

## 📱 Testing

### Check Responsiveness
- Chrome DevTools (F12) > Device Toolbar
- Test on actual mobile devices
- Use [Responsively App](https://responsively.app/)

### Performance Testing
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

## 🐛 Troubleshooting

### Build Errors

**Error: Cannot find module 'gsap/ScrollTrigger'**
```bash
npm install gsap
```

**Error: Module not found: Can't resolve '@/components/...'**
- Check `tsconfig.json` paths configuration
- Ensure files are in correct directories

### Development Server Issues

**Port 3000 already in use**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

### Styling Issues

**Tailwind classes not working**
```bash
# Restart dev server
npm run dev
```

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [GSAP Documentation](https://greensock.com/docs/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 💡 Tips

1. **Test animations on different devices** - some animations may need adjustment for mobile
2. **Optimize images** - use WebP format for better performance
3. **Keep it simple** - don't overcrowd with too many animations
4. **Regular updates** - keep your projects and stats updated
5. **SEO** - Update meta tags in `app/layout.tsx` for better discoverability

## 🤝 Need Help?

- Check the README.md
- Review component code comments
- Test in browser console for errors
- Verify all imports are correct

---

Happy coding! 🚀
