export function generatePrompts(category: string): string[] {
  return [
    `What is the best ${category} for startups?`,
    `Top ${category} tools for small teams`,
    `Which ${category} integrates with Slack?`,
    `Best ${category} alternatives in 2025`,
    `Free vs paid ${category} comparison`
  ];
}
