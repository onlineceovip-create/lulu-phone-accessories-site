const loadButton = document.getElementById("loadButton");
const addButton = document.getElementById("addButton");
const saveButton = document.getElementById("saveButton");
const editorList = document.getElementById("editorList");
const statusMessage = document.getElementById("statusMessage");
const usernameInput = document.getElementById("usernameInput");
const passwordInput = document.getElementById("passwordInput");
const adminLanguageSwitcher = document.getElementById("adminLanguageSwitcher");

let products = [];
let adminLanguage = localStorage.getItem("site-language") || "en";

const adminTranslations = {
  en: {
    pageTitle: "Manage Products",
    adminEyebrow: "Admin",
    adminTitle: "Manage your storefront",
    adminIntro: "Use this page to update products, price, stock, featured status and WhatsApp contact. Saving here updates the product data file used by the shop page.",
    defaultLogin: "Default login",
    usernameLabel: "Username",
    passwordLabel: "Password",
    languageLabel: "Language",
    adminHelpNote: "You can change them with environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD` before starting the server.",
    backToStore: "Back To Store",
    loadProducts: "Load Products",
    addProduct: "Add Product",
    saveChanges: "Save Changes",
    loadingProducts: "Loading products...",
    loginFailed: "Login failed or products could not be loaded.",
    loadedProducts: "Loaded {count} products.",
    savingChanges: "Saving changes...",
    saveFailed: "Could not save products.",
    savedProducts: "Saved {count} products successfully.",
    newRowAdded: "New product row added.",
    productRemoved: "Product removed from the list.",
    productLabel: "Product",
    deleteLabel: "Delete",
    yesLabel: "Yes",
    noLabel: "No",
  },
  zh: {
    pageTitle: "管理商品",
    adminEyebrow: "后台",
    adminTitle: "管理你的店铺页面",
    adminIntro: "你可以在这里修改商品、价格、库存、推荐状态和 WhatsApp 联系方式。保存后，前台商品页会同步更新。",
    defaultLogin: "默认登录信息",
    usernameLabel: "用户名",
    passwordLabel: "密码",
    languageLabel: "语言",
    adminHelpNote: "启动服务前，你也可以通过环境变量 `ADMIN_USERNAME` 和 `ADMIN_PASSWORD` 修改登录信息。",
    backToStore: "返回商城",
    loadProducts: "加载商品",
    addProduct: "新增商品",
    saveChanges: "保存修改",
    loadingProducts: "正在加载商品...",
    loginFailed: "登录失败，或商品数据加载失败。",
    loadedProducts: "已加载 {count} 件商品。",
    savingChanges: "正在保存修改...",
    saveFailed: "商品保存失败。",
    savedProducts: "已成功保存 {count} 件商品。",
    newRowAdded: "已新增一条商品记录。",
    productRemoved: "已从列表中删除该商品。",
    productLabel: "商品",
    deleteLabel: "删除",
    yesLabel: "是",
    noLabel: "否",
  },
  sw: {
    pageTitle: "Simamia Bidhaa",
    adminEyebrow: "Admin",
    adminTitle: "Simamia storefront yako",
    adminIntro: "Tumia ukurasa huu kusasisha bidhaa, bei, stock, hali ya featured na mawasiliano ya WhatsApp. Ukihifadhi hapa, data ya shop page inasasishwa pia.",
    defaultLogin: "Taarifa za kuingia za kawaida",
    usernameLabel: "Jina la mtumiaji",
    passwordLabel: "Nenosiri",
    languageLabel: "Lugha",
    adminHelpNote: "Unaweza kubadilisha haya kwa environment variables `ADMIN_USERNAME` na `ADMIN_PASSWORD` kabla ya kuwasha server.",
    backToStore: "Rudi Dukani",
    loadProducts: "Pakia Bidhaa",
    addProduct: "Ongeza Bidhaa",
    saveChanges: "Hifadhi Mabadiliko",
    loadingProducts: "Inapakia bidhaa...",
    loginFailed: "Uingizaji umeshindikana au bidhaa hazikupatikana.",
    loadedProducts: "Bidhaa {count} zimepakiwa.",
    savingChanges: "Inahifadhi mabadiliko...",
    saveFailed: "Imeshindikana kuhifadhi bidhaa.",
    savedProducts: "Bidhaa {count} zimehifadhiwa vizuri.",
    newRowAdded: "Safu mpya ya bidhaa imeongezwa.",
    productRemoved: "Bidhaa imeondolewa kwenye orodha.",
    productLabel: "Bidhaa",
    deleteLabel: "Futa",
    yesLabel: "Ndiyo",
    noLabel: "Hapana",
  },
};

function at(key) {
  return adminTranslations[adminLanguage][key] || adminTranslations.en[key] || key;
}

function adminText(template, values = {}) {
  return template.replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
}

function setStatus(message, isError = false) {
  statusMessage.textContent = message;
  statusMessage.style.color = isError ? "#a83d18" : "#2d6a4f";
}

function createField(label, value, type = "text") {
  if (type === "textarea") {
    return `
      <label>
        <span>${label}</span>
        <textarea data-field="${label}">${value || ""}</textarea>
      </label>
    `;
  }

  return `
    <label>
      <span>${label}</span>
      <input data-field="${label}" type="${type}" value="${value ?? ""}" />
    </label>
  `;
}

