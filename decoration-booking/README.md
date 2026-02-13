# Swastik Event 2026 - Decoration Booking System

A complete multi-page event decoration booking system built with vanilla HTML, CSS, and JavaScript.

## 📋 Project Features

- **Multi-page booking flow** with persistent data storage
- **Ready-made decoration packages** with detailed descriptions
- **Custom decoration design** option for personalized themes
- **Real-time form validation** on all pages
- **localStorage integration** for seamless data persistence
- **Responsive design** for mobile, tablet, and desktop
- **Multiple payment methods** (Card, UPI, Bank Transfer, Installments)
- **Professional UI** with gradient backgrounds and smooth animations

## 🗂️ Project Structure

```
decoration-booking/
├── index.html                 # Welcome/Landing page
├── booking.html              # Step 1: Event details form
├── decor-selection.html      # Step 2: Choose decoration style
├── custom-decor.html         # Custom decoration design form
├── client-details.html       # Step 3: Client info & booking summary
├── cart.html                 # Step 4: Payment & checkout
│
├── css/
│   ├── common.css           # Global styles and components
│   ├── booking.css          # Booking page styles
│   ├── decor-selection.css  # Decoration selection styles
│   ├── custom-decor.css     # Custom decoration styles
│   ├── client-details.css   # Client details page styles
│   └── cart.css             # Payment page styles
│
├── js/
│   ├── storage.js           # localStorage utility & data management
│   ├── validation.js        # Form validation utilities
│   ├── decorations.js       # Pre-defined decoration packages data
│   ├── booking.js           # Booking page logic
│   ├── decor-selection.js   # Decoration selection logic
│   ├── custom-decor.js      # Custom decoration logic
│   ├── client-details.js    # Client details page logic
│   └── cart.js              # Payment processing logic
│
└── README.md               # This file
```

## 🚀 How to Use

### Quick Start

1. Open `index.html` in a web browser
2. Click "Start Booking Now" button
3. Follow the 4-step booking process:
   - **Step 1**: Enter event details (type, date, guests, budget)
   - **Step 2**: Choose decoration style (ready-made or custom)
   - **Step 3**: Provide venue and client information
   - **Step 4**: Select payment method and confirm

### Booking Flow

```
index.html (Home)
    ↓
booking.html (Event Details)
    ↓
decor-selection.html (Choose Decoration)
    ├─ Ready-Made → client-details.html
    └─ Custom → custom-decor.html → client-details.html
    ↓
client-details.html (Client Info + Summary)
    ↓
cart.html (Payment)
    ↓
Success Modal → Back to Home
```

## 🎨 Decoration Packages

The system includes 6 pre-defined decoration packages:

1. **Classic Elegance** - ₹50,000 (Gold & White theme)
2. **Modern Minimal** - ₹40,000 (Contemporary design)
3. **Garden Bloom** - ₹55,000 (Floral arrangements)
4. **Royal Gold** - ₹70,000 (Luxury style)
5. **Pastel Dreams** - ₹45,000 (Soft colors)
6. **Festival Colors** - ₹35,000 (Vibrant theme)

Custom decorations start at **₹35,000** (base price)

## 💾 Data Storage

The system uses **localStorage** to persist booking data:

```javascript
// Access booking data
const booking = Storage.getBooking();

// Update single field
Storage.set('eventDate', '2026-03-15');

// Update multiple fields
Storage.updateBooking({
    eventType: 'Wedding Reception',
    numberOfGuests: 250
});

// Clear all data
Storage.clear();
```

## ✅ Form Validation

All forms have built-in validation:

- **Email**: Valid format check
- **Phone**: 10-digit validation
- **Date**: Future date only
- **Number fields**: Range validation
- **Required fields**: Non-empty checks

## 🎯 Payment Methods

The system supports 4 payment methods:

1. **Credit/Debit Card** - Instant payment
2. **UPI** - Indian digital payment
3. **Bank Transfer** - Manual transfer with reference ID
4. **Installment Plans** - 3 or 6 month options

## 🔧 Customization

### Modify Decoration Packages

Edit `js/decorations.js` to add/remove/update packages:

```javascript
{
    id: 7,
    name: 'Your Theme',
    price: 60000,
    image: 'path/to/image.jpg',
    description: 'Theme description',
    includedItems: ['Item 1', 'Item 2', ...]
}
```

### Change Colors

Modify CSS variables in `css/common.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
    /* ... more colors */
}
```

### Update Bank Details

Edit the bank transfer section in `cart.html` with your account details.

## 🔐 Security Notes

- **Payment fields are NOT actually processed** - this is a demo system
- In production, integrate with actual payment gateways (Razorpay, Stripe, etc.)
- Implement server-side validation for all forms
- Use HTTPS for all transactions
- Store sensitive data securely on the server

## 📱 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Android)

## ♿ Accessibility Features

- Semantic HTML structure
- ARIA labels where applicable
- Keyboard navigation support
- Sufficient color contrast
- Form error messages

## 🎓 Learning Points

This project demonstrates:

- Multi-page SPA with vanilla JavaScript
- localStorage for client-side data persistence
- Form validation and error handling
- Responsive grid layouts with CSS
- Event delegation and DOM manipulation
- Progressive enhancement
- UX/UI best practices for booking systems

## 📞 Support

For questions or issues, contact the development team.

## 📄 License

This project is created for Swastik Event 2026. All rights reserved.

---

**Last Updated**: 2026  
**Version**: 1.0  
**Status**: Production Ready
