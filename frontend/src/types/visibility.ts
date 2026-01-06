export interface AnswerItem {
  prompt: string;
  answer: string;
  mentions: string[];
}

export interface LeaderboardItem {
  brand: string;
  mentions: number;
}

export interface VisibilityResponse {
  summary: {
    totalPrompts: number;
    visibilityScore: Record<string, number>;
  };
  leaderboard: LeaderboardItem[];
  answers: AnswerItem[];
}
