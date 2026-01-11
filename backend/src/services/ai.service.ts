import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HF_API_KEY,
});


const SYSTEM_PROMPT = `
You are an expert software advisor.

Answer user questions by recommending and comparing well-known software tools.
Base your response on typical use cases, features, popularity, and adoption by teams.
If multiple tools are relevant, mention them neutrally.
Do not invent unknown or niche products.
Do not include emojis, markdown, or citations.
Return plain text only.
`;


function genericFallbackAnswer(category: string): string {
  return `
When evaluating ${category}, teams typically compare tools based on ease of use, core features, integrations, pricing, and scalability.

Different solutions may suit different use cases, such as small teams, growing startups, or larger organizations. The best choice often depends on team size, workflows, and specific requirements rather than a single universally best option.
`.trim();
}


export async function queryAI(prompt: string): Promise<string> {
  try {
    const completion = await client.chat.completions.create({
      model: "meta-llama/Llama-3.1-8B-Instruct:novita",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
      max_tokens: 500,
    });

    const content = completion.choices[0]?.message?.content?.trim();

    if (!content) {
      throw new Error("Empty LLM response");
    }

    return content;
  } catch (error) {
    console.error("LLM error:", error);

    return genericFallbackAnswer(prompt);
  }
}
