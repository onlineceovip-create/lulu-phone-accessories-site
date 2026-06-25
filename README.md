# Lulu Phone Accessories Site

This is a simple storefront and admin panel for selling phone accessories.

## Local run

```powershell
powershell -ExecutionPolicy Bypass -File .\start.ps1
```

## Auto-start on this PC

```powershell
powershell -ExecutionPolicy Bypass -File .\install-autostart.ps1
```

Remove auto-start:

```powershell
powershell -ExecutionPolicy Bypass -File .\uninstall-autostart.ps1
```

Note:

- This only makes the site start automatically on this Windows PC.
- If you want everyone to open it anytime, the site still needs to be deployed to a public server/domain.

Storefront:

- `http://127.0.0.1:3000/lulu`

Admin:

- `http://127.0.0.1:3000/lulu/admin`

Health check:

- `http://127.0.0.1:3000/api/health`

Default login:

- Username: `admin`
- Password: `codex123`

## Manage products

1. Open the admin page.
2. Click `Load Products`.
3. Edit, add, or delete products.
4. Click `Save Changes`.

Products are stored in `data/products.json`.

## Public deployment

This project is now ready for standard Node deployment:

- `package.json` included
- `Procfile` included
- `Dockerfile` included
- health check route: `/api/health`

### Deploy with Node

```bash
npm start
```

Environment variables:

- `PORT`: server port
- `HOST`: bind host, default `0.0.0.0`
- `ADMIN_USERNAME`: admin username
- `ADMIN_PASSWORD`: admin password
- `DATA_DIR`: optional external data directory for `products.json`

### Important note about product data

If you deploy to platforms with ephemeral filesystem storage, changes made in the admin panel may be lost after redeploy or restart.

For real public use, you should do one of these:

- mount persistent disk storage and set `DATA_DIR`
- move product data into a database

### Suggested next step

Deploy this folder to a public server or platform like Railway, Render, or a VPS, then bind your own domain.
