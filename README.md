# AWS AI Hackathon 2025

## Inspiration
Hong Kong, a dazzling metropolis where East meets West, pulses with vibrant energy, iconic skylines, and a rich tapestry of culture, cuisine, and adventure. Yet, with the growing trend of Hong Kongers venturing north for travel, the city’s tourism scene is craving a bold reboot. We saw an opportunity to rekindle the excitement of exploring Hong Kong by crafting a smart, personalized AI-powered travel companion that showcases the city’s unique charm and endless possibilities.

## What it does
Our Hong Kong Travel AI Agent is your ultimate guide to unlocking the best of the city. It:
1. **Crafts Personalized Itineraries**: Tailors Hong Kong travel plans based on user preferences, from savoring dim sum to hiking scenic trails.
2. **Answers Any HK-Related Query**: Provides instant, accurate responses to questions about attractions, dining, transportation, and more.
3. **Displays Editable Schedules**: Presents trip plans in an interactive, user-friendly planner that allows seamless edits for a customized experience.

## How we built it
We combined cutting-edge AI and modern web development to bring this vision to life:
1. **n8n for the AI Agent**:
- Powered by the Google Gemini 2.5 Flash Model (accessed via a proxy server), our AI Agent intelligently processes user queries.
- Integrated with specialized tools to fetch real-time data, including:

  - DiscoverHongKong for attractions, dining, and shopping insights.
  - Hong Kong Observatory (HKO) for weather updates.
  - Google Maps for transportation details.

- The Agent analyzes user inputs, selects the appropriate tools, and weaves the data into cohesive trip plans or conversational answers.

2. **React TypeScript Web Interface (Built with Amazon Q Developer)**:
- A sleek, responsive web app featuring:

  - An Introduction Panel to welcome users and highlight Hong Kong’s allure.
  - A Chatbot Panel supporting English, Traditional Chinese, and Simplified Chinese, complete with suggested questions for ease of use.
  - A Trip Planner Panel to visualize and edit AI-generated itineraries.

- Workflow: Users input queries in the chatbot, which triggers the n8n workflow API. The AI’s response is displayed in the chatbot, and if it’s a trip plan, the planner panel updates automatically.

## Challenges we ran into
Building this AI Agent wasn’t without its hurdles:
- **Model Selection**: Balancing processing speed, cost, and minimizing AI hallucinations required careful evaluation.
- **Data Source Limitations**: Finding reliable, comprehensive data sources for Hong Kong’s tourism ecosystem was a challenge.
- **Data Processing**: Pre- and post-processing data for the Agent’s tools demanded precision to ensure accuracy.
- **System Compatibility**: Aligning the Agent’s system prompts, tools, memory, and the baseline LLM model was a complex puzzle.
- **n8n-Web Integration**: Ensuring seamless communication between the n8n workflow and the React web app required meticulous API matching.

## Accomplishments that we're proud of
We’re thrilled with what we’ve achieved:
- The AI generates surprisingly thoughtful and practical travel plans that rival human-crafted itineraries.
- Amazon Q Developer enabled us to rapidly prototype a polished, user-friendly web interface, accelerating our development process.

## What we learned
This journey was a masterclass in innovation:
- **AI Agent Principles**: We mastered workflows, tool integration, and model optimization for building intelligent agents.
- **Prompt Engineering**: Crafting precise prompts for both the AI Agent and Amazon Q Developer unlocked powerful results.
- **Data Processing & API Integration**: We honed skills in handling data and ensuring seamless API communication.
- **Web Development**: Building a dynamic React TypeScript app leveled up our front-end expertise.

## What's next
The adventure doesn’t stop here! Our roadmap includes:
- **Faster Responses**: Optimizing the AI to deliver near-instantaneous answers.
- **Audio Input**: Enabling voice-based queries for a hands-free experience.
- **External Tool Integration**: Connecting to platforms like Google Calendar or restaurant booking systems via MCP for a fully integrated travel solution.
- **Deployment**: Bringing our AI Agent to the world, making Hong Kong exploration effortless for travelers everywhere.

#
# Developer Guidelines

## Running n8n
1. `git clone` this repo
2. `cd` into `/n8n/` and run `npx n8n` (install NodeJS first)
3. You should able to access to n8n editor on `http://localhost:5678`
4. Create your account and empty worflows, import the workflows from `/n8n workflows/`

## Connecting and Testing AI Model
The current AI model is Google Gemini 2.5 Flash
1. Open any Google Gemini Chat Model node on n8n
2. Create New Credential with the following info:
- Host: `https://gemini-proxy-snowy-two.vercel.app`
You can also create your own API Key by visiting Google AI Studio `https://aistudio.google.com/api-keys` with VPN
3. You probably would see `Couldn’t connect with these settings` but it's fine. Back to the node and select the only option `models/gemini-2.5-flash`
4. To test the connection, you can go to `Get Weather Info` workflow, hover the entry node and click `Execute workflow` to run workflow with pinned input; You can replace the entry node by `Chat Trigger` and test the AI with your own chat messages

## n8n Workflows
1. The top-level workflow is `HK Travel AI`, where it takes in user queries, makes decisions to call necessary tools and output the responses
2. The tools are all subflows with another Agent that aims to tackle smaller tasks (process the information):
- Get Accommodation Info
- Get Attraction Info
- Get Food Info
- Get Shopping Info
- Get Special Events Info
- Get Transportation Info
- Get Weather Info
3. You need to define the prompts of the agent so that it knows what to do with its tools. In here, the tools can be HHTP request or subsub-workflow with node `Extract from File`. You also need to find data for AI to read

## Data APIs
I've found some APIs from HK Tourism Board and organized into Postman Collection: [https://speeding-firefly-741863.postman.co/workspace/Team-Workspace~c02d6a7d-537d-47ae-88bb-fc63c201e39b/collection/48537726-2d152d09-622b-4048-86c9-9d1c36b1467a?action=share&creator=48537726](https://speeding-firefly-741863.postman.co/workspace/Team-Workspace~c02d6a7d-537d-47ae-88bb-fc63c201e39b/collection/48537726-2d152d09-622b-4048-86c9-9d1c36b1467a?action=share&creator=48537726)

For shopping, food, accommodation APIs, the GET request params are similar. 
1. `page` indicates which page of records it will extract (1 page containing 10 records)
2. Other params are used to filter the data. All the options are listed there and you need to match the key-values exactly
3. For multiple params, you need to repeat the same key for each key-value pair

## Web Chatbot Interface
The web is built usig React.ts for UI, TailwindCSS for styling, and Next.ts for routing
1. `cd` into `/hk-travel-ai/`
2. run `npm install` and `npm run dev` (install NodeJS first)
3. You should able to access to web on `http://localhost:3000`
4. If n8n is running, the `HK Travel AI` workflow is connected to the webhook with url `http://localhost:5678/webhook/travel-ai` and activated, you should be able to use the chatbot
