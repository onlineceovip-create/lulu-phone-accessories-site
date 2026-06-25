import {
  COLLECTION_ORDER,
  getCollection,
  getCollectionLabel,
  getLanguage,
  localizeText,
  setLanguage,
  t,
} from "/site.js";

const languageSwitcher = document.getElementById("languageSwitcher");
const categoryGrid = document.getElementById("categoryGrid");

let allProducts = [];

function applyStaticTranslations() {
  const language = getLanguage();
  document.documentElement.lang = language;
  document.title = `Lulu`;
  languageSwitcher.value = language;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n, language);
  });
}

function renderCategories() {
  const language = getLanguage();

  categoryGrid.innerHTML = COLLECTION_ORDER.map((slug) => {
    const collection = getCollection(slug);
    const categoryProducts = allProducts.filter((item) => item.category === slug);
    const count = categoryProducts.length;
    const coverImage = categoryProducts[0]?.image || collection.coverImage;

    return `
      <a class="category-card category-${slug}" href="/lulu/collections/${slug}">
        <div class="category-media" style="--category-image: url('${coverImage}')"></div>
        <div class="category-copy">
          <p class="category-name">${getCollectionLabel(slug, language)}</p>
          <p class="category-summary">${localizeText(collection.homeSummary, language)}</p>
          <div class="category-footer">
            <span>${count} ${t("productsCountLabel", language)}</span>
            <span class="category-link">${t("viewCollection", language)}</span>
          </div>
        </div>
      </a>
    `;
  }).join("");
}

async function init() {
  const response = await fetch("/api/products");
  const data = await response.json();
  allProducts = Array.isArray(data.products) ? data.products : [];
  applyStaticTranslations();
  renderCategories();
}

languageSwitcher.addEventListener("change", () => {
  setLanguage(languageSwitcher.value);
  applyStaticTranslations();
  renderCategories();
});

init().catch(() => {
  applyStaticTranslations();
  categoryGrid.innerHTML = `<p class="empty-state">${t("emptyState")}</p>`;
});
