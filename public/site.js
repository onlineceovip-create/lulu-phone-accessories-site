const STORAGE_KEY = "site-language";

const EXCHANGE_RATES = {
  USD: 1,
  CNY: 6.81,
  TZS: 2630.9308,
};

const COLLECTION_ALIAS = {
  solid: "simple",
};

export const COLLECTION_ORDER = ["simple", "luxury", "gradient", "pink"];

export const COLLECTIONS = {
  simple: {
    slug: "simple",
    names: { en: "Simple", zh: "简洁", sw: "Rahisi" },
    homeSummary: {
      en: "Clean lines, solid tones, and easy daily matching.",
      zh: "线条干净，颜色利落，日常也很好搭配。",
      sw: "Mistari safi, rangi rahisi, na muonekano mzuri wa kila siku.",
    },
    heroKicker: { en: "Lulu simple edit", zh: "Lulu 简洁精选", sw: "Lulu rahisi edit" },
    heroTitle: { en: "Simple iPhone cases", zh: "Lulu 简洁手机壳", sw: "Kava rahisi za Lulu" },
    heroSubtitle: {
      en: "Cleaner details, simpler colors, and a look that stays easy on the eyes.",
      zh: "细节更干净，颜色更直接，看起来也更舒服。",
      sw: "Muonekano safi, rangi tulivu, na hisia nyepesi machoni.",
    },
    intro: {
      en: "For everyday use, this collection keeps things direct, neat, and easy to choose from.",
      zh: "适合日常使用，这一页更直接、更整洁，也更容易选。",
      sw: "Kwa matumizi ya kila siku, mkusanyiko huu ni rahisi, safi, na rahisi kuchagua.",
    },
    coverImage: "https://wonderutopia.com/cdn/shop/files/01AA9123-CE34-4167-B8C7-7548DFC15272_7644c798-29ff-4c51-ade2-9c95bd37daa9.jpg?v=1770722319&width=533",
  },
  luxury: {
    slug: "luxury",
    names: { en: "Luxury", zh: "高级", sw: "Kifahari" },
    homeSummary: {
      en: "More texture, more detail, and more premium feeling.",
      zh: "质感更足，细节更多，看起来也更高级。",
      sw: "Muonekano wa juu zaidi, maelezo zaidi, na hisia ya kifahari.",
    },
    heroKicker: { en: "Lulu premium select", zh: "Lulu 高级精选", sw: "Lulu premium select" },
    heroTitle: { en: "Luxury iPhone cases", zh: "Lulu 高级手机壳", sw: "Kava za kifahari za Lulu" },
    heroSubtitle: {
      en: "Texture first, finish first, and the kind of cases that feel premium in hand.",
      zh: "更看重质感和做工，拿在手里更有高级感。",
      sw: "Hapa tunatanguliza ubora wa uso na hisia nzuri mkononi.",
    },
    intro: {
      en: "If you want the storefront to feel more premium, this collection does that fastest.",
      zh: "如果你想让整体感觉更高级，这一页最直接。",
      sw: "Ukihitaji muonekano wa juu zaidi, mkusanyiko huu ndio wa kwanza kuangalia.",
    },
    coverImage: "https://wonderutopia.com/cdn/shop/files/rn-image_picker_lib_temp_b683af4d-8408-42ab-a6be-5ca2355194f4.jpg?v=1770722341&width=533",
  },
  gradient: {
    slug: "gradient",
    names: { en: "Gradient", zh: "渐变", sw: "Gradient" },
    homeSummary: {
      en: "Softer shine, layered color, and more visual mood.",
      zh: "光泽更柔和，层次更明显，也更有氛围感。",
      sw: "Mwanga laini zaidi, tabaka za rangi, na hisia nzuri zaidi.",
    },
    heroKicker: { en: "Lulu glow series", zh: "Lulu 渐变系列", sw: "Lulu glow series" },
    heroTitle: { en: "Gradient iPhone cases", zh: "Lulu 渐变手机壳", sw: "Kava za gradient za Lulu" },
    heroSubtitle: {
      en: "More color layers, more glow, and more of that eye-catching finish.",
      zh: "层次感更强，颜色更柔和，也更容易让人一眼看到。",
      sw: "Tabaka za rangi zinaonekana zaidi na kuvutia macho haraka.",
    },
    intro: {
      en: "If you want something more photogenic and less plain, gradient works quickly.",
      zh: "如果你想要更出片、不那么单调，这一页会更适合。",
      sw: "Kwa muonekano wa kupendeza kwenye picha, gradient ni chaguo zuri sana.",
    },
    coverImage: "https://wonderutopia.com/cdn/shop/files/rn-image_picker_lib_temp_d6f3f783-9b6f-4fef-912e-614708de8b5b.jpg?v=1770722305&width=533",
  },
  pink: {
    slug: "pink",
    names: { en: "Pink", zh: "粉系", sw: "Pinki" },
    homeSummary: {
      en: "Softer tones, sweeter details, and the most playful picks.",
      zh: "更轻甜一点，也更有少女感。",
      sw: "Rangi laini zaidi na hisia za kike na tamu.",
    },
    heroKicker: { en: "Lulu pink select", zh: "Lulu 粉系精选", sw: "Lulu pink select" },
    heroTitle: { en: "Lulu pink iPhone cases", zh: "Lulu 粉系手机壳", sw: "Kava za pinki za Lulu" },
    heroSubtitle: {
      en: "Sweeter looks, softer colors, and ordering that feels more direct.",
      zh: "颜值更轻甜，下单也更直接。",
      sw: "Muonekano mtamu zaidi, rangi laini zaidi, na kuagiza kirahisi.",
    },
    intro: {
      en: "This is the softest collection in the store, built for cute details and lighter tones.",
      zh: "这是店里最轻甜的一页，适合喜欢可爱细节和柔和颜色的人。",
      sw: "Huu ndio mkusanyiko laini zaidi dukani, wenye rangi za kuvutia na maelezo mazuri.",
    },
    coverImage: "https://wonderutopia.com/cdn/shop/files/IMG_6492.jpg?v=1776334647&width=533",
  },
};

