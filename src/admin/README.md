# Admin Panel

This folder contains the admin workflow UI for the backend contract:

`Request -> Offer -> Project`

## Implemented

- JWT login flow (`/admin/login`)
- Role-protected admin routes (`ROLE_ADMIN`)
- Dashboard overview counters
- Requests: list + detail + edit + status transitions + notes + audit
- Offers: list + detail + edit + status transitions + accept/cancel + notes + audit
- Projects: list + detail + edit + status transitions + notes + audit
- Shared typed API client with ProblemDetail error normalization
- Shared query keys and reusable hooks for pagination/error handling

## Environment

Optionally set:

- `VITE_API_BASE_URL` (default: `http://localhost:8080/api`)

## Route Map

- `/admin/login`
- `/admin`
- `/admin/requests`
- `/admin/requests/:id`
- `/admin/offers`
- `/admin/offers/:id`
- `/admin/projects`
- `/admin/projects/:id`

