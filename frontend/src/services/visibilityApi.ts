const API_BASE_URL = "http://localhost:4000/api";

export interface VisibilityRequest {
  category: string;
  brands: string[];
}

export async function checkVisibility(
  payload: VisibilityRequest
) {
  const response = await fetch(
    `${API_BASE_URL}/visibility/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch visibility data");
  }

  return response.json();
}
