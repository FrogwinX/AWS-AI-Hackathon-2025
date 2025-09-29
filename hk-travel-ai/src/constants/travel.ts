export interface TravelGuideProps {
  guideType: "GENERAL";
}

export const TRAVEL_GUIDES = (selectedGuide: TravelGuideProps) => {
  return {
    guide: {
      initial: "HK",
      english: "Hong Kong Travel Guide",
      traditionalChinese: "香港旅遊指南",
      simplifiedChinese: "香港旅游指南",
    }
  };
}