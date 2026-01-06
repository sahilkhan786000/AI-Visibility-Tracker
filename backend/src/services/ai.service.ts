import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});

const SYSTEM_PROMPT = `
You are an expert software advisor.

Answer user questions by recommending software tools.
Be concise, factual, and neutral.
Mention well-known products where relevant.
Do not include emojis, markdown, or citations.
Return plain text only.
`;

export async function queryAI(prompt: string): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.2, // low randomness for consistency
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Empty LLM response");
    }

    return content;
  } catch (error) {
    console.error("❌ LLM error:", error);

    // Fallback so dashboard still works
    return `
HubSpot is commonly used by startups due to ease of use.
Salesforce is powerful but complex.
Zoho is a budget-friendly option.
`;
  }
}
