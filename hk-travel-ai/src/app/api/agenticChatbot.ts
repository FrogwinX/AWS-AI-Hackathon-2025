"use server";

export async function getChatbotMessage(formData: FormData) {
  console.log("Get Agentic Chatbot Message from n8n webhook");
  console.log("Form Data: ", formData);

  try {
    const response = await fetch(`${process.env.N8N_WEBHOOK_BASE_URL}`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      console.error(
        "Failed to get Agentic Chatbot Message from n8n webhook:",
        response.statusText
      );
      return "Sorry, I could not process that.";
    }
    const data = await response.json();
    console.log("Agentic Chatbot Message: ", data);
    return data;
    // // Process the response to ensure it has the expected format
    // if (typeof data === "string") {
    //   return { output: data };
    // }

    // if (data && typeof data === "object") {
    //   // If data has an output field, use it
    //   if (data.output) {
    //     return {
    //       output:
    //         typeof data.output === "string"
    //           ? data.output
    //           : JSON.stringify(data.output),
    //       question: data.question || null,
    //     };
    //   }

    //   // If data is an array, join the elements
    //   if (Array.isArray(data)) {
    //     return {
    //       output: data
    //         .map((item) =>
    //           typeof item === "string" ? item : JSON.stringify(item)
    //         )
    //         .join("\n"),
    //     };
    //   }

    //   // If data has other fields that might contain the response
    //   if (data.message || data.response || data.text) {
    //     const output = data.message || data.response || data.text;
    //     return {
    //       output: typeof output === "string" ? output : JSON.stringify(output),
    //       question: data.question || null,
    //     };
    //   }

    //   // Fallback: stringify the entire object
    //   return {
    //     output: JSON.stringify(data),
    //   };
    // }

    // return { output: "Sorry, I could not process that." };
  } catch (err: any) {
    console.error(
      "Error getting Agentic Chatbot Message from n8n webhook:",
      err
    );
    return "Sorry, I could not process that.";
  }
}
