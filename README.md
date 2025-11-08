# Ethereal - Premium Minimal Shopify Theme

**Version:** 1.0.0
**Shopify Compatibility:** Online Store 2.0
**License:** MIT

A premium minimal Shopify theme featuring clean design, generous white space, and contemporary typography. Built for performance and accessibility.

---

## 🎨 Design Philosophy

Ethereal embodies premium minimalism with:

- **Generous white space** for breathing room and visual clarity
- **Contemporary typography** using system fonts for optimal performance
- **Terracotta accent palette** (#C7705C) differentiated from standard themes
- **CSS-only micro-interactions** for subtle hover effects and animations
- **4:5 aspect ratio product cards** for elegant presentation
- **Split-layout hero** as the default (image left, content right)

---

## 📦 Package Contents

```
ethereal-theme/
├── layout/
│   └── theme.liquid              # Main layout file
├── templates/
│   ├── index.json                # Homepage template
│   ├── product.json              # Product page template
│   └── collection.json           # Collection page template
├── sections/
│   ├── hero.liquid               # Hero section (split/fullbleed)
│   ├── product-grid.liquid       # Product grid with filters
│   ├── header.liquid             # Sticky header with navigation
│   ├── footer.liquid             # Footer with newsletter
│   └── social-proof.liquid       # Unique social proof section
├── snippets/
│   └── product-card.liquid       # Product card with hover effects
├── assets/
│   ├── styles.css                # Complete theme styles
│   └── theme.js                  # Minimal JavaScript (progressive enhancement)
├── config/
│   ├── settings_schema.json     # Theme settings
│   └── settings_data.json       # Default settings
├── locales/
│   └── en.default.json          # English translations
├── README.md                     # This file
├── CHANGELOG.md                  # Version history
├── QC_REPORT.md                  # Quality control checklist
└── LICENSE                       # MIT License
```

---

## 🚀 Installation

### Method 1: Upload as ZIP (Recommended for Testing)

1. **Compress theme files:**
   ```bash
   zip -r ethereal-theme.zip layout templates sections snippets assets config locales
   ```

2. **Upload to Shopify:**
   - Go to your Shopify Admin
   - Navigate to **Online Store** > **Themes**
   - Click **Add theme** > **Upload ZIP file**
   - Select `ethereal-theme.zip`
   - Wait for upload to complete

3. **Activate theme:**
   - Click **Actions** > **Publish**

### Method 2: Shopify CLI (For Development)

1. **Install Shopify CLI:**
   ```bash
   npm install -g @shopify/cli @shopify/theme
   ```

2. **Navigate to theme directory:**
   ```bash
   cd ethereal-theme
   ```

3. **Connect to your store:**
   ```bash
   shopify theme dev
   ```

4. **Push to store:**
   ```bash
   shopify theme push
   ```

---

## ⚙️ Configuration

### Theme Settings

Access theme settings via **Online Store** > **Themes** > **Customize**:

#### Colors
- **Background Color:** Default `#FAFBFB`
- **Text Color:** Default `#111827`
- **Accent Color:** Default `#C7705C` (Terracotta)
- **Border Color:** Default `#E5E7EB`

#### Typography
- Uses system fonts by default (no external fonts loaded)
- Adjustable base font size: 14px / 16px / 18px

#### Layout
- Container width: 1200px - 1600px (default: 1280px)
- Spacing: Compact / Normal / Spacious

#### Header
- Logo upload
- Logo width: 80px - 250px (default: 150px)
- Sticky header toggle

#### Product Cards
- Show/hide vendor
- Product badges (Sale, New)
- Quick view modal
- Image hover effect

---

## 📄 Available Sections

### Hero Section
**File:** `sections/hero.liquid`

**Layouts:**
- **Split:** Image left, content right (default)
- **Full-bleed:** Centered content over image

**Settings:**
- Background image
- Heading & subheading
- Primary & secondary CTAs
- USP bullets (split layout only)
- Text alignment

**Usage:** Add to homepage via theme editor

---

### Product Grid Section
**File:** `sections/product-grid.liquid`

**Features:**
- Responsive columns (2/3/4)
- Filter sidebar (desktop) / drawer (mobile)
- Sorting options
- Quick view
- Pagination

**Settings:**
- Collection selection
- Products to show
- Column counts per breakpoint
- Enable/disable filters & sorting

**Usage:** Add to collection pages or homepage

---

### Social Proof Section
**File:** `sections/social-proof.liquid`

**Unique Features:**
- **Mini Reviews:** Star rating + testimonials
- **Mini Gallery:** Customer photos (4 images)
- **Best Seller Badge:** Dynamic stats

**Settings:**
- Enable/disable each block
- Review count & testimonials
- Gallery images & hashtag
- Best seller stats

**Usage:** Add to homepage for credibility

---

### Header Section
**File:** `sections/header.liquid`

**Features:**
- Sticky on scroll
- Logo (image or text)
- Desktop mega-menu
- Mobile drawer menu
- Search drawer
- Cart icon with count

**Customization:** Theme settings or section settings

---

### Footer Section
**File:** `sections/footer.liquid`

**Features:**
- Newsletter signup (double opt-in note)
- 3 menu columns
- Social media icons
- Legal links
- Payment icons
- Copyright

**Customization:** Section settings in theme editor

---

## 🎨 Customization Guide

### Changing Color Palette

**Option 1: Theme Settings (Recommended)**
1. Go to **Themes** > **Customize**
2. Navigate to **Theme Settings** > **Colors**
3. Adjust accent color and other colors
4. Save

**Option 2: CSS Variables (Advanced)**

Edit `assets/styles.css`:

```css
:root {
  --color-accent: #2C5F7D;        /* Deep Blue variant */
  --color-accent-hover: #1E4A60;
  --color-accent-light: #6B9AB8;
}
```

### Adding Custom Fonts

**Note:** Theme ships with no paid fonts. To add custom fonts:

1. **Add font files** to `assets/` directory
2. **Update CSS** in `assets/styles.css`:

```css
@font-face {
  font-family: 'CustomFont';
  src: url('custom-font.woff2') format('woff2');
  font-display: swap;
}

:root {
  --font-body: 'CustomFont', -apple-system, BlinkMacSystemFont, sans-serif;
}
```

### Creating New Sections

1. Create new file in `sections/` directory
2. Follow Shopify Liquid section schema format
3. Add section via theme editor

Example starter template:

```liquid
<section class="my-section">
  {{ section.settings.content }}
</section>

{% schema %}
{
  "name": "My Section",
  "settings": [
    {
      "type": "text",
      "id": "content",
      "label": "Content"
    }
  ],
  "presets": [
    {
      "name": "My Section"
    }
  ]
}
{% endschema %}
```

---

## 🔌 Integrations

### Recommended Apps

- **Klaviyo:** Email marketing (newsletter integration)
- **Judge.me:** Product reviews
- **Searchanise:** Enhanced search
- **Bold Subscriptions:** Recurring orders

### Analytics

Add tracking codes via **Settings** > **Checkout** > **Order status page** or use Shopify's native analytics.

---

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari iOS 12+
- Chrome Android (last 2 versions)

---

## ♿ Accessibility Features

- **WCAG 2.1 Level AA** compliant
- Keyboard navigation for all interactive elements
- ARIA labels on modals, drawers, and icons
- Color contrast ratio ≥ 4.5:1 for text
- Focus indicators on interactive elements
- Screen reader friendly

---

## ⚡ Performance Optimizations

- **Critical CSS inlined** in `<head>`
- **Deferred CSS loading** for non-critical styles
- **Lazy loading images** with native `loading="lazy"`
- **Responsive images** with `srcset` and `sizes`
- **Minimal JavaScript** (progressive enhancement only)
- **System fonts** (no external font requests)
- **Target Lighthouse Score:** >85 mobile, >95 desktop

---

## 📝 Sample Products Data

For testing, use these placeholder products:

```json
[
  {
    "handle": "premium-collection-item-1",
    "title": "Classic Essential Tee",
    "price": 4500,
    "compare_at_price": 6000,
    "tags": ["new", "bestseller"]
  },
  {
    "handle": "premium-collection-item-2",
    "title": "Minimalist Hoodie",
    "price": 8900,
    "compare_at_price": null,
    "tags": ["new"]
  },
  {
    "handle": "premium-collection-item-3",
    "title": "Essential Joggers",
    "price": 6500,
    "compare_at_price": 8500,
    "tags": ["sale"]
  },
  {
    "handle": "premium-collection-item-4",
    "title": "Signature Sweatshirt",
    "price": 7200,
    "compare_at_price": null,
    "tags": ["bestseller"]
  },
  {
    "handle": "premium-collection-item-5",
    "title": "Luxury Basics Set",
    "price": 12000,
    "compare_at_price": 15000,
    "tags": ["sale", "bundle"]
  },
  {
    "handle": "premium-collection-item-6",
    "title": "Timeless Denim Jacket",
    "price": 14900,
    "compare_at_price": null,
    "tags": ["new", "premium"]
  }
]
```

---

## 🐛 Troubleshooting

### Issue: Theme sections not appearing

**Solution:** Ensure JSON template files reference correct section types. Check `templates/*.json` files.

### Issue: Images not loading

**Solution:**
1. Check image URLs in section settings
2. Verify images are uploaded to Shopify Files
3. Clear browser cache

### Issue: Cart drawer not opening

**Solution:**
1. Check JavaScript console for errors
2. Ensure `theme.js` is loaded
3. Verify cart drawer HTML structure in `layout/theme.liquid`

### Issue: Styles not applying

**Solution:**
1. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
2. Check that `styles.css` is properly linked in theme.liquid
3. Verify CSS file uploaded to `assets/` directory

---

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourname/ethereal-theme/issues)
- **Documentation:** This README
- **Shopify Help:** [Shopify Theme Development Docs](https://shopify.dev/themes)

---

## 📜 License

**MIT License**

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

## 🙏 Attribution

- **No paid fonts included** - All typography uses system fonts
- **All assets are placeholders** or free to use
- **Icons:** Inline SVG (no external dependencies)
- **No third-party libraries** (vanilla JavaScript)

---

## 📊 Version History

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

---

**Made with ❤️ for the Shopify community**
