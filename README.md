# Flipkart Clone (React + Vite)

Storefront frontend: React 18, Vite, Redux Toolkit, React Router, Tailwind, Axios.

## Run
```bash
npm install
npm run dev
```

## What works
- Home: category bar, auto-rotating offers carousel, product shelves
- Search, category filter, price and rating filters, sorting
- Product page: offers, pincode check, highlights, similar products
- Cart (quantity, remove, price details), wishlist, order history
- Login (demo: any 10-digit number, OTP 123456)
- Checkout: address, summary, payment choice, order confirmation
- State persists in localStorage

## Next
- `src/api/axios.js` is ready for the Node/Express + Prisma backend; replace `src/data/products.js` reads and the mock auth/orders slices with API calls.
- Razorpay hooks in at `confirm()` in `src/pages/Checkout.jsx`.
- Seller and admin dashboards.

Product images are placeholders from picsum.photos. Not affiliated with Flipkart.
