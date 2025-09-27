import { BankProps, BANKS } from "./bank";

export const SOLUTIONS = (selectedBank: BankProps) => {
  const bankInfo = BANKS(selectedBank).bank;
  return {
    retailChatbot: {
      title: `${bankInfo.initial} Retail AI Chatbot`
    },
    wealthChatbot: {
      title: `${bankInfo.initial} Wealth AI Agent`,
      capabilities: ["Real-time News", "Personalization", "Multi-asset"],
    },
    hardware: {
      title: "Hardware Security Solutions",
      capabilities: ["ML-Powered", "IoT Protection", "Silent Design"],
      overview: {
        title: "Palo Alto PA-410 Next-Gen Firewall",
        description: "The world's first ML-powered NGFW designed to protect unknown threats, secure everything including IoT devices, and reduce errors with automatic policy recommendations."
      },
      cards: [
        {
          icon: "shield-alt",
          title: "Advanced Threat Protection",
          content: "Machine learning-powered security that identifies and blocks unknown threats before they can impact your infrastructure.",
          features: [
            "Real-time threat intelligence",
            "Automated policy recommendations",
            "Behavioral analytics"
          ]
        },
        {
          icon: "network-wired",
          title: "IoT & Infrastructure Security",
          content: "Comprehensive protection for all connected devices including IoT endpoints and legacy systems.",
          features: [
            "Full visibility into all devices",
            "Automated device classification",
            "Segmentation for IoT networks"
          ]
        },
        {
          icon: "cogs",
          title: "Professional Services",
          content: "Complete implementation and configuration services for seamless deployment.",
          features: [
            "On-premise hardware installation",
            "Customized configuration",
            "Initial policy setup",
            "Silent, fanless operation"
          ]
        }
      ]
    },
    security: {
      title: "Cybersecurity Solutions",
      capabilities: ["Assessment", "Response", "Protection"],
      cards: [
        {
          icon: "search",
          title: "Vulnerability Assessment",
          content: "Comprehensive security scanning of your staging environment to identify and prioritize vulnerabilities.",
          scope: "Thorough vulnerability scan using industry-standard tools",
          featureTitle: "Scope of Work:",
          features: [
            { icon: "tick", description: "Thorough vulnerability scan using industry-standard tools" },
            { icon: "tick", description: "Full coverage of all systems and applications" },
            { icon: "tick", description: "Detailed findings summary with risk ratings" },
            { icon: "tick", description: "Prioritized remediation recommendations" }
          ],
          deliverables: [
            "Detailed list of identified vulnerabilities",
            "Risk ratings for each vulnerability",
            "Recommended remediation steps",
            "Prioritization of actions based on risk levels"
          ],
          included: [
            "One-time vulnerability scan",
            "NTT staging environment",
            "Application server coverage"
          ],
          excluded: [
            "Ongoing monitoring",
            "Remediation efforts",
            "Environments outside NTT staging"
          ]
        },
        {
          icon: "headset",
          title: "Managed Detection & Response",
          content: "24/7 cybersecurity incident triage and response service with SentinelOne Vigilance.",
          featureTitle: "Service Features:",
          features: [
            { icon: "eye", description: "Continuous monitoring and alert management" },
            { icon: "filter", description: "False positive identification and filtering" },
            { icon: "shield", description: "Threat actor pattern analysis using S1 and sandbox platforms" },
            { icon: "exclamationTriangle", description: "Incident escalation to IR providers when necessary" },
            { icon: "clipboardList", description: "SOP-based SentinelOne operations" },
            { icon: "list", description: "Whitelist/Blacklist management" },
            { icon: "laptop", description: "Remote endpoint checking and remediation" }
          ],
          subscription: [
            "1-year subscription",
            "Supports as little as 1 workload/server",
            "Flexible scaling options"
          ]
        }
      ]
    },
    logic: {
      title: "Product Logic and Compliance",
      capabilities: ["1", "2", "3"],
      cards: [
        {
          title: "Compliant Chatbot Architecture",
          content: "Our solution addresses regulatory requirements by separating functionality between retail and wealth management chatbots:",
          architectureStep: [
            {
              number: 1,
              title: "Client Portfolio Monitoring",
              description: `${bankInfo.initial} Retail AI continuously monitors client portfolios and market news`
            },
            {
              number: 2,
              title: "Relevant Event Detection",
              description: "AI detects significant events for held stocks (earnings reports, news, price movements)"
            },
            {
              number: 3,
              title: "Client Notification",
              description: "Retail client receives notification with option to request RM advice"
            },
            {
              number: 4,
              title: "Request Escalation",
              description: `Request is sent to ${bankInfo.initial} Wealth AI with client context and relevant data`
            },
            {
              number: 5,
              title: "RM Advisory",
              description: "Relationship Manager receives request with AI-generated recommendations"
            }
          ]
        },
        {
          title: "Compliance Safeguards",
          complianceSafeguards: [
            {
              icon: "ban",
              title: "Recommendation Separation",
              description: "Investment recommendations are only provided through the Wealth AI platform to licensed relationship managers, never directly to retail clients."
            },
            {
              icon: "clipboard-check",
              title: "Audit Trails",
              description: "All client interactions and RM recommendations are fully logged with timestamps for compliance auditing."
            },
            {
              icon: "user-lock",
              title: "Client Protection",
              description: "Retail clients receive portfolio alerts without direct investment advice, eliminating compliance risk for the bank."
            },
            {
              icon: "file-contract",
              title: "Disclosure Automation",
              description: "All RM communications include required regulatory disclosures automatically appended by the system."
            }
          ],
        }
      ],
      features: {
        title: "Features",
        items: [
          {
            feature: "Stock Buy/Sell Recommendations",
            wealth: { available: true, text: "Full Details" },
            retail: { available: false, text: "Not Available" }
          },
          {
            feature: "Entry/Target/Stop Loss Pricing",
            wealth: { available: true, text: "Full Details" },
            retail: { available: false, text: "Not Available" }
          },
          {
            feature: "Portfolio-Linked News Alerts",
            wealth: { available: true, text: "Available" },
            retail: { available: true, text: "Available" }
          },
          {
            feature: "Bank Product Information",
            wealth: { available: true, text: "Full Details" },
            retail: { available: true, text: "Full Details" }
          },
          {
            feature: "Client Request Management",
            wealth: { available: true, text: "Process Responses" },
            retail: { available: true, text: "Initiate Requests" }
          },
          {
            feature: "Personalized Portfolio Insights",
            wealth: { available: true, text: "Advanced Analytics" },
            retail: { available: true, text: "Basic Overview" }
          }
        ]
      }
    },
  }
};

