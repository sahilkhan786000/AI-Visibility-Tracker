const base = "https://ai-visibility-tracker-9yz7.onrender.com";

function authHeader() {
  return { Authorization: `Bearer ${localStorage.getItem("token")}` };
}

export const getSessions = () =>
  fetch(`${base}/sessions`, { headers: authHeader() }).then(r => r.json());

export const saveSession = (data: any) =>
  fetch(`${base}/sessions`, {
    method: "POST",
    headers: { ...authHeader(), "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(r => r.json());

export const loadSession = (id: string) =>
  fetch(`${base}/sessions/${id}`, { headers: authHeader() }).then(r => r.json());
