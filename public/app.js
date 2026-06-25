let allProducts = [];
let currentLanguage = localStorage.getItem("site-language") || "en";

const EXCHANGE_RATES = {
  USD: 1,
  CNY: 6.81,
  TZS: 2630.9308,
};

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const emptyState = document.getElementById("emptyState");
const statCount = document.getElementById("stat-count");
const languageSwitcher = document.getElementById("languageSwitcher");

const translations = {
  en: {
    pageTitle: "Lulu",
    promoBar: "All phone cases include shipping costs ✨",
    brandName: "Lulu",
    navHome: "Home",
    navCatalog: "Catalog",
    heroKicker: "Curated iPhone case collection",
    heroTitle: "Luxury cases with a cleaner, more premium storefront feel.",
    heroSubtitle: "Retail-ready product cards, direct WhatsApp ordering, and a backend you can actually manage yourself.",
    introText: "Explore Lulu's handpicked iPhone case lineup with stylish looks, daily protection, and giftable designs.",
    searchLabel: "Search",
    searchPlaceholder: "Search products...",
    filterLabel: "Filter",
    sortLabel: "Sort by",
    sortFeatured: "Featured",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortNewest: "Newest",
    productsCountLabel: "products",
    emptyState: "No products match this filter right now.",
    allCategories: "All categories",
    orderButton: "Order on WhatsApp",
    featuredDefault: "Featured",
    defaultCategory: "iPhone Cases",
    defaultDescription: "Curated iPhone case with a clean look, stylish finish, and everyday protection.",
  },
  zh: {
    pageTitle: "Lulu",
    promoBar: "\u5168\u90E8\u624B\u673A\u58F3\u5747\u542B\u8FD0\u8D39 \u2728",
    brandName: "Lulu",
    navHome: "\u9996\u9875",
    navCatalog: "\u5546\u54C1",
    heroKicker: "Lulu Pink Select",
    heroTitle: "Lulu \u7C89\u7CFB\u624B\u673A\u58F3",
    heroSubtitle: "\u989C\u503C\u66F4\u8F7B\u751C\uff0c\u4E0B\u5355\u4E5F\u66F4\u76F4\u63A5\u3002",
    introText: "\u6311\u51E0\u6B3E\u597D\u770B\u53C8\u597D\u7528\u7684 iPhone \u624B\u673A\u58F3\u5427\u3002",
    searchLabel: "\u641C\u7D22",
    searchPlaceholder: "\u641C\u7D22\u5546\u54C1...",
    filterLabel: "\u7B5B\u9009",
    sortLabel: "\u6392\u5E8F",
    sortFeatured: "\u63A8\u8350\u4F18\u5148",
    sortPriceLow: "\u4EF7\u683C\u4ECE\u4F4E\u5230\u9AD8",
    sortPriceHigh: "\u4EF7\u683C\u4ECE\u9AD8\u5230\u4F4E",
    sortNewest: "\u6700\u65B0\u4E0A\u67B6",
    productsCountLabel: "\u4EF6\u5546\u54C1",
    emptyState: "\u5F53\u524D\u7B5B\u9009\u6761\u4EF6\u4E0B\u6682\u65F6\u6CA1\u6709\u5339\u914D\u5546\u54C1\u3002",
    allCategories: "\u5168\u90E8\u5206\u7C7B",
    orderButton: "WhatsApp \u4E0B\u5355",
    featuredDefault: "\u63A8\u8350",
    defaultCategory: "\u624B\u673A\u58F3",
    defaultDescription: "\u7CBE\u9009 iPhone \u624B\u673A\u58F3\uff0c\u5916\u89C2\u65F6\u5C1A\uff0C\u65E5\u5E38\u9632\u62A4\u4E5F\u5F88\u5B9E\u7528\u3002",
  },
  sw: {
    pageTitle: "Lulu",
    promoBar: "Kava zote za simu zinajumuisha gharama ya usafirishaji ✨",
    brandName: "Lulu",
    navHome: "Nyumbani",
    navCatalog: "Bidhaa",
    heroKicker: "Lulu Pink Select",
    heroTitle: "Kava za Lulu za pinki",
    heroSubtitle: "Rahisi, nzuri, na rahisi kuagiza kwa WhatsApp.",
    introText: "Chagua kava nzuri za iPhone zenye muonekano laini na wa kuvutia.",
    searchLabel: "Tafuta",
    searchPlaceholder: "Tafuta bidhaa...",
    filterLabel: "Chuja",
    sortLabel: "Panga kwa",
    sortFeatured: "Zilizopendekezwa",
    sortPriceLow: "Bei: Ndogo kwenda Kubwa",
    sortPriceHigh: "Bei: Kubwa kwenda Ndogo",
    sortNewest: "Mpya zaidi",
    productsCountLabel: "bidhaa",
    emptyState: "Hakuna bidhaa zinazolingana na chaguo hili kwa sasa.",
    allCategories: "Aina zote",
    orderButton: "Agiza kwa WhatsApp",
    featuredDefault: "Iliyopendekezwa",
    defaultCategory: "Kava za iPhone",
    defaultDescription: "Kava ya iPhone iliyochaguliwa vizuri, yenye muonekano safi, mtindo mzuri, na ulinzi wa matumizi ya kila siku.",
  },
};

