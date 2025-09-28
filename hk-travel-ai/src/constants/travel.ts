export interface TravelGuideProps {
  guideType: "GENERAL" | "PREMIUM";
}

export const TRAVEL_GUIDES = (selectedGuide: TravelGuideProps) => {
  switch (selectedGuide.guideType) {
    case "GENERAL":
      return {
        guide: {
          initial: "HK",
          english: "Hong Kong Travel Guide",
          traditionalChinese: "香港旅遊指南",
          simplifiedChinese: "香港旅游指南",
        }
      };
    case "PREMIUM":
      return {
        guide: {
          initial: "HK Pro",
          english: "Hong Kong Premium Travel Guide",
          traditionalChinese: "香港高級旅遊指南",
          simplifiedChinese: "香港高级旅游指南",
        }
      };
  }
}