const translations = {
  en: {
    brandName: "Lulu",
    navHome: "Home",
    navCategories: "Categories",
    homeKicker: "Lulu curated phone case store",
    homeTitle: "Pick your style first, then enter the collection you like.",
    categoryKicker: "Shop by style",
    categoryTitle: "Four collections, four moods.",
    categorySubtitle: "Tap any category to open its own page with a different intro and matching products.",
    viewCollection: "Open collection",
    searchLabel: "Search",
    searchPlaceholder: "Search products...",
    sortLabel: "Sort by",
    sortFeatured: "Featured first",
    sortPriceLow: "Price: Low to High",
    sortPriceHigh: "Price: High to Low",
    sortNewest: "Newest",
    productsCountLabel: "products",
    emptyState: "No products match this filter right now.",
    orderButton: "Order on WhatsApp",
    defaultDescription: "Curated iPhone case with a clean look, stylish finish, and everyday protection.",
  },
  zh: {
    brandName: "Lulu",
    navHome: "首页",
    navCategories: "分类",
    homeKicker: "Lulu 手机壳小店",
    homeTitle: "先选风格，再进入你喜欢的那一页。",
    categoryKicker: "按风格选",
    categoryTitle: "四个分类，四种感觉。",
    categorySubtitle: "点进不同分类，会打开不同页面，也会看到不同介绍。",
    viewCollection: "进入分类",
    searchLabel: "搜索",
    searchPlaceholder: "搜索商品...",
    sortLabel: "排序",
    sortFeatured: "推荐优先",
    sortPriceLow: "价格从低到高",
    sortPriceHigh: "价格从高到低",
    sortNewest: "最新上架",
    productsCountLabel: "件商品",
    emptyState: "当前条件下暂时没有匹配商品。",
    orderButton: "WhatsApp 下单",
    defaultDescription: "精选 iPhone 手机壳，外观时尚，日常防护也很实用。",
  },
  sw: {
    brandName: "Lulu",
    navHome: "Nyumbani",
    navCategories: "Makundi",
    homeKicker: "Duka la Lulu la kava za simu",
    homeTitle: "Chagua mtindo kwanza, kisha ingia kwenye mkusanyiko unaopenda.",
    categoryKicker: "Nunua kwa mtindo",
    categoryTitle: "Makundi manne, hisia nne.",
    categorySubtitle: "Bonyeza kundi lolote kufungua ukurasa wake wenye utangulizi na bidhaa zinazolingana.",
    viewCollection: "Fungua kundi",
    searchLabel: "Tafuta",
    searchPlaceholder: "Tafuta bidhaa...",
    sortLabel: "Panga kwa",
    sortFeatured: "Zilizopendekezwa kwanza",
    sortPriceLow: "Bei: Ndogo kwenda Kubwa",
    sortPriceHigh: "Bei: Kubwa kwenda Ndogo",
    sortNewest: "Mpya zaidi",
    productsCountLabel: "bidhaa",
    emptyState: "Hakuna bidhaa zinazolingana na chaguo hili kwa sasa.",
    orderButton: "Agiza kwa WhatsApp",
    defaultDescription: "Kava ya iPhone iliyochaguliwa vizuri, yenye muonekano safi, mtindo mzuri, na ulinzi wa kila siku.",
  },
};

export function normalizeCollectionSlug(slug) {
  return COLLECTION_ALIAS[slug] || slug;
}

export function getLanguage() {
  return localStorage.getItem(STORAGE_KEY) || "en";
}

export function setLanguage(language) {
  localStorage.setItem(STORAGE_KEY, language);
}

export function t(key, language = getLanguage()) {
  return translations[language]?.[key] || translations.en[key] || key;
}

export function localizeText(map, language = getLanguage()) {
  return map?.[language] || map?.en || "";
}

