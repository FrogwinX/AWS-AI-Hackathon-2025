import { BankProps, BANKS } from "./bank";

export const LANGUAGES = {
  TRADITIONAL_CHINESE: { display: "繁", alias: "繁體中文" },
  SIMPLIFIED_CHINESE: { display: "简", alias: "简体中文" },
  ENGLISH: { display: "ENG", alias: "English" },
  ARABIC: { display: "AR", alias: "عربي" }
} as const;

export type Language = keyof typeof LANGUAGES;

export const DEFAULT_MESSAGES = (selectedBank: BankProps) => {
  const bankInfo = BANKS(selectedBank).bank;
  return {
    TRADITIONAL_CHINESE: {
      text:
        `尊敬的客戶，您好！👋 我是${bankInfo.traditionalChinese}智能助手 Finbot。\n` +
        "我們致力於為您提供精準的銀行資訊與金融市場分析：\n\n" +
        "🏦 **銀行產品資訊**\n" + `- 提供${bankInfo.traditionalChinese}產品服務詳解\n\n` +
        "🔍 **各類型股票研究**\n" + "- 深度解析個股基本面\n\n" +
        "📊 **專業圖表技術分析**\n" + "- 機構級市場趨勢判讀\n\n" +
        "📰 **精選財經快訊**\n" + "- 即時市場動態追蹤\n\n" +
        "⚡️ **AI 交易信號系統 (AO Summit)**\n" + "- 基於智能AI的投資策略建議\n\n" +
        "我隨時為您解答銀行和金融相關問題，助您做出明智決策。😊",
      suggestions: [
        "獲取最新市場新聞",
        "獲取 ? 股票圖表分析",
        `${bankInfo.traditionalChinese}最新消息`,
        `${bankInfo.traditionalChinese}產品服務介紹`,
        `${bankInfo.traditionalChinese}簡介`
      ]
    },
    SIMPLIFIED_CHINESE: {
      text:
        `尊敬的客户，您好！👋 我是${bankInfo.simplifiedChinese}智能助手 Finbot。\n` +
        "我们致力于为您提供精准的银行资讯与金融市场分析：\n\n" +
        "🏦 **银行产品资讯**\n" + `- 提供${bankInfo.simplifiedChinese}产品服务详解\n\n` +
        "🔍 **各类型股票研究**\n" + "- 深度解析个股基本面\n\n" +
        "📊 **专业图表技术分析**\n" + "- 机构级市场趋势判读\n\n" +
        "📰 **精选财经快讯**\n" + "- 即时市场动态追踪\n\n" +
        "⚡️ **AI 交易信号系统 (AO Summit)**\n" + "- 基于智能AI的投资策略建议\n\n" +
        "我随时为您解答银行和金融相关问题，助您做出明智决策。😊",
      suggestions: [
        "获取最新市场新闻",
        "获取 ? 股票图表分析",
        `${bankInfo.simplifiedChinese}最新消息`,
        `${bankInfo.simplifiedChinese}产品服务介绍`,
        `${bankInfo.simplifiedChinese}简介`
      ]
    },
    ENGLISH: {
      text:
        `Dear Valued Client, 👋 I am Finbot, your ${bankInfo.english} Intelligent Assistant.\n` +
        "We are committed to providing accurate banking information and financial market analysis:\n\n" +
        "🏦 **Banking Product Information**\n" + `- Detailed ${bankInfo.english} product services\n\n` +
        "🔍 **Multi-category Stock Research**\n" + "- In-depth fundamental analysis of individual stocks\n\n" +
        "📊 **Professional Chart Technical Analysis**\n" + "- Institutional-grade market trend interpretation\n\n" +
        "📰 **Curated Financial News**\n" + "- Real-time market dynamics tracking\n\n" +
        "⚡️ **AI Trading Signal System (AO Summit)**\n" + "- AI-driven investment strategy recommendations\n\n" +
        "I am available anytime to address banking and financial inquiries and support your informed decision-making.😊",
      suggestions: [
        "Access latest market news",
        "Get ? stock chart analysis",
        `${bankInfo.english} latest updates`,
        `${bankInfo.english} product services introduction`,
        `${bankInfo.english} overview`
      ]
    },
    /* Not Updated */
    ARABIC: {
      text:
        "مرحبًا! 👋 أنا آلجوبوت، مساعدك المالي المدعوم بالذكاء الاصطناعي!\nأنا متخصص في تقديم استخبارات السوق الدقيقة:\n\n" +
        "🔍 **تحليل أسهم شامل**\n" + "- رؤى متعمقة حول الأسهم\n\n" +
        "📊 **تحليل الرسوم البيانية الفنية**\n" + "- التعرف على الأنماط بمستوى احترافي\n\n" +
        "📰 **أخبار مالية منتقاة**\n" + "- تحديثات فورية لتحركات السوق\n\n" +
        "⚡️ **نظام إشارات التداول بالذكاء الاصطناعي (AO Summit)**\n" + "- توصيات ذكاء اصطناعي بمستوى مؤسسي\n\n" +
        "كيف يمكنني مساعدتك في بحثك الاستثماري اليوم؟ 😊",
      suggestions: [
        "الحصول على آخر أخبار السوق",
        "الحصول على تحليل رسم بياني لسهم ؟",
        "ما هو AO Summit"
      ]
    }
  }
};