# NovaRegis Website

A modern, bold tech-forward website for NovaRegis - AI and Software Service Agency. Built with vanilla HTML, CSS, and JavaScript, optimized for GitHub Pages hosting.

## Features

- **Modern Design**: Bold tech-forward aesthetic with vibrant gradients and smooth animations
- **Fully Responsive**: Mobile-first design that works seamlessly on all devices
- **Performance Optimized**: Lightweight vanilla JavaScript, no heavy frameworks
- **Accessible**: Semantic HTML5 with ARIA labels and keyboard navigation support
- **SEO Friendly**: Proper meta tags and semantic structure
- **Smooth Animations**: Scroll-triggered animations and interactive elements

## Sections

1. **Hero Section**: Eye-catching introduction with animated gradient background
2. **Services**: Showcase of AI and software services offered
3. **About**: Company information with animated statistics
4. **Portfolio**: Project showcase with hover effects
5. **Team**: Team member profiles
6. **Contact**: Contact form with validation and company information

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/yourusername/fh666z.github.io.git
cd fh666z.github.io
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### GitHub Pages Deployment

This repository is already set up for GitHub Pages. Follow these steps:

1. **Push to GitHub**: Ensure your code is pushed to the `main` branch (or `master` branch)

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose **main** (or **master**) branch and **/ (root)** folder
   - Click **Save**

3. **Access Your Site**: 
   - Your site will be available at: `https://yourusername.github.io/fh666z.github.io`
   - Or if the repository name matches your username: `https://yourusername.github.io`

4. **Custom Domain** (Optional):
   - Add a `CNAME` file in the root directory with your domain name
   - Configure DNS settings as per GitHub Pages documentation

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles and animations
├── js/
│   └── main.js         # JavaScript functionality
└── README.md           # This file
```

## Customization

### Colors

Edit CSS variables in `css/style.css`:

```css
:root {
    --primary-gradient-start: #6366f1;
    --primary-gradient-end: #8b5cf6;
    --accent-cyan: #06b6d4;
    --accent-teal: #10b981;
    /* ... more variables */
}
```

### Content

- **Company Information**: Update text content in `index.html`
- **Team Members**: Replace placeholder team member information
- **Portfolio Projects**: Add your actual project details and images
- **Contact Information**: Update email, phone, and location in the contact section
- **Statistics**: Modify the numbers in the About section stats

### Contact Form

The contact form currently uses client-side validation. To enable form submission:

1. Set up a backend service (e.g., Formspree, Netlify Forms, or custom API)
2. Update the form action in `index.html` or modify the fetch call in `js/main.js`

Example with Formspree:
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- No external dependencies (except Google Fonts)
- Optimized CSS with efficient selectors
- Lazy loading support for images
- Minimal JavaScript footprint
- Fast page load times

## License

This project is open source and available for use.

## Support

For questions or support, please contact:
- Email: contact@novaregis.com
- Website: [Your website URL]

---

Built with ❤️ by NovaRegis
