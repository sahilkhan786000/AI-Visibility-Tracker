import { Request, Response } from "express";
import { generatePrompts } from "../services/prompt.service";
import { queryAI } from "../services/ai.service";
import { analyzeAnswers } from "../services/analysis.service";

export async function checkVisibility(req: Request, res: Response) {
  const { category, brands } = req.body;

  if (!category || !brands?.length) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const prompts = generatePrompts(category);
  const answers = await Promise.all(
    prompts.map((p) => queryAI(p))
  );

  const analysis = analyzeAnswers(prompts, answers, brands);

  // ✅ ADD THIS (session-friendly response)
  res.json({
    category,
    brands,
    ...analysis,
  });
}
