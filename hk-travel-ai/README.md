# Hong Kong Travel AI Guide

An intelligent travel companion for exploring Hong Kong, powered by AI and built with Next.js.

## Features

- **Smart Travel Chat**: Get personalized recommendations for attractions, dining, and activities
- **Premium Guide Service**: Access detailed itineraries, reservations, and exclusive experiences  
- **Multi-language Support**: Available in English, Traditional Chinese, Simplified Chinese
- **Real-time Information**: Live updates on transportation, weather, and events
- **Cultural Insights**: Learn about local customs, hidden gems, and authentic experiences

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **AI Backend**: n8n workflow integration for intelligent responses
- **Deployment**: Docker containerization support

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- n8n workflow service (for AI backend)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hk-travel-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your n8n webhook URL
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) to see the Hong Kong Travel Guide.

### Docker Deployment

```bash
docker build -t hk-travel-ai .
docker run -p 3000:3000 hk-travel-ai
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