export const KEY_CAPABILITIES = [
  {
    icon: "brain",
    title: "Adaptive Memory",
    description: "Learns client behavior & risk profile with 92% suitability accuracy"
  },
  {
    icon: "bolt",
    title: "Quant + LLM Fusion",
    description: "Blends algorithms & real-time news in <700ms response time"
  },
  {
    icon: "chart-line",
    title: "Auto-Trade Catalyst",
    description: "Triggers personalized trades increasing volume by 33%"
  },
  {
    icon: "globe",
    title: "Multi-lingual Support",
    description: "English, Mandarin, Cantonese with real-time translation"
  }
];

export const STATS = [
  { value: "40%", label: "Admin Time Saved" },
  { value: "92%", label: "Suitability Accuracy" },
  { value: "33%", label: "Trade Volume Increase" },
  { value: "4%", label: "Return Improvement" }
];

export const CHATBOT_FEATURES = {
  retail: [
    {
      title: "Regulatory Compliance",
      description: "Retail clients receive portfolio alerts without direct investment advice, ensuring full compliance with financial regulations.",
      icon: "gavel"
    },
    {
      title: "Personalized Alerts",
      description: "Clients receive automated notifications about stocks they hold, with relevant news and market movements.",
      icon: "bell"
    },
    {
      title: "Seamless Escalation",
      description: "One-click connection to relationship managers for personalized advice when clients need it most.",
      icon: "exchangeAlt"
    }
  ],
  wealth: [
    {
      title: "Increased Productivity",
      description: "Reduce time spent on research by 40% with AI-generated recommendations and insights tailored to each client's portfolio.",
      icon: "chartLine"
    },
    {
      title: "Compliance Assurance",
      description: "All recommendations include required disclosures and are logged for audit purposes with timestamped client interactions.",
      icon: "shieldAlt"
    },
    {
      title: "Revenue Growth",
      description: "Identify 3x more revenue opportunities with AI-powered client portfolio analysis and timely investment signals.",
      icon: "moneyBillWave"
    }
  ]
};