function mentionsBrand(answer: string, brand: string) {
  const regex = new RegExp(`\\b${brand}\\b`, "i");
  return regex.test(answer);
}


export function analyzeAnswers(
  prompts: string[],
  answers: string[],
  brands: string[]
) {
  const brandMentions: Record<string, number> = {};
  brands.forEach((b) => (brandMentions[b] = 0));

  let promptsWithAnyBrand = 0;
  let totalBrandMentions = 0;

  const detailed = prompts.map((prompt, i) => {
    const answer = answers[i];
    const mentions = brands.filter((b) =>
      answer.toLowerCase().includes(b.toLowerCase())
    );

    if (mentions.length > 0) {
      promptsWithAnyBrand++;
    }

    mentions.forEach((m) => {
      brandMentions[m]++;
      totalBrandMentions++;
    });

    return { prompt, answer, mentions };
  });

  const leaderboard = Object.entries(brandMentions)
    .map(([brand, mentions]) => ({ brand, mentions }))
    .sort((a, b) => b.mentions - a.mentions);

  const totalPrompts = prompts.length;

  return {
    summary: {
      totalPrompts,
      visibilityScore: brandMentions,

      // 🔥 NEW METRICS
      brandInclusionRate:
        totalPrompts > 0
          ? Math.round((promptsWithAnyBrand / totalPrompts) * 100)
          : 0,

      aiSpecificity:
        totalPrompts > 0
          ? Math.round((promptsWithAnyBrand / totalPrompts) * 100)
          : 0,

      avgBrandsPerAnswer:
        totalPrompts > 0
          ? Number((totalBrandMentions / totalPrompts).toFixed(2))
          : 0,
    },

    leaderboard,
    answers: detailed,
  };
}
