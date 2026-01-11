export function generatePrompts(category: string): string[] {
  return [
    // 1️⃣ General recommendations
    `What is the best ${category} for startups in 2025?`,
    `Which ${category} tools are most recommended by experts?`,

    // 2️⃣ Use-case driven (contextual)
    `What ${category} works best for a 10-person remote team?`,
    `Which ${category} is easiest to set up for non-technical teams?`,

    // 3️⃣ Feature / capability queries (fan-out)
    `Which ${category} tools integrate well with Slack and Google Workspace?`,
    `What ${category} offers the best automation and reporting features?`,

    // 4️⃣ Comparison queries
    `Free vs paid ${category} tools comparison for small businesses`,
    `How does popular ${category} software compare for startups?`,

    // 5️⃣ Alternatives & competitive displacement
    `What are the best alternatives to popular ${category} tools?`,
    `Which ${category} tools are similar to leading enterprise solutions?`,
  ];
}