export function getCollection(slug) {
  return COLLECTIONS[normalizeCollectionSlug(slug)] || null;
}

export function getCollectionLabel(slug, language = getLanguage()) {
  return localizeText(getCollection(slug)?.names, language) || slug;
}

export function formatCurrency(amount, language = getLanguage()) {
  const value = Number(amount || 0);

  if (language === "zh") {
    const roundedValue = Math.round((value * EXCHANGE_RATES.CNY) / 10) * 10;
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedValue);
  }

  if (language === "sw") {
    const roundedValue = Math.round((value * EXCHANGE_RATES.TZS) / 1000) * 1000;
    return `TZS ${new Intl.NumberFormat("en-TZ", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(roundedValue)}`;
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

function translateNameToChinese(name) {
  let result = String(name || "");
  const replacements = [
    [/for iPhone/gi, "适用于 iPhone"],
    [/iPhone Case/gi, "iPhone 手机壳"],
    [/Phone Case/gi, "手机壳"],
    [/Cute Girly\s*&\s*Korean Style/gi, "甜美韩系"],
    [/Cute girly/gi, "甜美"],
    [/Korean Style/gi, "韩系"],
    [/New INS/gi, "新款 INS"],
    [/Plain-Thin|Plain Thin/gi, "纯色轻薄"],
    [/Crystal/gi, "水晶"],
    [/Litchi Grein|Litchi Grain/gi, "荔枝纹"],
    [/Protective Cover/gi, "保护壳"],
    [/Full-Cover|Full Coverage/gi, "全包"],
    [/Camera Guard/gi, "镜头保护"],
    [/Anti-yellowing/gi, "抗发黄"],
    [/shockproof/gi, "防摔"],
    [/hard shell/gi, "硬壳"],
    [/aurora-style|Aurora/gi, "极光风"],
    [/Electroplated/gi, "电镀"],
    [/Patchwork/gi, "拼接"],
    [/Leather Texture|Leather Feel|Vegan-Leather/gi, "皮纹"],
    [/mirror/gi, "镜面"],
    [/glitter and rhinestone/gi, "闪钻"],
    [/glitter/gi, "闪粉"],
    [/rhinestone/gi, "水钻"],
    [/converter/gi, "转换"],
    [/Quick-Change|quick-change/gi, "快拆"],
    [/Diamond-studded/gi, "钻饰"],
    [/Silicone/gi, "硅胶"],
    [/Lens Cover/gi, "镜头盖"],
    [/Card Holder/gi, "插卡"],
    [/Minimalist/gi, "简约"],
    [/Original Color/gi, "原色"],
    [/Dark Red Gradient/gi, "暗红渐变"],
    [/Solid Color/gi, "纯色"],
    [/Fluffy/gi, "毛绒"],
    [/Kitty\s*&\s*Melody/gi, "Kitty 与 Melody"],
    [/CRAYON SHINCHAN/gi, "蜡笔小新"],
  ];

  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  result = result.replace(/\s{2,}/g, " ").replace(/\s*-\s*/g, " ").trim();
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
    [/glitter/gi, "ya glitter"],
    [/Quick-Change|quick-change/gi, "ya kubadilisha haraka"],
    [/Diamond-studded/gi, "yenye mapambo ya almasi"],
    [/Silicone/gi, "silicone"],
    [/Card Holder/gi, "yenye sehemu ya kadi"],
    [/Minimalist/gi, "rahisi"],
    [/Original Color/gi, "rangi halisi"],
    [/Solid Color/gi, "rangi moja"],
    [/Phone Case|case/gi, "kava"],
  ];

  replacements.forEach(([pattern, replacement]) => {
    result = result.replace(pattern, replacement);
  });

  result = result.replace(/\s{2,}/g, " ").trim();
  return /kava/i.test(result) ? result : `Kava ${result}`.trim();
}

export function localizeProduct(item, key, language = getLanguage()) {
  if (key === "category") {
    return getCollectionLabel(item.category, language);
  }

  const suffix = language === "zh" ? "Zh" : language === "sw" ? "Sw" : "";
  if (suffix && item[`${key}${suffix}`]) {
    return item[`${key}${suffix}`];
  }

  if (key === "description" && language !== "en") {
    return t("defaultDescription", language);
  }

  if (key === "name" && language === "zh") {
    return translateNameToChinese(item.name);
  }

  if (key === "name" && language === "sw") {
    return translateNameToSwahili(item.name);
  }

  return item[key] || "";
}

export function buildWhatsAppLink(number, productName, language = getLanguage()) {
  const prefix = language === "zh"
    ? `你好，我想咨询一下 ${productName}。`
    : language === "sw"
      ? `Habari, nataka kuulizia kuhusu ${productName}.`
      : `Hi, I want to ask about ${productName}.`;
  return `https://wa.me/${String(number || "").replace(/[^\d]/g, "")}?text=${encodeURIComponent(prefix)}`;
}
