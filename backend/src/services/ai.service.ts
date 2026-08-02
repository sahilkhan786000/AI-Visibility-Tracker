// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const client = new OpenAI({
//   baseURL: "https://router.huggingface.co/v1",
//   apiKey: process.env.HF_API_KEY,
// });


// const SYSTEM_PROMPT = `
// You are an expert software advisor.

// Answer user questions by recommending and comparing well-known software tools.
// Base your response on typical use cases, features, popularity, and adoption by teams.
// If multiple tools are relevant, mention them neutrally.
// Do not invent unknown or niche products.
// Do not include emojis, markdown, or citations.
// Return plain text only.
// `;


// function genericFallbackAnswer(category: string): string {
//   return `
// When evaluating ${category}, teams typically compare tools based on ease of use, core features, integrations, pricing, and scalability.

// Different solutions may suit different use cases, such as small teams, growing startups, or larger organizations. The best choice often depends on team size, workflows, and specific requirements rather than a single universally best option.
// `.trim();
// }


// export async function queryAI(prompt: string): Promise<string> {
//   try {
//     const completion = await client.chat.completions.create({
//       model: "meta-llama/Llama-3.1-8B-Instruct:novita",
//       messages: [
//         { role: "system", content: SYSTEM_PROMPT },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.2,
//       max_tokens: 500,
//     });

//     const content = completion.choices[0]?.message?.content?.trim();

//     if (!content) {
//       throw new Error("Empty LLM response");
//     }

//     return content;
//   } catch (error) {
//     console.error("LLM error:", error);

//     return genericFallbackAnswer(prompt);
//   }
// }


import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

/**
 * ---------------------------------------------------------
 * Configuration
 * ---------------------------------------------------------
 */

const HF_API_KEY = process.env.HF_API_KEY;

if (!HF_API_KEY) {
  throw new Error(
    "HF_API_KEY is missing. Add HF_API_KEY to your .env file."
  );
}

const client = new OpenAI({
  baseURL: "https://router.huggingface.co/v1",
  apiKey: HF_API_KEY,
});

const MODEL = "meta-llama/Llama-3.1-8B-Instruct:novita";

/**
 * ---------------------------------------------------------
 * System prompt for answering visibility questions
 * ---------------------------------------------------------
 *
 * IMPORTANT:
 *
 * This prompt is domain-independent.
 *
 * The category could be:
 *
 * Running Shoes
 * CRM Software
 * Universities
 * Hotels
 * Cars
 * Smartphones
 * Banks
 * Insurance
 * Restaurants
 * Fashion
 * Travel destinations
 * etc.
 */

const ANSWER_SYSTEM_PROMPT = `
You are a knowledgeable research and recommendation assistant.

Answer the user's question naturally and independently.

The question may be about any category, industry, product, service,
company, organization, institution, destination, or domain.

When answering:

- Recommend relevant and well-known options when appropriate.
- Mention multiple options when multiple options are relevant.
- Explain recommendations briefly.
- Compare alternatives when the question asks for comparison.
- Consider common factors such as quality, popularity, reliability,
  affordability, features, reputation, and suitability when relevant.
- Do not assume the question is about software or technology.
- Do not force specific brands into the answer.
- Do not invent unknown brands, companies, products, or organizations.
- Stay neutral and informative.
- Do not include citations unless specifically requested.
- Return plain text only.

Answer as if a normal user asked you the question.
`;

/**
 * ---------------------------------------------------------
 * Query AI
 * ---------------------------------------------------------
 *
 * Used AFTER questions have been generated.
 *
 * Example:
 *
 * queryAI(
 *   "Which running shoes are good for beginners?"
 * )
 *
 */

export async function queryAI(
  prompt: string
): Promise<string> {
  if (!prompt || !prompt.trim()) {
    throw new Error("Prompt cannot be empty");
  }

  try {
    const completion =
      await client.chat.completions.create({
        model: MODEL,

        messages: [
          {
            role: "system",
            content: ANSWER_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: prompt.trim(),
          },
        ],

        /**
         * Keep temperature relatively low because
         * visibility measurements should be reasonably
         * consistent between requests.
         */
        temperature: 0.3,

        max_tokens: 700,
      });

    const content =
      completion.choices[0]?.message?.content;

    if (
      typeof content !== "string" ||
      !content.trim()
    ) {
      throw new Error(
        "AI returned an empty response"
      );
    }

    return content.trim();
  } catch (error) {
    console.error(
      "AI query error:",
      error
    );

    /**
     * IMPORTANT:
     *
     * Do NOT return a generic fallback answer.
     *
     * Suppose Nike is being measured and the AI
     * request fails.
     *
     * Returning a generic answer would make our
     * analysis think:
     *
     * Nike = not mentioned
     *
     * But the actual result is:
     *
     * AI request = failed
     *
     * The controller uses Promise.allSettled(),
     * so failed requests can safely be ignored.
     */

    throw error;
  }
}

/**
 * ---------------------------------------------------------
 * Generate Questions With AI
 * ---------------------------------------------------------
 *
 * This generates visibility/discovery questions dynamically.
 *
 * IMPORTANT:
 *
 * ONLY category is passed here.
 *
 * Brands are intentionally NOT passed.
 *
 * Example:
 *
 * category:
 *
 * "Running Shoes"
 *
 * AI might generate:
 *
 * "What are good running shoes for beginners?"
 * "Which running shoes are best for long distances?"
 * "What affordable running shoes offer good quality?"
 *
 */

