# VERTUS Gaming Center — Website

**Elite Gaming Center Landing Page | Nukus, Uzbekistan**

---

## Project Structure

```
vertus/
├── index.html          ← Main HTML (single page)
├── style.scss          ← SCSS source (for developers)
├── css/
│   └── style.css       ← Compiled CSS (production-ready, no build needed)
├── js/
│   └── script.js       ← All JavaScript
├── images/             ← Place your images here (see below)
└── README.md
```

---

## How to Run Locally

### Option 1: Direct (No Build Needed)
Just open `index.html` in any modern browser. The CSS is pre-compiled — no build tools required.

### Option 2: Live Server (Recommended for Development)
1. Install VS Code + "Live Server" extension
2. Right-click `index.html` → "Open with Live Server"

### Option 3: Python HTTP Server
```bash
cd vertus
python3 -m http.server 8080
# Open: http://localhost:8080
```

### Option 4: Node.js
```bash
npx serve .
```

---

## SCSS Compilation (Optional)

If you want to edit the SCSS and recompile:

```bash
# Install Sass globally
npm install -g sass

# Watch and compile
sass style.scss css/style.css --watch --style=compressed
```

---

## Image Placement

Place your images in the `/images/` folder and reference them in `css/style.css`:

| CSS Class | Description | Recommended Size |
|-----------|-------------|------------------|
| `.hero__warrior-placeholder` | Warrior/mascot hero image | 420×520px |
| `.services__media-img--pc` | PC Zone photo | 800×600px |
| `.services__media-img--ps5` | PS5 Arena photo | 800×600px |
| `.services__media-img--vip` | VIP Room photo | 800×600px |
| `.services__media-img--bootcamp` | Bootcamp photo | 800×600px |
| `.gallery__img--1` through `--6` | Gallery photos | 600×500px each |

### To apply images, add `background-image` in CSS:

```css
/* Example: Hero warrior */
.hero__warrior-placeholder {
  background-image: url('../images/warrior.png');
  background-size: cover;
  background-position: center;
}

/* Example: Gallery */
.gallery__img--1 {
  background-image: url('../images/gallery-1.jpg');
  background-size: cover;
  background-position: center;
}

/* Example: Services */
.services__media-img--pc {
  background-image: url('../images/pc-zone.jpg');
  background-size: cover;
  background-position: center;
}
```

---

## Color Palette

| Variable | Value | Use |
|----------|-------|-----|
| `--gold` | `#c9a84c` | Primary accent |
| `--gold-light` | `#e8c97a` | Highlights |
| `--gold-dark` | `#8a6a1f` | Shadows/depth |
| `--black` | `#0a0a0a` | Main background |
| `--dark` | `#111111` | Secondary bg |
| `--text` | `#cccccc` | Body text |

---

## Fonts Used

All loaded from Google Fonts (no install needed):

- **Orbitron** — Headlines, logo, buttons
- **Rajdhani** — Body text, descriptions
- **Share Tech Mono** — Labels, codes, details

---

## Features

- ✅ Animated loading screen
- ✅ Custom gold cursor with trail
- ✅ Animated particle canvas background
- ✅ Sticky navbar with scroll behavior
- ✅ Mobile hamburger menu
- ✅ Hero with animated statistics counter
- ✅ Scroll-reveal animations (Intersection Observer)
- ✅ Services tab switcher
- ✅ Testimonials auto-slider
- ✅ Pricing table
- ✅ Contact form with validation feedback
- ✅ Smooth scrolling
- ✅ Button ripple effects
- ✅ Parallax effects
- ✅ Fully responsive (mobile/tablet/laptop/desktop)

---

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
