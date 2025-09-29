import { TravelGuideProps, TRAVEL_GUIDES } from "./travel";

export const LANGUAGES = {
  TRADITIONAL_CHINESE: { display: "繁", alias: "繁體中文" },
  SIMPLIFIED_CHINESE: { display: "简", alias: "简体中文" },
  ENGLISH: { display: "ENG", alias: "English" },
  ARABIC: { display: "AR", alias: "عربي" },
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
        "🎭 **文化體驗**\n" +
        "- 節慶活動、博物館和傳統文化\n\n" +
        "我隨時為您解答香港旅遊相關問題，讓您的香港之旅更加精彩！😊",
      suggestions: [
        "推薦香港必去景點",
        "香港美食推薦",
        "如何使用香港交通",
        "香港購物指南",
        "香港文化體驗",
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
        "🎭 **文化体验**\n" +
        "- 节庆活动、博物馆和传统文化\n\n" +
        "我随时为您解答香港旅游相关问题，让您的香港之旅更加精彩！😊",
      suggestions: [
        "推荐香港必去景点",
        "香港美食推荐",
        "如何使用香港交通",
        "香港购物指南",
        "香港文化体验",
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
        "🎭 **Cultural Experiences**\n" +
        "- Festivals, museums, and traditional culture\n\n" +
        "I'm here to answer all your Hong Kong travel questions and make your trip unforgettable! 😊",
      suggestions: [
        "Recommend must-visit attractions",
        "Hong Kong food recommendations",
        "How to use Hong Kong transport",
        "Hong Kong shopping guide",
        "Cultural experiences in Hong Kong",
      ],
    },
    ARABIC: {
      text:
        "مرحبًا بكم في هونغ كونغ! 👋 أنا مساعدكم الذكي لدليل السفر في هونغ كونغ.\nأنا هنا لتقديم معلومات شاملة عن السفر والسياحة:\n\n" +
        "🏛️ **دليل المعالم السياحية**\n" +
        "- الأماكن الشهيرة والكنوز المخفية\n\n" +
        "🍜 **دليل الطعام والمطاعم**\n" +
        "- المطاعم التقليدية ومطاعم ميشلان\n\n" +
        "🚇 **دليل المواصلات**\n" +
        "- المترو والحافلات والترام\n\n" +
        "🛍️ **دليل التسوق**\n" +
        "- المولات والأسواق والمتاجر المميزة\n\n" +
        "🎭 **التجارب الثقافية**\n" +
        "- المهرجانات والمتاحف والثقافة التقليدية\n\n" +
        "كيف يمكنني مساعدتك في رحلتك إلى هونغ كونغ اليوم؟ 😊",
      suggestions: [
        "أفضل المعالم السياحية في هونغ كونغ",
        "توصيات الطعام في هونغ كونغ",
        "كيفية استخدام المواصلات",
      ],
    },
  };
};
