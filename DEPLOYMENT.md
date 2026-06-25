# Deployment Notes

## Recommended platform

Use Render for the first public deployment of this project.

Why:

- managed HTTPS by default
- environment variables/secrets support
- persistent disk support for `products.json`
- Docker deploy already prepared

## Required environment variables

- `NODE_ENV=production`
- `HOST=0.0.0.0`
- `DATA_DIR=/var/data/lulu`
- `ADMIN_USERNAME=<your-secure-admin-user>`
- `ADMIN_PASSWORD=<your-secure-admin-password>`

## Important

This app writes product edits to `data/products.json`.

For public deployment, persistent storage is required, otherwise admin edits can disappear after restart or redeploy.

## Render setup

1. Push this folder to GitHub.
2. Create a new Render web service from the repo.
3. Render can read `render.yaml` automatically.
4. Set secure values for `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
5. Deploy and bind your custom domain.

## After deploy

Test these URLs:

- `/lulu`
- `/lulu/admin`
- `/api/health`
