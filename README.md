# React + TypeScript Developer Challenge

This repository is a **fork of the Micromerce developer challenge**. I used the provided starting point and implemented improvements on my own branch to demonstrate practical React and TypeScript development.

> **My work is on the `saad/improvements` branch**, which is also configured as the default branch of this fork.

## What I implemented

- Improved project structure with pages, components, context, and shared types
- Routing for product list and product detail pages
- Global cart state using React Context
- Immutable cart updates and quantity handling
- Cart dropdown with totals, quantity controls, and clear action
- Product data loaded from the backend instead of local sample data
- Loading and error states
- Environment-based API configuration
- Cleaner imports with path aliases
- Page-level titles and metadata

## Tech stack

- React
- TypeScript
- Vite
- React Router
- Context API
- REST API integration

## Live demo

- Frontend: https://micromerce.vercel.app/
- Backend: https://dev-workout-backend-kotlin.onrender.com/products

## Run locally

```bash
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

Then start the development server:

```bash
npm run dev
```

## Key engineering decision

The original cart implementation mutated a cart object directly, which did not reliably trigger React re-renders. I moved cart state into React state/context and used immutable updates so the UI remains synchronized with application state.

## Related backend

[Kotlin + Spring Boot challenge](https://github.com/saadouardi/dev-workout-backend-kotlin)

## Author

**Saad Ouardi**  
[Portfolio](https://saadouardi.vercel.app) · [LinkedIn](https://www.linkedin.com/in/saad-ouardi)