function renderEditors() {
  editorList.innerHTML = products.map((item, index) => `
    <article class="editor-card" data-index="${index}">
      <div class="editor-head">
        <h3>${item.name || `${at("productLabel")} ${index + 1}`}</h3>
        <button class="inline-button" data-action="remove" type="button">${at("deleteLabel")}</button>
      </div>
      <div class="editor-grid">
        ${createField("id", item.id)}
        ${createField("name", item.name)}
        ${createField("nameZh", item.nameZh)}
        ${createField("nameSw", item.nameSw)}
        ${createField("category", item.category)}
        ${createField("categoryZh", item.categoryZh)}
        ${createField("categorySw", item.categorySw)}
        ${createField("price", item.price, "number")}
        ${createField("compareAtPrice", item.compareAtPrice, "number")}
        ${createField("stock", item.stock, "number")}
        ${createField("badge", item.badge)}
        ${createField("badgeZh", item.badgeZh)}
        ${createField("badgeSw", item.badgeSw)}
        ${createField("rating", item.rating, "number")}
        ${createField("reviews", item.reviews, "number")}
        ${createField("whatsapp", item.whatsapp)}
        ${createField("image", item.image)}
        <label>
          <span>featured</span>
          <select data-field="featured">
            <option value="true" ${item.featured ? "selected" : ""}>${at("yesLabel")}</option>
            <option value="false" ${!item.featured ? "selected" : ""}>${at("noLabel")}</option>
          </select>
        </label>
      </div>
      ${createField("description", item.description, "textarea")}
      ${createField("descriptionZh", item.descriptionZh, "textarea")}
      ${createField("descriptionSw", item.descriptionSw, "textarea")}
    </article>
  `).join("");
}

function authHeaders() {
  const token = btoa(`${usernameInput.value}:${passwordInput.value}`);
  return {
    Accept: "application/json",
    Authorization: `Basic ${token}`,
  };
}

function collectEditors() {
  products = [...editorList.querySelectorAll(".editor-card")].map((card) => {
    const fields = {};
    card.querySelectorAll("[data-field]").forEach((input) => {
      fields[input.dataset.field] = input.value;
    });

    return {
      id: fields.id,
      name: fields.name,
      nameZh: fields.nameZh,
      nameSw: fields.nameSw,
      category: fields.category,
      categoryZh: fields.categoryZh,
      categorySw: fields.categorySw,
      price: Number(fields.price || 0),
      compareAtPrice: Number(fields.compareAtPrice || 0),
      stock: Number(fields.stock || 0),
      badge: fields.badge,
      badgeZh: fields.badgeZh,
      badgeSw: fields.badgeSw,
      rating: Number(fields.rating || 0),
      reviews: Number(fields.reviews || 0),
      whatsapp: fields.whatsapp,
      image: fields.image,
      featured: fields.featured === "true",
      description: fields.description,
      descriptionZh: fields.descriptionZh,
      descriptionSw: fields.descriptionSw,
    };
  });
}

async function loadProducts() {
  setStatus(at("loadingProducts"));
  const response = await fetch("/api/admin/products", { headers: authHeaders() });
  if (!response.ok) {
    throw new Error(at("loginFailed"));
  }
  const data = await response.json();
  products = Array.isArray(data.products) ? data.products : [];
  renderEditors();
  setStatus(adminText(at("loadedProducts"), { count: products.length }));
}

async function saveProducts() {
  collectEditors();
  setStatus(at("savingChanges"));
  const response = await fetch("/api/admin/products", {
    method: "POST",
    headers: {
      ...authHeaders(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ products }),
  });

  if (!response.ok) {
    throw new Error(at("saveFailed"));
  }

  const result = await response.json();
  setStatus(adminText(at("savedProducts"), { count: result.count }));
  renderEditors();
}

function applyAdminTranslations() {
  document.documentElement.lang = adminLanguage;
  document.title = at("pageTitle");
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = at(node.dataset.i18n);
  });
  adminLanguageSwitcher.value = adminLanguage;
  if (products.length) {
    renderEditors();
  }
}

loadButton.addEventListener("click", () => {
  loadProducts().catch((error) => setStatus(error.message, true));
});

addButton.addEventListener("click", () => {
  products.push({
    id: `item-${Date.now()}`,
    name: "",
    category: "",
    price: 0,
    compareAtPrice: 0,
    stock: 0,
    badge: "",
    badgeZh: "",
    badgeSw: "",
    nameZh: "",
    nameSw: "",
    categoryZh: "",
    categorySw: "",
    rating: 5,
    reviews: 0,
    whatsapp: "+255700000000",
    image: "",
    featured: false,
    description: "",
    descriptionZh: "",
    descriptionSw: "",
  });
  renderEditors();
  setStatus(at("newRowAdded"));
});

saveButton.addEventListener("click", () => {
  saveProducts().catch((error) => setStatus(error.message, true));
});

editorList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action='remove']");
  if (!button) {
    return;
  }

  const card = button.closest(".editor-card");
  const index = Number(card.dataset.index);
  products.splice(index, 1);
  renderEditors();
  setStatus(at("productRemoved"));
});

adminLanguageSwitcher.addEventListener("change", () => {
  adminLanguage = adminLanguageSwitcher.value;
  localStorage.setItem("site-language", adminLanguage);
  applyAdminTranslations();
});

applyAdminTranslations();
