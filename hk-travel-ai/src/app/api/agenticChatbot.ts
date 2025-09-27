'use server';

export async function getChatbotMessage(
  formData: FormData,
) {

  console.log("Get Agentic Chatbot Message from n8n webhook");
  console.log("Form Data: ", formData);
  
  try {
    const response = await fetch(
      `${process.env.N8N_WEBHOOK_BASE_URL}`, 
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      console.error("Failed to get Agentic Chatbot Message from n8n webhook:", response.statusText);
      return "Sorry, I could not process that.";
    }
    const data = await response.json();
    console.log("Agentic Chatbot Message: ", data);
    return data;
  } catch (err: any) {
    console.error("Error getting Agentic Chatbot Message from n8n webhook:", err);
    return "Sorry, I could not process that.";
  }
};
