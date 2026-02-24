import type { VisibilityResponse } from "../types/visibility";

const API_BASE_URL = "https://ai-visibility-tracker-9yz7.onrender.com";

export async function checkVisibility(
  category: string,
  brands: string[]
): Promise<VisibilityResponse> {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE_URL}/api/visibility/check`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // 🔑 REQUIRED
      },
      body: JSON.stringify({ category, brands }),
    }
  );

  const text = await res.text();

  if (!text) {
    throw new Error("Empty response from server");
  }

  const data = JSON.parse(text);

  if (!res.ok) {
    // Pass backend message to UI
    throw new Error(data.error || "Visibility check failed");
  }

  return data;
}