function t(key) {
  return translations[currentLanguage][key] || translations.en[key] || key;
}

function currency(amount) {
  const value = Number(amount || 0);

  if (currentLanguage === "zh") {
    const roundedValue = Math.round((value * EXCHANGE_RATES.CNY) / 10) * 10;
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedValue);
  }

  if (currentLanguage === "sw") {
    const roundedValue = Math.round((value * EXCHANGE_RATES.TZS) / 1000) * 1000;
    return `TZS ${new Intl.NumberFormat("en-TZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedValue)}`;
  }

  const roundedValue = Math.round(value);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(roundedValue);
}

function fallbackLocalizedValue(item, key) {
  if (key === "name") {
    if (currentLanguage === "zh") {
      return translateNameToChinese(item.name || "");
    }

    if (currentLanguage === "sw") {
      return translateNameToSwahili(item.name || "");
    }
  }

  if (key === "category") {
    return t("defaultCategory");
  }

  if (key === "description") {
    return t("defaultDescription");
  }

  return item[key] || "";
}

function translateNameToChinese(name) {
  let result = String(name || "");

  const replacements = [
    [/for iPhone/gi, "\u9002\u7528\u4E8E iPhone"],
    [/iPhone Case/gi, "iPhone \u624B\u673A\u58F3"],
    [/Phone Case/gi, "\u624B\u673A\u58F3"],
    [/Cute Girly\s*&\s*Korean Style/gi, "\u751C\u7F8E\u97E9\u7CFB"],
    [/Cute girly/gi, "\u751C\u7F8E"],
    [/Korean Style/gi, "\u97E9\u7CFB"],
    [/New INS/gi, "\u65B0\u6B3E INS"],
    [/Plain-Thin|Plain Thin/gi, "\u7EAF\u8272\u8F7B\u8584"],
    [/MagSafe/gi, "MagSafe"],
    [/Crystal/gi, "\u6C34\u6676"],
    [/Litchi Grein|Litchi Grain|lychee texture/gi, "\u8354\u679D\u7EB9"],
    [/Protective Cover/gi, "\u4FDD\u62A4\u58F3"],
    [/Full-Cover|Full Coverage/gi, "\u5168\u5305"],
    [/Camera Guard/gi, "\u955C\u5934\u4FDD\u62A4"],
    [/Anti-yellowing/gi, "\u6297\u53D1\u9EC4"],
    [/shockproof/gi, "\u9632\u6454"],
    [/hard shell/gi, "\u786C\u58F3"],
    [/aurora-style|Aurora/gi, "\u6781\u5149\u98CE"],
    [/Electroplated/gi, "\u7535\u9540"],
    [/Patchwork/gi, "\u62FC\u63A5"],
    [/Leather Texture|Leather Feel|Vegan-Leather/gi, "\u76AE\u7EB9"],
    [/mirror/gi, "\u955C\u9762"],
    [/glitter and rhinestone/gi, "\u95EA\u94BB"],
    [/glitter/gi, "\u95EA\u7C89"],
    [/rhinestone/gi, "\u6C34\u94BB"],
    [/converter/gi, "\u53D8\u6362"],
    [/Quick-Change|quick-change/gi, "\u5FEB\u6377\u6362\u58F3"],
    [/Diamond-studded/gi, "\u94BB\u9970"],
    [/Silicone/gi, "\u7845\u80F6"],
    [/Lens Cover/gi, "\u955C\u5934\u76D6"],
    [/Card Holder/gi, "\u63D2\u5361"],
    [/Minimalist/gi, "\u7B80\u7EA6"],
    [/Original Color/gi, "\u7EAF\u8272"],
    [/Snake Cutout/gi, "\u87BA\u7EB9\u5F00\u7A97"],
    [/Dark Red Gradient/gi, "\u6697\u7EA2\u6E10\u53D8"],
    [/Solid Color/gi, "\u7EAF\u8272"],
    [/Fluffy/gi, "\u6BDB\u7ED2"],
    [/Kitty\s*&\s*Melody/gi, "Kitty \u4E0E Melody"],
    [/Kitty/gi, "Kitty"],
    [/CRAYON SHINCHAN/gi, "\u8721\u7B14\u5C0F\u65B0"],
    [/iPhone 17 Series/gi, "iPhone 17 \u7CFB\u5217"],
    [/iPhone/gi, "iPhone"],
    [/\bcase\b/gi, "\u624B\u673A\u58F3"],
  ];

  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  result = result
    .replace(/\s*-\s*/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+,/g, ",")
    .replace(/\(\s*/g, "（")
    .replace(/\s*\)/g, "）")
    .trim();

  if (!/手机壳|保护壳/.test(result)) {
    result = `${result} 手机壳`.trim();
  }

  return result;
}

