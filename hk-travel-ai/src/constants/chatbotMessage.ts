import { TravelGuideProps, TRAVEL_GUIDES } from "./travel";

export const LANGUAGES = {
  TRADITIONAL_CHINESE: { display: "繁", alias: "繁體中文" },
  SIMPLIFIED_CHINESE: { display: "简", alias: "简体中文" },
  ENGLISH: { display: "ENG", alias: "English" },
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_MESSAGES = (selectedGuide: TravelGuideProps) => {
  const guideInfo = TRAVEL_GUIDES(selectedGuide).guide;
  return {
    TRADITIONAL_CHINESE: {
      text:
        `歡迎來到香港！👋 我是您的${guideInfo.traditionalChinese}智能助手。\n` +
        "我將為您提供最全面的香港旅遊資訊和建議：\n\n" +
        "🏛️ **景點推薦**\n" +
        "- 熱門景點、隱世秘境和文化地標\n\n" +
        "🍜 **美食指南**\n" +
        "- 茶餐廳、米其林餐廳和街頭小食\n\n" +
        "🚇 **交通攻略**\n" +
        "- 地鐵、巴士、電車和渡輪指南\n\n" +
        "🛍️ **購物天堂**\n" +
        "- 商場、市集和特色店鋪推薦\n\n" +
        "🎭 **特別節目**\n" +
        "- 節慶活動、演唱會和各類限時活動\n\n" +
        "我隨時為您解答香港旅遊相關問題，讓您的香港之旅更加精彩！😊",
      suggestions: [
        "提供3日香港旅遊計劃",
        "推薦香港必去景點",
        "香港美食推薦",
        "香港購物指南",
        "香港限定節目",
      ],
    },
    SIMPLIFIED_CHINESE: {
      text:
        `欢迎来到香港！👋 我是您的${guideInfo.simplifiedChinese}智能助手。\n` +
        "我将为您提供最全面的香港旅游资讯和建议：\n\n" +
        "🏛️ **景点推荐**\n" +
        "- 热门景点、隐世秘境和文化地标\n\n" +
        "🍜 **美食指南**\n" +
        "- 茶餐厅、米其林餐厅和街头小食\n\n" +
        "🚇 **交通攻略**\n" +
        "- 地铁、巴士、电车和渡轮指南\n\n" +
        "🛍️ **购物天堂**\n" +
        "- 商场、市集和特色店铺推荐\n\n" +
        "🎭 **特别节目**\n" +
        "- 节庆活动、演唱会和各类限时活动\n\n" +
        "我随时为您解答香港旅游相关问题，让您的香港之旅更加精彩！😊",
      suggestions: [
        "提供3天香港旅游计划",
        "推荐香港必去景点",
        "香港美食推荐",
        "香港购物指南",
        "香港限定节目",
      ],
    },
    ENGLISH: {
      text:
        `Welcome to Hong Kong! 👋 I am your ${guideInfo.english} AI Assistant.\n` +
        "I'm here to provide comprehensive Hong Kong travel information and recommendations:\n\n" +
        "🏛️ **Attractions Guide**\n" +
        "- Popular spots, hidden gems, and cultural landmarks\n\n" +
        "🍜 **Food & Dining**\n" +
        "- Cha chaan tengs, Michelin restaurants, and street food\n\n" +
        "🚇 **Transportation**\n" +
        "- MTR, buses, trams, and ferry guides\n\n" +
        "🛍️ **Shopping Paradise**\n" +
        "- Malls, markets, and specialty stores\n\n" +
        "🎭 **Special Events*\n" +
        "- Festivals, concerts, and various limited-time events\n\n" +
        "I'm here to answer all your Hong Kong travel questions and make your trip unforgettable! 😊",
      suggestions: [
        "Plan a 3-day Hong Kong trip",
        "Recommend must-visit attractions",
        "Hong Kong food recommendations",
        "Hong Kong shopping guide",
        "Special experiences in Hong Kong",
      ],
    },
  };
};
