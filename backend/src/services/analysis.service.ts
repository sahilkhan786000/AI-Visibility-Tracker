// function mentionsBrand(answer: string, brand: string) {
//   const regex = new RegExp(`\\b${brand}\\b`, "i");
//   return regex.test(answer);
// }


// export function analyzeAnswers(
//   prompts: string[],
//   answers: string[],
//   brands: string[]
// ) {
//   const brandMentions: Record<string, number> = {};
//   brands.forEach((b) => (brandMentions[b] = 0));

//   let promptsWithAnyBrand = 0;
//   let totalBrandMentions = 0;

//   const detailed = prompts.map((prompt, i) => {
//     const answer = answers[i];
//     const mentions = brands.filter((b) =>
//       answer.toLowerCase().includes(b.toLowerCase())
//     );

//     if (mentions.length > 0) {
//       promptsWithAnyBrand++;
//     }

//     mentions.forEach((m) => {
//       brandMentions[m]++;
//       totalBrandMentions++;
//     });

//     return { prompt, answer, mentions };
//   });

//   const leaderboard = Object.entries(brandMentions)
//     .map(([brand, mentions]) => ({ brand, mentions }))
//     .sort((a, b) => b.mentions - a.mentions);

//   const totalPrompts = prompts.length;

//   return {
//     summary: {
//       totalPrompts,
//       visibilityScore: brandMentions,

  
//       brandInclusionRate:
//         totalPrompts > 0
//           ? Math.round((promptsWithAnyBrand / totalPrompts) * 100)
//           : 0,

//       aiSpecificity:
//         totalPrompts > 0
//           ? Math.round((promptsWithAnyBrand / totalPrompts) * 100)
//           : 0,

//       avgBrandsPerAnswer:
//         totalPrompts > 0
//           ? Number((totalBrandMentions / totalPrompts).toFixed(2))
//           : 0,
//     },

//     leaderboard,
//     answers: detailed,
//   };
// }


/**
 * Escape special regex characters from brand names.
 *
 * Example:
 * "Monday.com"
 *
 * Without escaping, "." has special meaning in regex.
 */
function escapeRegex(value: string): string {
  return value.replace(
    /[.*+?^${}()|[\]\\]/g,
    "\\$&"
  );
}

/**
 * Find every occurrence of a brand in an AI answer.
 *
 * Returns character positions.
 *
 * Example:
 *
 * answer:
 * "Nike is great. Adidas is another option."
 *
 * findBrandPositions(answer, "Nike")
 *
 * => [0]
 */
function findBrandPositions(
  answer: string,
  brand: string
): number[] {
  /*
   * Don't use \b because brand names such as:
   *
   * Monday.com
   * AT&T
   * H&M
   *
   * contain punctuation.
   */

  const escapedBrand = escapeRegex(brand);

  const regex = new RegExp(
    `(^|[^a-zA-Z0-9])(${escapedBrand})(?=$|[^a-zA-Z0-9])`,
    "gi"
  );

  const positions: number[] = [];

  let match: RegExpExecArray | null;

  while ((match = regex.exec(answer)) !== null) {
    /*
     * match.index points to the boundary before the
     * brand, so account for that.
     */

    const boundaryLength =
      match[1]?.length ?? 0;

    positions.push(
      match.index + boundaryLength
    );

    /*
     * Safety against zero-length regex matches.
     */

    if (match.index === regex.lastIndex) {
      regex.lastIndex++;
    }
  }

  return positions;
}

/**
 * Very basic sentiment estimation.
 *
 * This is intentionally lightweight.
 *
 * Later you can replace this with AI-based structured
 * analysis for much better accuracy.
 */