function translateNameToSwahili(name) {
  let result = String(name || "");

  const replacements = [
    [/Cute Girly\s*&\s*Korean Style/gi, "ya kike ya mtindo wa Korea"],
    [/Cute girly/gi, "ya kike"],
    [/Korean Style/gi, "mtindo wa Korea"],
    [/Crystal/gi, "crystal"],
    [/Protective Cover/gi, "kava ya ulinzi"],
    [/Full-Cover|Full Coverage/gi, "kifuniko kamili"],
    [/Camera Guard/gi, "ulinzi wa kamera"],
    [/Anti-yellowing/gi, "isiyogeuka njano"],
    [/shockproof/gi, "kinga ya mshtuko"],
    [/hard shell/gi, "ganda gumu"],
    [/aurora-style|Aurora/gi, "mtindo wa aurora"],
    [/Electroplated/gi, "ya electroplated"],
    [/Leather Texture|Leather Feel|Vegan-Leather/gi, "mwonekano wa ngozi"],
    [/mirror/gi, "ya kioo"],
    [/glitter and rhinestone/gi, "ya glitter na mawe"],
    [/glitter/gi, "ya glitter"],
    [/converter/gi, "ya kubadilisha"],
    [/Quick-Change|quick-change/gi, "ya kubadilisha haraka"],
    [/Diamond-studded/gi, "yenye mapambo ya almasi"],
    [/Silicone/gi, "silicone"],
    [/Lens Cover/gi, "na kifuniko cha lensi"],
    [/Card Holder/gi, "yenye sehemu ya kadi"],
    [/Minimalist/gi, "rahisi"],
    [/Original Color/gi, "rangi halisi"],
    [/Dark Red Gradient/gi, "gradient nyekundu ya giza"],
    [/Fluffy/gi, "ya manyoya laini"],
    [/Phone Case|case/gi, "kava"],
  ];

  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  result = result.replace(/\s{2,}/g, " ").trim();

  if (!/kava/i.test(result)) {
    result = `Kava ${result}`.trim();
  }

  return result;
}

function localizeProduct(item, key) {
  const zhKey = `${key}Zh`;
  const swKey = `${key}Sw`;

  if (currentLanguage === "zh" && item[zhKey]) {
    return item[zhKey];
  }

  if (currentLanguage === "sw" && item[swKey]) {
    return item[swKey];
  }

  if (currentLanguage !== "en") {
    return fallbackLocalizedValue(item, key);
  }

  return item[key] || "";
}

