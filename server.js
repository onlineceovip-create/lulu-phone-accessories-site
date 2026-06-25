const http = require("http");
const fs = require("fs");
const path = require("path");
const { URL } = require("url");

const HOST = process.env.HOST || "0.0.0.0";
const PORT = Number(process.env.PORT || 3000);
const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(process.env.DATA_DIR)
  : path.join(ROOT, "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "codex123";
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

function ensureDataFile() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify({ products: [] }, null, 2));
  }
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "same-origin",
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
      if (data.length > 2 * 1024 * 1024) {
        reject(new Error("Request body too large"));
      }
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function loadProducts() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE, "utf8"));
}

function saveProducts(payload) {
  ensureDataFile();
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(payload, null, 2));
}

function isAuthorized(req) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Basic ")) {
    return false;
  }

  const decoded = Buffer.from(authHeader.slice(6), "base64").toString("utf8");
  const [username, password] = decoded.split(":");
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

function requireAuth(req, res) {
  if (isAuthorized(req)) {
    return true;
  }

  res.writeHead(401, {
    "WWW-Authenticate": 'Basic realm="Phone Accessories Admin"',
    "Content-Type": "application/json; charset=utf-8",
  });
  res.end(JSON.stringify({ error: "Unauthorized" }));
  return false;
}

function sanitizeProduct(product, index) {
  return {
    id: String(product.id || `item-${Date.now()}-${index}`),
    name: String(product.name || "").trim(),
    nameZh: String(product.nameZh || "").trim(),
    nameSw: String(product.nameSw || "").trim(),
    category: String(product.category || "").trim(),
    categoryZh: String(product.categoryZh || "").trim(),
    categorySw: String(product.categorySw || "").trim(),
    price: Number(product.price || 0),
    compareAtPrice: Number(product.compareAtPrice || 0),
    stock: Number(product.stock || 0),
    featured: Boolean(product.featured),
    image: String(product.image || "").trim(),
    description: String(product.description || "").trim(),
    descriptionZh: String(product.descriptionZh || "").trim(),
    descriptionSw: String(product.descriptionSw || "").trim(),
    whatsapp: String(product.whatsapp || "").trim(),
    badge: String(product.badge || "").trim(),
    badgeZh: String(product.badgeZh || "").trim(),
    badgeSw: String(product.badgeSw || "").trim(),
    rating: Number(product.rating || 0),
    reviews: Number(product.reviews || 0),
  };
}

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeType = MIME_TYPES[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "same-origin",
      });
      res.end("Not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": mimeType,
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "DENY",
      "Referrer-Policy": "same-origin",
    });
    res.end(content);
  });
}

function handleApi(req, res, url) {
  if (url.pathname === "/api/health" && req.method === "GET") {
    return sendJson(res, 200, {
      ok: true,
      service: "lulu-phone-accessories-site",
      timestamp: new Date().toISOString(),
    });
  }

  if (url.pathname === "/api/products" && req.method === "GET") {
    return sendJson(res, 200, loadProducts());
  }

  if (url.pathname === "/api/admin/products" && req.method === "GET") {
    if (!requireAuth(req, res)) {
      return;
    }
    return sendJson(res, 200, loadProducts());
  }

  if (url.pathname === "/api/admin/products" && req.method === "POST") {
    if (!requireAuth(req, res)) {
      return;
    }

    readBody(req)
      .then((body) => {
        const parsed = JSON.parse(body || "{}");
        const products = Array.isArray(parsed.products) ? parsed.products : [];
        const sanitized = products.map(sanitizeProduct).filter((item) => item.name);
        saveProducts({ products: sanitized });
        sendJson(res, 200, { ok: true, count: sanitized.length });
      })
      .catch((err) => {
        sendJson(res, 400, { error: err.message });
      });
    return;
  }

  sendJson(res, 404, { error: "API route not found" });
}

function routeStatic(url, res) {
  let requestedPath = url.pathname;
  if (requestedPath === "/" || requestedPath === "/lulu" || requestedPath === "/lulu/") {
    requestedPath = "/home.html";
  }

  if (requestedPath === "/lulu/admin" || requestedPath === "/lulu/admin/") {
    requestedPath = "/admin.html";
  }

  if (/^\/lulu\/collections\/[^/]+\/?$/.test(requestedPath)) {
    requestedPath = "/collection.html";
  }

  const safePath = path.normalize(requestedPath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(PUBLIC_DIR, safePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    serveFile(filePath, res);
    return;
  }

  serveFile(path.join(PUBLIC_DIR, "home.html"), res);
}

ensureDataFile();

if (IS_PRODUCTION && (ADMIN_USERNAME === "admin" || ADMIN_PASSWORD === "codex123")) {
  throw new Error("In production, ADMIN_USERNAME and ADMIN_PASSWORD must be set to secure custom values.");
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.startsWith("/api/")) {
    handleApi(req, res, url);
    return;
  }

  routeStatic(url, res);
});

server.listen(PORT, HOST, () => {
  console.log(`Phone accessories site running on ${HOST}:${PORT}`);
  console.log(`Branded route: http://127.0.0.1:${PORT}/lulu`);
  console.log(`Health check: http://127.0.0.1:${PORT}/api/health`);
  console.log(`Admin page: http://${HOST}:${PORT}/admin.html`);
  console.log(`Branded admin route: http://${HOST}:${PORT}/lulu/admin`);
  console.log(`Admin login: ${ADMIN_USERNAME} / ${ADMIN_PASSWORD}`);
});
