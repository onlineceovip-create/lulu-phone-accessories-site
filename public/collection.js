import {
  getCollection,
  getCollectionLabel,
  getLanguage,
  localizeProduct,
  localizeText,
  normalizeCollectionSlug,
  buildWhatsAppLink,
  formatCurrency,
  setLanguage,
  t,
} from "/site.js";

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const sortFilter = document.getElementById("sortFilter");
const emptyState = document.getElementById("emptyState");
const statCount = document.getElementById("stat-count");
const languageSwitcher = document.getElementById("languageSwitcher");
const hero = document.getElementById("collectionHero");
const heroKicker = document.getElementById("heroKicker");
const heroTitle = document.getElementById("heroTitle");
const heroSubtitle = document.getElementById("heroSubtitle");
const collectionIntro = document.getElementById("collectionIntro");

let allProducts = [];

function getCurrentSlug() {
  const match = window.location.pathname.match(/\/collections\/([^/]+)/);
  return normalizeCollectionSlug(match ? decodeURIComponent(match[1]) : "pink");
}

function getCollectionProducts() {
  const slug = getCurrentSlug();
  return allProducts.filter((item) => item.category === slug);
}

function ratingStars(value) {
  const rounded = Math.round(Number(value || 0));
  return "★".repeat(rounded) + "☆".repeat(Math.max(0, 5 - rounded));
}

function renderProducts(products) {
  const language = getLanguage();
  statCount.textContent = String(products.length);
  emptyState.classList.toggle("hidden", products.length > 0);

  productGrid.innerHTML = products.map((item) => `
    <article class="product-card">
      ${localizeProduct(item, "badge", language) ? `<div class="product-badge">${localizeProduct(item, "badge", language)}</div>` : ""}
      <img src="${item.image}" alt="${localizeProduct(item, "name", language)}" />
      <div class="product-copy">
        <h3 class="product-title">${localizeProduct(item, "name", language)}</h3>
        <p class="product-description">${localizeProduct(item, "description", language)}</p>
      </div>
      <div class="review-row">
        <span class="stars">${ratingStars(item.rating)}</span>
        <span class="review-count">(${item.reviews || 0})</span>
      </div>
      <div class="product-meta">
        <div class="price-stack">
          ${item.compareAtPrice ? `<span class="compare-price">${formatCurrency(item.compareAtPrice, language)}</span>` : ""}
          <span class="price">${formatCurrency(item.price, language)}</span>
        </div>
        <span class="product-category">${getCollectionLabel(item.category, language)}</span>
      </div>
      <div class="product-actions">
        <a class="button primary" href="${buildWhatsAppLink(item.whatsapp, localizeProduct(item, "name", language), language)}" target="_blank" rel="noreferrer">${t("orderButton", language)}</a>
      </div>
    </article>
  `).join("");
}

function applyStaticTranslations() {
  const language = getLanguage();
  const slug = getCurrentSlug();
  const collection = getCollection(slug) || getCollection("pink");
  const coverImage = getCollectionProducts()[0]?.image || collection.coverImage;

  document.documentElement.lang = language;
  document.title = `Lulu | ${getCollectionLabel(slug, language)}`;
  languageSwitcher.value = language;
  document.body.dataset.collectionTheme = slug;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n, language);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder, language);
  });

  sortFilter.querySelectorAll("option").forEach((option) => {
    const key = option.dataset.i18n;
    if (key) {
      option.textContent = t(key, language);
    }
  });

  heroKicker.textContent = localizeText(collection.heroKicker, language);
  heroTitle.textContent = localizeText(collection.heroTitle, language);
  heroSubtitle.textContent = localizeText(collection.heroSubtitle, language);
  collectionIntro.textContent = localizeText(collection.intro, language);
  hero.style.setProperty("--hero-image", `url("${coverImage}")`);
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const sortBy = sortFilter.value;
  const language = getLanguage();

  const filtered = getCollectionProducts().filter((item) => {
    const name = localizeProduct(item, "name", language).toLowerCase();
    const description = localizeProduct(item, "description", language).toLowerCase();
    return !query || name.includes(query) || description.includes(query);
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "newest") return String(b.id).localeCompare(String(a.id));
    return Number(b.featured) - Number(a.featured);
  });

  renderProducts(sorted);
}

async function init() {
  const response = await fetch("/api/products");
  const data = await response.json();
  allProducts = Array.isArray(data.products) ? data.products : [];
  applyStaticTranslations();
  applyFilters();
}

searchInput.addEventListener("input", applyFilters);
sortFilter.addEventListener("change", applyFilters);
languageSwitcher.addEventListener("change", () => {
  setLanguage(languageSwitcher.value);
  applyStaticTranslations();
  applyFilters();
});

init().catch(() => {
  applyStaticTranslations();
  emptyState.textContent = t("emptyState", getLanguage());
  emptyState.classList.remove("hidden");
});
