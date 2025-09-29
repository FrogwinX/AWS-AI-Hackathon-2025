import { TravelGuideProps, TRAVEL_GUIDES } from "./travel";

export const SOLUTIONS = (selectedGuide: TravelGuideProps) => {
  const guideInfo = TRAVEL_GUIDES(selectedGuide).guide;
  return {
    travelChatbot: {
      title: `${guideInfo.initial} Travel AI Chatbot`
    },
    logic: {
      title: "Travel Guide Features and Capabilities",
      capabilities: ["1", "2", "3"],
      cards: [
        {
          title: "Intelligent Travel Assistant Architecture",
          content: "Our solution provides comprehensive Hong Kong travel guidance through specialized AI assistants:",
          architectureStep: [
            {
              number: 1,
              title: "Travel Preference Learning",
              description: `${guideInfo.initial} Travel AI learns your preferences and travel style`
            },
            {
              number: 2,
              title: "Real-time Information",
              description: "AI accesses current weather, events, transportation, and attraction status"
            },
            {
              number: 3,
              title: "Personalized Recommendations",
              description: "Receive tailored suggestions based on your interests and current location"
            },

            {
              number: 5,
              title: "Continuous Support",
              description: "24/7 travel assistance with multilingual support throughout your Hong Kong journey"
            }
          ]
        },
        {
          title: "Travel Guide Benefits",
          complianceSafeguards: [
            {
              icon: "map-marked-alt",
              title: "Local Expertise",
              description: "Access insider knowledge about Hong Kong's hidden gems, local customs, and authentic experiences beyond typical tourist spots."
            },
            {
              icon: "clock",
              title: "Real-time Updates",
              description: "Get live information about transportation delays, weather changes, event schedules, and attraction wait times."
            },
            {
              icon: "language",
              title: "Multilingual Support",
              description: "Communicate in English, Traditional Chinese, Simplified Chinese, or Arabic with seamless translation assistance."
            },
            {
              icon: "mobile-alt",
              title: "Offline Capability",
              description: "Download essential information for offline access, ensuring you're never lost even without internet connection."
            }
          ],
        }
      ],
      features: {
        title: "Features",
        items: [
          {
            feature: "Detailed Itinerary Planning",
            available: true,
            description: "Comprehensive trip planning with personalized recommendations"
          },
          {
            feature: "Restaurant Reservations",
            available: true,
            description: "Restaurant recommendations and booking assistance"
          },
          {
            feature: "Attraction Information",
            available: true,
            description: "Complete details about Hong Kong attractions and activities"
          },
          {
            feature: "Transportation Guidance",
            available: true,
            description: "Detailed public transport and navigation assistance"
          },
          {
            feature: "Emergency Assistance",
            available: true,
            description: "24/7 travel support and emergency guidance"
          },
          {
            feature: "Cultural Insights",
            available: true,
            description: "Deep cultural knowledge and local customs guidance"
          }
        ]
      }
    },
  }
};

export const KEY_CAPABILITIES = [
  {
    icon: "brain",
    title: "Smart Recommendations",
    description: "AI learns your preferences with 95% accuracy for personalized suggestions"
  },
  {
    icon: "bolt",
    title: "Real-time Updates",
    description: "Live data integration with <500ms response time for current information"
  },
  {
    icon: "chart-line",
    title: "Dynamic Routing",
    description: "Optimized travel routes increasing efficiency by 40%"
  },
  {
    icon: "globe",
    title: "Multi-lingual Support",
    description: "English, Traditional Chinese, Simplified Chinese, Arabic with real-time translation"
  }
];

export const STATS = [
  { value: "50%", label: "Planning Time Saved" },
  { value: "95%", label: "Recommendation Accuracy" },
  { value: "40%", label: "Route Efficiency" },
  { value: "24/7", label: "Support Availability" }
];

export const CHATBOT_FEATURES = {
  travel: [
    {
      title: "Local Expertise",
      description: "Get authentic Hong Kong experiences with insider knowledge about local customs, hidden gems, and cultural insights.",
      icon: "gavel"
    },
    {
      title: "Smart Recommendations",
      description: "Receive personalized suggestions based on your interests, budget, and travel style for attractions, dining, and activities.",
      icon: "bell"
    },
    {
      title: "Real-time Assistance",
      description: "Access live information about transportation, weather, events, and attraction status throughout your journey.",
      icon: "exchangeAlt"
    }
  ]
};