function whatsappLink(number, productName) {
  const prefix = currentLanguage === "zh"
    ? `\u4F60\u597D\uff0c\u6211\u60F3\u54A8\u8BE2\u4E00\u4E0B ${productName}\u3002`
    : currentLanguage === "sw"
      ? `Habari, nataka kuulizia kuhusu ${productName}.`
      : `Hi, I want to ask about ${productName}.`;
  const text = encodeURIComponent(prefix);
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${text}`;
}

function renderCategories(products) {
  const categories = [...new Map(products
    .filter((item) => item.category)
    .map((item) => [item.category, localizeProduct(item, "category") || t("defaultCategory")]))
    .entries()];

  categoryFilter.innerHTML = `<option value="all">${t("allCategories")}</option>` +
    categories.map(([value, label]) => `<option value="${value}">${label}</option>`).join("");
}

function ratingStars(value) {
  const rounded = Math.round(Number(value || 0));
  return "\u2605".repeat(rounded) + "\u2606".repeat(Math.max(0, 5 - rounded));
}

function renderProducts(products) {
  statCount.textContent = String(products.length);
  emptyState.classList.toggle("hidden", products.length > 0);
  productGrid.innerHTML = products.map((item) => `
    <article class="product-card">
      ${localizeProduct(item, "badge") ? `<div class="product-badge">${localizeProduct(item, "badge")}</div>` : ""}
      <img src="${item.image}" alt="${localizeProduct(item, "name")}" />
      <div class="product-copy">
        <h3 class="product-title">${localizeProduct(item, "name")}</h3>
        <p class="product-description">${localizeProduct(item, "description")}</p>
      </div>
      <div class="review-row">
        <span class="stars">${ratingStars(item.rating)}</span>
        <span class="review-count">(${item.reviews || 0})</span>
      </div>
      <div class="product-meta">
        <div class="price-stack">
          ${item.compareAtPrice ? `<span class="compare-price">${currency(item.compareAtPrice)}</span>` : ""}
          <span class="price">${currency(item.price)}</span>
        </div>
        <span class="product-category">${localizeProduct(item, "category")}</span>
      </div>
      <div class="product-actions">
        <a class="button primary" href="${whatsappLink(item.whatsapp || "", localizeProduct(item, "name"))}" target="_blank" rel="noreferrer">${t("orderButton")}</a>
      </div>
    </article>
  `).join("");
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;
  document.title = t("pageTitle");

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t(node.dataset.i18n);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  });

  const selectedCategory = categoryFilter.value;
  const selectedSort = sortFilter.value;

  renderCategories(allProducts);

  if ([...categoryFilter.options].some((option) => option.value === selectedCategory)) {
    categoryFilter.value = selectedCategory;
  }

  sortFilter.querySelectorAll("option").forEach((option) => {
    const key = option.dataset.i18n;
    if (key) {
      option.textContent = t(key);
    }
  });

  sortFilter.value = selectedSort;
}

function applyFilters() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const sortBy = sortFilter.value;

  const filtered = allProducts.filter((item) => {
    const name = localizeProduct(item, "name").toLowerCase();
    const description = localizeProduct(item, "description").toLowerCase();
    const categoryLabel = localizeProduct(item, "category").toLowerCase();
    const matchesQuery = !query ||
      name.includes(query) ||
      description.includes(query) ||
      categoryLabel.includes(query);
    const matchesCategory = category === "all" || item.category === category;
    return matchesQuery && matchesCategory;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") {
      return a.price - b.price;
    }

    if (sortBy === "price-high") {
      return b.price - a.price;
    }

    if (sortBy === "newest") {
      return String(b.id).localeCompare(String(a.id));
    }

    return Number(b.featured) - Number(a.featured);
  });

  renderProducts(sorted);
}

async function init() {
  const response = await fetch("/api/products");
  const data = await response.json();
  allProducts = Array.isArray(data.products) ? data.products : [];
  languageSwitcher.value = currentLanguage;
  applyStaticTranslations();
  renderProducts(allProducts);
}

searchInput.addEventListener("input", applyFilters);
categoryFilter.addEventListener("change", applyFilters);
sortFilter.addEventListener("change", applyFilters);
languageSwitcher.addEventListener("change", () => {
  currentLanguage = languageSwitcher.value;
  localStorage.setItem("site-language", currentLanguage);
  applyStaticTranslations();
  applyFilters();
});

init().catch(() => {
  emptyState.textContent = "Could not load products. Please try again later.";
  emptyState.classList.remove("hidden");
});
