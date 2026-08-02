// export function generatePrompts(category: string): string[] {
//   return [
//     // 1️⃣ General recommendations
//     `What is the best ${category} for startups in 2025?`,
//     `Which ${category} tools are most recommended by experts?`,

//     // 2️⃣ Use-case driven (contextual)
//     `What ${category} works best for a 10-person remote team?`,
//     `Which ${category} is easiest to set up for non-technical teams?`,

//     // 3️⃣ Feature / capability queries (fan-out)
//     `Which ${category} tools integrate well with Slack and Google Workspace?`,
//     `What ${category} offers the best automation and reporting features?`,

//     // 4️⃣ Comparison queries
//     `Free vs paid ${category} tools comparison for small businesses`,
//     `How does popular ${category} software compare for startups?`,

//     // 5️⃣ Alternatives & competitive displacement
//     `What are the best alternatives to popular ${category} tools?`,
//     `Which ${category} tools are similar to leading enterprise solutions?`,
//   ];
// }


import { generateQuestionsWithAI } from "./ai.service";

const DEFAULT_QUESTION_COUNT = 12;
const MAX_QUESTION_COUNT = 20;

/**
 * Generate diverse visibility questions for any category.
 *
 * IMPORTANT:
 * Only the category is used here.
 * Brands are intentionally NOT provided because including them could
 * bias the questions and therefore the visibility measurement.
 */
export async function generatePrompts(
  category: string,
  count: number = DEFAULT_QUESTION_COUNT
): Promise<string[]> {
  if (!category || !category.trim()) {
    throw new Error("Category is required");
  }

  const normalizedCategory = category.trim();

  // Prevent accidentally generating an excessive number of questions.
  const questionCount = Math.min(
    Math.max(count, 1),
    MAX_QUESTION_COUNT
  );

  const questions = await generateQuestionsWithAI(
    normalizedCategory,
    questionCount
  );

  if (!questions.length) {
    throw new Error("No visibility questions were generated");
  }

  return questions;
}