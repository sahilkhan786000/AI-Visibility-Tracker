export interface VisibilityResponse {
  summary: {
    totalPrompts: number;
    visibilityScore: Record<string, number>;

    // 🔥 NEW METRICS
    brandInclusionRate: number;
    aiSpecificity: number;
    avgBrandsPerAnswer: number;
  };

  leaderboard: {
    brand: string;
    mentions: number;
  }[];

  answers: {
    prompt: string;
    answer: string;
    mentions: string[];
  }[];
}