export async function generateQuestionsWithAI(
  category: string,
  count: number = 12
): Promise<string[]> {
  /**
   * Validate category.
   */

  if (
    typeof category !== "string" ||
    !category.trim()
  ) {
    throw new Error(
      "Category cannot be empty"
    );
  }

  /**
   * Validate count.
   *
   * Keep it between 1 and 20.
   */

  const questionCount =
    Number.isFinite(count)
      ? Math.min(
          Math.max(
            Math.floor(count),
            1
          ),
          20
        )
      : 12;

  const normalizedCategory =
    category.trim();

  /**
   * -------------------------------------------------------
   * Question Generator System Prompt
   * -------------------------------------------------------
   */

  const systemPrompt = `
You generate realistic questions that people would naturally ask an AI assistant
when researching a category.

These questions will be used to measure how visible different brands,
companies, products, services, organizations, institutions, destinations,
or other entities are in AI-generated answers.

The category may belong to ANY domain.

Examples include:

- software
- technology
- consumer products
- footwear
- automobiles
- restaurants
- food
- travel
- hotels
- education
- universities
- banking
- insurance
- fashion
- electronics
- business services
- entertainment
- healthcare services
- home products
- fitness
- sports
- beauty
- real estate
- professional services

Your job is to generate diverse and realistic discovery questions.

IMPORTANT RULES:

1. Do not assume the category is software or technology.

2. Do not mention specific brands, companies, products,
   organizations, or competitors unless a name is already
   part of the category itself.

3. Questions must sound like things real users might ask
   an AI assistant while researching the category.

4. Cover different user intents.

Possible intents include:

- general discovery
- recommendations
- best options
- comparison
- affordability
- value for money
- quality
- popularity
- reliability
- different use cases
- beginners
- experienced users
- professionals
- small businesses
- enterprises
- premium options
- budget options
- alternatives

Use only intents that make sense for the supplied category.

For example, do not generate "small business" questions for
running shoes simply because that intent appears in this list.

5. Generate meaningful variation.

Do not simply rewrite the same question multiple times.

BAD:

"What are the best running shoes?"
"Which running shoes are best?"
"What running shoes are the best?"

GOOD:

"What running shoes are good for beginners?"
"Which running shoes work well for long-distance training?"
"What affordable running shoes offer good durability?"

6. Do not make every question start with "What is the best".

7. Each question must be understandable without additional context.

8. Do not answer the questions.

9. Return ONLY valid JSON.

Do not include:

- markdown
- code fences
- explanations
- introductions
- comments

The JSON format must be:

{
  "questions": [
    "question 1",
    "question 2"
  ]
}
`;

  /**
   * -------------------------------------------------------
   * User Prompt
   * -------------------------------------------------------
   */

  const userPrompt = `
Category: ${normalizedCategory}

Generate ${questionCount} diverse questions that users might naturally
ask an AI assistant while researching this category.

Do not mention specific brands.

Return only JSON using this structure:

{
  "questions": [
    "...",
    "..."
  ]
}
`;

  try {
    /**
     * -----------------------------------------------------
     * Call Hugging Face model
     * -----------------------------------------------------
     */

    const completion =
      await client.chat.completions.create({
        model: MODEL,

        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],

        /**
         * Higher than queryAI() because we want
         * diversity when generating questions.
         */
        temperature: 0.6,

        max_tokens: 1200,
      });

    const content =
      completion.choices[0]?.message?.content;

    if (
      typeof content !== "string" ||
      !content.trim()
    ) {
      throw new Error(
        "AI returned an empty question generation response"
      );
    }

    /**
     * -----------------------------------------------------
     * Clean response
     * -----------------------------------------------------
     *
     * Sometimes LLMs return:
     *
     * ```json
     * {
     *   "questions": [...]
     * }
     * ```
     *
     * Even though we asked for JSON only.
     *
     * Remove the markdown fences.
     */

    const cleanedContent =
      content
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();

    /**
     * -----------------------------------------------------
     * Parse JSON
     * -----------------------------------------------------
     *
     * Treat external LLM data as unknown.
     *
     * We don't trust:
     *
     * const parsed = JSON.parse(...) as SomeType
     *
     * because the model could return unexpected data.
     */

    const parsed: unknown =
      JSON.parse(cleanedContent);

    /**
     * -----------------------------------------------------
     * Validate root object
     * -----------------------------------------------------
     */

    if (
      typeof parsed !== "object" ||
      parsed === null
    ) {
      throw new Error(
        "AI question response must be an object"
      );
    }

    /**
     * -----------------------------------------------------
     * Extract questions
     * -----------------------------------------------------
     */

    const questionsValue: unknown =
      (
        parsed as Record<
          string,
          unknown
        >
      ).questions;

    if (
      !Array.isArray(
        questionsValue
      )
    ) {
      throw new Error(
        "AI response does not contain a valid questions array"
      );
    }

    /**
     * -----------------------------------------------------
     * Convert unknown[] -> string[]
     * -----------------------------------------------------
     *
     * This section fixes your TypeScript error:
     *
     * Type 'unknown[]' is not assignable to type 'string[]'
     */

    const questions: string[] =
      questionsValue
        .filter(
          (
            question: unknown
          ): question is string => {
            return (
              typeof question ===
                "string" &&
              question.trim().length >
                0
            );
          }
        )
        .map(
          (
            question: string
          ): string => {
            return question.trim();
          }
        );

    /**
     * -----------------------------------------------------
     * Remove duplicates
     * -----------------------------------------------------
     */

    const uniqueQuestions: string[] =
      Array.from(
        new Set<string>(
          questions
        )
      );

    if (
      uniqueQuestions.length ===
      0
    ) {
      throw new Error(
        "AI generated no valid questions"
      );
    }

    /**
     * The model could theoretically generate more
     * questions than requested.
     */

    return uniqueQuestions.slice(
      0,
      questionCount
    );
  } catch (error) {
    console.error(
      "Question generation error:",
      error
    );

    throw error;
  }
}