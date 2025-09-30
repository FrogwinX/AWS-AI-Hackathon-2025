"use server";

export async function generateSchedule(tripSummary: string) {
  console.log("Generate Schedule from trip summary");
  console.log("Trip Summary: ", tripSummary);

  try {
    const response = await fetch(`${process.env.SCHEDULE_GENERATOR_API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chatInput: tripSummary,
      }),
    });

    if (!response.ok) {
      console.error(
        "Failed to generate schedule:",
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    console.log("Generated Schedule: ", data);
    
    // Return the first item's output if it's an array
    if (Array.isArray(data) && data.length > 0 && data[0].output) {
      return data[0].output;
    }
    
    return data.output;
  } catch (err: any) {
    console.error("Error generating schedule:", err);
    return null;
  }
}