function estimateSentiment(
  answer: string,
  brand: string
): "positive" | "neutral" | "negative" {
  const lowerAnswer =
    answer.toLowerCase();

  const lowerBrand =
    brand.toLowerCase();

  const brandIndex =
    lowerAnswer.indexOf(lowerBrand);

  if (brandIndex === -1) {
    return "neutral";
  }

  /*
   * Look around the brand mention.
   */

  const start = Math.max(
    0,
    brandIndex - 150
  );

  const end = Math.min(
    lowerAnswer.length,
    brandIndex +
      lowerBrand.length +
      150
  );

  const context =
    lowerAnswer.slice(start, end);

  const positiveTerms = [
    "best",
    "excellent",
    "recommended",
    "recommend",
    "strong",
    "leading",
    "great",
    "popular",
    "reliable",
    "ideal",
    "good choice",
    "top choice",
    "well-known",
    "high quality",
    "good option",
  ];

  const negativeTerms = [
    "poor",
    "weak",
    "expensive",
    "limited",
    "avoid",
    "worse",
    "drawback",
    "problem",
    "not recommended",
    "bad choice",
    "unreliable",
    "disadvantage",
  ];

  const positive =
    positiveTerms.some((term) =>
      context.includes(term)
    );

  const negative =
    negativeTerms.some((term) =>
      context.includes(term)
    );

  if (positive && !negative) {
    return "positive";
  }

  if (negative && !positive) {
    return "negative";
  }

  return "neutral";
}

/**
 * Analyze AI answers and calculate visibility
 * metrics for every supplied brand.
 */
