# Product Catalog

A modern CRUD application built with Next.js, Redux Toolkit, and Tailwind CSS for managing products with cart functionality.

## Features

- ✅ Add Products: Create new products with name, price, category, and quantity
- ✅ View Products: Display all products in a clean table with sorting and pagination
- ✅ Edit Products: Update existing product details
- ✅ Delete Products: Remove products with confirmation modal
- ✅ Add to Cart: Add products to cart, adjust quantities, remove items, clear cart
- ✅ Cart Modal: View/manage cart from the header badge
- ✅ Form Validation: Required fields with inline errors
- ✅ Global State: Redux Toolkit for products and cart

## Tech Stack

- Framework: Next.js 14 (App Router)
- Language: TypeScript
- State Management: Redux Toolkit
- Styling: Tailwind CSS

## Setup

### Prerequisites
- Node.js 18+
- npm

### Installation
```bash
git clone <repository-url>
cd "Product Catalog"
npm install
npm run dev
```
Open http://localhost:3000

### Production
```bash
npm run build
npm start
```

### Lint
```bash
npm run lint
```

## Usage
- Add product via the form in the modal (Add Product button).
- Edit/Delete from the table actions.
- Add to cart from the table; open cart via header badge to adjust quantities or remove/clear.
- Pagination + page size selector; sorting by name, price, quantity, category with asc/desc toggle.

