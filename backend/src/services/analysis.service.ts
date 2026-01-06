export function analyzeAnswers(
  prompts: string[],
  answers: string[],
  brands: string[]
) {
  const brandMentions: Record<string, number> = {};
  brands.forEach((b) => (brandMentions[b] = 0));

  const detailed = prompts.map((prompt, i) => {
    const answer = answers[i];
    const mentions = brands.filter((b) =>
      answer.toLowerCase().includes(b.toLowerCase())
    );

    mentions.forEach((m) => brandMentions[m]++);

    return { prompt, answer, mentions };
  });

  const leaderboard = Object.entries(brandMentions)
    .map(([brand, mentions]) => ({ brand, mentions }))
    .sort((a, b) => b.mentions - a.mentions);

  return {
    summary: {
      totalPrompts: prompts.length,
      visibilityScore: brandMentions
    },
    leaderboard,
    answers: detailed
  };
}
