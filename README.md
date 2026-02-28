# Keshav Sharma - Portfolio Website

🚀 Modern portfolio showcasing backend engineering expertise in distributed microservices and event-driven architectures.

## 💻 Tech Stack

- **Frontend**: React 18, Vite, Framer Motion
- **Styling**: CSS3 with custom design system
- **Fonts**: Poppins (headings), Inter (body text)
- **Icons**: Lucide React
- **Routing**: React Router

## ✨ Features

- 🎨 Clean, modern design with smooth animations
- 📱 Fully responsive across all devices
- ⚡ Lightning-fast performance with Vite
- 🎯 SEO optimized
- 🔒 Admin panel for project management
- 📊 Real-time project showcases with architecture diagrams

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🖼️ Adding Your Profile Photo

### Option 1: Replace Image Files

1. Add your profile photos to the `/public` folder:
   - `profile-main.jpg` - Your professional headshot (for About section)
   - `hero-image.png` - Optional hero image

2. Update the image references:

**In `src/components/About.jsx`:**
```jsx
<img 
    src="/profile-main.jpg"  // Change this to your image
    alt="Keshav Sharma" 
    className="about-image"
/>
```

### Option 2: Use the Existing Illustrations

The current design uses illustration images which can be kept or replaced:
- `/public/customization-right.webp` - Hero section illustration
- `/public/customization-left.webp` - About section illustration

## ⚙️ Customization Guide

### Update Personal Information

All your details are already configured! But here's where to make changes:

**Contact Information** (`src/components/Contact.jsx`):
- Email: `thesharmakeshav@gmail.com`
- Phone: `+91 7830241468`
- Location: `Bareilly, India`

**Social Links** (Update in multiple files):
- GitHub: `https://github.com/thesharmakeshav`
- LinkedIn: `https://www.linkedin.com/in/keshav-sharma-profile`

### Update Resume Link

In `src/components/Hero.jsx`, update the resume link:
```jsx
<a 
    href="https://drive.google.com/file/d/YOUR_RESUME_ID/view" 
    target="_blank"
>
    VIEW RESUME
</a>
```

### Add/Edit Projects

Projects are managed in `src/context/ProjectContext.jsx`. The default projects include:
- VerifyDev
- SocialHub
- Kurser

You can also use the admin panel at `/admin` to add/edit projects dynamically.

### Modify Colors & Fonts

Design tokens are in `src/index.css`:

```css
:root {
  --primary: #2563EB;           /* Primary blue */
  --highlight: #FACC15;          /* Yellow highlight */
  --font-heading: 'Poppins';     /* Headings */
  --font-body: 'Inter';          /* Body text */
}
```

## 📋 Sections

1. **Hero** - Introduction with name, role, and location
2. **About** - Professional summary and highlights
3. **Skills** - Technical stack categorized by domain
4. **Experience** - Work history with education
5. **Projects** - Featured projects with architecture diagrams
6. **GitHub** - GitHub activity showcase
7. **Contact** - Contact form and information

## 🔐 Admin Panel

Access the admin dashboard at `/admin` to:
- Add new projects
- Edit existing projects
- Delete projects
- Upload Excalidraw architecture diagrams

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Deploy with one click

### Deploy to Netlify

1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify

### Environment Variables

No environment variables required for basic setup!

## 📝 License

MIT License - feel free to use this template for your own portfolio!

## 🛠️ Built With

- React 18
- Vite
- Framer Motion
- Lucide Icons
- React Router

---

**Made with ❤️ by Keshav Sharma**

For questions or suggestions, reach out at thesharmakeshav@gmail.com
