# AWS-AI-Hackathon-2025

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
- API Key: `AIzaSyA6bsIsuNK-wHmRqsvqpR8R3KdvONsrAns`
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