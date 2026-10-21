# Timberly — React + Django furniture storefront

A full-stack furniture shopping demo with a React/Vite frontend and Django REST Framework backend.

## Features
- Responsive homepage, categories, product listing and product details
- Search, category filtering, price/name sorting, server-side pagination
- Persistent client-side cart with quantity/stock caps
- Demo checkout (no real payments), saved orders, user-specific order history
- JWT authentication (existing implementation retained)
- Contact form saved for staff to review in Django admin
- Admin management of products and order statuses

> **Demo only:** Checkout places an order in the database and updates stock; it does **not** charge money or process real payments. Authentication needs further hardening before production use.

## Local setup

Requires Python 3.12+ and Node.js 22+.

### Backend (Windows CMD)

```bat
cd timberly-backend
py -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
set DJANGO_DEBUG=true
py manage.py migrate
py manage.py import_products timberly_1000_products.csv
py manage.py runserver
```

Use `py manage.py createsuperuser` to access `http://127.0.0.1:8000/admin/`.
Run backend tests with `py manage.py test`.

### Frontend (second terminal)

```bat
cd timberly
npm ci
npm run dev
```

Open `http://localhost:5173/`.

For hosted frontends, configure `VITE_API_BASE_URL=https://your-backend-domain/api` during the build.

## Production environment

**A previously committed development SECRET_KEY was exposed in Git history. Never use that key for production; rotate it wherever it was used.**

Configure the backend with the following secrets/settings through your hosting provider:

| Variable | Purpose |
| --- | --- |
| `DJANGO_SECRET_KEY` | New random secret, **required** when DEBUG is false |
| `DJANGO_DEBUG` | `false` in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated backend hostnames |
| `CORS_ALLOWED_ORIGINS` | Comma-separated deployed frontend origins |
| `CSRF_TRUSTED_ORIGINS` | Optional Django trusted origins |
| `DATABASE_URL` | PostgreSQL connection URL for production |
| `DJANGO_SECURE_SSL_REDIRECT` | `true` for HTTPS deployments |

Backend setup: `pip install -r requirements.txt`, `python manage.py migrate`, `python manage.py collectstatic --noinput`, then `gunicorn timberly_backend.wsgi:application`. Provision persistent PostgreSQL: SQLite is intended only for local demo development.

The API uses JWT for protected order endpoints. The existing login flow has deliberately **not** been modified.

## API reference

- `GET /api/products/?search=&category=&ordering=&page=` — paginated products
- `GET /api/products/<id>/` — product detail
- `POST /api/orders/` — authenticated checkout
- `GET /api/orders/` — authenticated order history
- `POST /api/contact/` — submit contact message (rate limited)
- `POST /api/accounts/register/`, `POST /api/token/`, `POST /api/token/refresh/` — existing auth

## Quality checks

The GitHub Actions workflow runs `npm ci && npm run build`, Django system checks, migration checks, and Django tests.

## Known follow-ups

- Replace the 1000-item CSV placeholder images with curated product photography.
- Remove legacy Vue starter dependencies and regenerate the npm lockfile together.
- Add real payment handling only after security review and a test/sandbox payment provider integration.
- Add automated frontend component and end-to-end browser tests.