export function analyzeAnswers(
  prompts: string[],
  answers: string[],
  brands: string[]
) {
  /*
   * -------------------------
   * Initialize brand stats
   * -------------------------
   */

  const brandStats: Record<
    string,
    {
      totalMentions: number;
      answersMentioned: number;

      positive: number;
      neutral: number;
      negative: number;

      positions: number[];
    }
  > = {};

  brands.forEach((brand) => {
    brandStats[brand] = {
      totalMentions: 0,
      answersMentioned: 0,

      positive: 0,
      neutral: 0,
      negative: 0,

      positions: [],
    };
  });

  /*
   * -------------------------
   * Analyze every answer
   * -------------------------
   */

  const detailedAnswers =
    prompts.map((prompt, index) => {
      const answer =
        answers[index] || "";

      const mentions: {
        brand: string;
        mentionCount: number;
        firstPosition: number;
        sentiment:
          | "positive"
          | "neutral"
          | "negative";
      }[] = [];

      brands.forEach((brand) => {
        const positions =
          findBrandPositions(
            answer,
            brand
          );

        /*
         * Brand wasn't mentioned.
         */

        if (!positions.length) {
          return;
        }

        const sentiment =
          estimateSentiment(
            answer,
            brand
          );

        /*
         * Update global stats.
         */

        brandStats[brand]
          .totalMentions +=
          positions.length;

        brandStats[brand]
          .answersMentioned += 1;

        brandStats[brand]
          .positions.push(
            positions[0]
          );

        brandStats[brand][
          sentiment
        ] += 1;

        /*
         * Store answer-level details.
         */

        mentions.push({
          brand,

          mentionCount:
            positions.length,

          firstPosition:
            positions[0],

          sentiment,
        });
      });

      /*
       * Sort brands by their first
       * appearance in the answer.
       */

      mentions.sort(
        (a, b) =>
          a.firstPosition -
          b.firstPosition
      );

      return {
        prompt,
        answer,
        mentions,
      };
    });

  /*
   * -------------------------
   * Global calculations
   * -------------------------
   */

  const totalPrompts =
    prompts.length;

  const totalBrandMentions =
    Object.values(
      brandStats
    ).reduce(
      (sum, brand) =>
        sum +
        brand.totalMentions,
      0
    );

  /*
   * -------------------------
   * Calculate leaderboard
   * -------------------------
   */

  const leaderboard =
    brands.map((brand) => {
      const stats =
        brandStats[brand];

      /*
       * MENTION RATE
       *
       * How many AI answers contained
       * this brand?
       *
       * Example:
       *
       * Nike appears in 9 / 12 answers
       *
       * = 75%
       */

      const mentionRate =
        totalPrompts > 0
          ? (
              stats.answersMentioned /
              totalPrompts
            ) *
            100
          : 0;

      /*
       * SHARE OF VOICE
       *
       * Percentage of all tracked-brand
       * mentions belonging to this brand.
       *
       * Example:
       *
       * Nike = 10 mentions
       * Adidas = 6
       * Hoka = 4
       *
       * Nike SOV = 50%
       */

      const shareOfVoice =
        totalBrandMentions > 0
          ? (
              stats.totalMentions /
              totalBrandMentions
            ) *
            100
          : 0;

      /*
       * Average character position where
       * the brand first appeared.
       *
       * Lower = brand tends to appear
       * earlier in AI answers.
       */

      const averagePosition =
        stats.positions.length > 0
          ? stats.positions.reduce(
              (sum, position) =>
                sum + position,
              0
            ) /
            stats.positions.length
          : null;

      /*
       * SENTIMENT SCORE
       *
       * Range:
       *
       * -100 → very negative
       * 0    → neutral
       * +100 → very positive
       */

      const sentimentScore =
        stats.answersMentioned > 0
          ? (
              (stats.positive -
                stats.negative) /
              stats.answersMentioned
            ) *
            100
          : 0;

      /*
       * POSITION SCORE
       *
       * Convert average character
       * position into a 0-100 score.
       *
       * Earlier mentions get higher
       * scores.
       *
       * This is only an approximation.
       */

      const positionScore =
        averagePosition === null
          ? 0
          : Math.max(
              0,
              100 -
                averagePosition /
                  10
            );

      /*
       * VISIBILITY SCORE
       *
       * Current formula:
       *
       * 50% mention rate
       * 25% share of voice
       * 15% sentiment
       * 10% position
       */

      const normalizedSentiment =
        (sentimentScore + 100) / 2;

      const visibilityScore =
        mentionRate * 0.5 +
        shareOfVoice * 0.25 +
        normalizedSentiment *
          0.15 +
        positionScore * 0.1;

      return {
        brand,

        visibilityScore:
          Number(
            visibilityScore.toFixed(
              2
            )
          ),

        mentionRate:
          Number(
            mentionRate.toFixed(2)
          ),

        shareOfVoice:
          Number(
            shareOfVoice.toFixed(2)
          ),

        averagePosition:
          averagePosition !== null
            ? Number(
                averagePosition.toFixed(
                  2
                )
              )
            : null,

        sentiment: {
          positive:
            stats.positive,

          neutral:
            stats.neutral,

          negative:
            stats.negative,

          score: Number(
            sentimentScore.toFixed(
              2
            )
          ),
        },

        totalMentions:
          stats.totalMentions,

        answersMentioned:
          stats.answersMentioned,
      };
    });

  /*
   * Highest visibility first.
   */

  leaderboard.sort(
    (a, b) =>
      b.visibilityScore -
      a.visibilityScore
  );

  /*
   * -------------------------
   * Overall statistics
   * -------------------------
   */

  const promptsWithAnyBrand =
    detailedAnswers.filter(
      (item) =>
        item.mentions.length > 0
    ).length;

  const brandInclusionRate =
    totalPrompts > 0
      ? (
          promptsWithAnyBrand /
          totalPrompts
        ) *
        100
      : 0;

  const avgBrandsPerAnswer =
    totalPrompts > 0
      ? detailedAnswers.reduce(
          (sum, item) =>
            sum +
            item.mentions.length,
          0
        ) / totalPrompts
      : 0;

  /*
   * -------------------------
   * Final response
   * -------------------------
   */

  return {
    summary: {
      totalPrompts,

      totalBrands:
        brands.length,

      totalBrandMentions,

      brandInclusionRate:
        Number(
          brandInclusionRate.toFixed(
            2
          )
        ),

      avgBrandsPerAnswer:
        Number(
          avgBrandsPerAnswer.toFixed(
            2
          )
        ),
    },

    leaderboard,

    answers:
      detailedAnswers,
  };
}