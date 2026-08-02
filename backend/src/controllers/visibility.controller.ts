// import { Request, Response } from "express";
// import { generatePrompts } from "../services/prompt.service";
// import { queryAI } from "../services/ai.service";
// import { analyzeAnswers } from "../services/analysis.service";

// export async function checkVisibility(req: Request, res: Response) {
//   const { category, brands } = req.body;

//   if (!category || !brands?.length) {
//     return res.status(400).json({ error: "Invalid input" });
//   }

//   const prompts = generatePrompts(category);
//   const answers = await Promise.all(
//     prompts.map((p) => queryAI(p))
//   );

//   const analysis = analyzeAnswers(prompts, answers, brands);


//   res.json({
//     category,
//     brands,
//     ...analysis,
//   });
// }


import { Request, Response } from "express";

import { generatePrompts } from "../services/prompt.service";
import { queryAI } from "../services/ai.service";
import { analyzeAnswers } from "../services/analysis.service";

/**
 * POST /visibility
 *
 * Expected body:
 *
 * {
 *   "category": "Running Shoes",
 *   "brands": ["Nike", "Adidas", "Hoka"]
 * }
 */
export async function checkVisibility(
  req: Request,
  res: Response
) {
  try {
    const { category, brands } = req.body;

    /*
     * -------------------------
     * 1. Validate category
     * -------------------------
     */

    if (
      typeof category !== "string" ||
      !category.trim()
    ) {
      return res.status(400).json({
        error: "Category is required",
      });
    }

    /*
     * -------------------------
     * 2. Validate brands
     * -------------------------
     */

    if (
      !Array.isArray(brands) ||
      brands.length === 0
    ) {
      return res.status(400).json({
        error: "At least one brand is required",
      });
    }

    const normalizedBrands = brands
      .filter(
        (brand): brand is string =>
          typeof brand === "string" &&
          brand.trim().length > 0
      )
      .map((brand) => brand.trim());

    if (!normalizedBrands.length) {
      return res.status(400).json({
        error: "At least one valid brand is required",
      });
    }

    const normalizedCategory = category.trim();

    /*
     * -------------------------
     * 3. Generate questions
     * -------------------------
     *
     * IMPORTANT:
     *
     * Brands are NOT passed here.
     *
     * This allows the AI to independently generate
     * questions without knowing which brands we're
     * trying to measure.
     */

    const prompts = await generatePrompts(
      normalizedCategory
    );

    /*
     * -------------------------
     * 4. Ask AI each question
     * -------------------------
     *
     * Promise.allSettled is used instead of Promise.all.
     *
     * If 1 AI request fails, we don't want the entire
     * visibility analysis to fail.
     */

    const results = await Promise.allSettled(
      prompts.map(async (prompt) => {
        const answer = await queryAI(prompt);

        return {
          prompt,
          answer,
        };
      })
    );

    /*
     * -------------------------
     * 5. Separate successful
     *    and failed requests
     * -------------------------
     */

    const successfulResults: {
      prompt: string;
      answer: string;
    }[] = [];

    const failedPrompts: string[] = [];

    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        successfulResults.push(result.value);
      } else {
        failedPrompts.push(prompts[index]);

        console.error(
          `AI request failed for prompt: ${prompts[index]}`,
          result.reason
        );
      }
    });

    /*
     * If ALL AI calls fail, don't calculate visibility.
     */

    if (!successfulResults.length) {
      return res.status(502).json({
        error: "Unable to complete AI visibility analysis",
        generatedQuestions: prompts.length,
        successfulQuestions: 0,
        failedQuestions: prompts.length,
      });
    }

    /*
     * -------------------------
     * 6. Analyze answers
     * -------------------------
     */

    const successfulPrompts =
      successfulResults.map(
        (result) => result.prompt
      );

    const answers =
      successfulResults.map(
        (result) => result.answer
      );

    const analysis = analyzeAnswers(
      successfulPrompts,
      answers,
      normalizedBrands
    );

    /*
     * -------------------------
     * 7. Return response
     * -------------------------
     */

    return res.status(200).json({
      category: normalizedCategory,

      brands: normalizedBrands,

      generation: {
        generatedQuestions: prompts.length,
        successfulQuestions:
          successfulResults.length,
        failedQuestions:
          failedPrompts.length,
      },

      ...analysis,
    });
  } catch (error) {
    console.error(
      "Visibility analysis error:",
      error
    );

    return res.status(500).json({
      error: "Failed to analyze AI visibility",
    });
  }
}