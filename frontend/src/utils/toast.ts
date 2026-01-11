import toast from "react-hot-toast";

function getToastStyle(theme: string) {
  return {
    background:
      theme === "space"
        ? "rgba(15, 23, 42, 0.85)" // dark glass
        : "rgba(236, 253, 245, 0.9)", // light glass
    color: theme === "space" ? "#e5e7eb" : "#064e3b",
    border:
      theme === "space"
        ? "1px solid rgba(255,255,255,0.12)"
        : "1px solid #a7f3d0",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow:
      theme === "space"
        ? "0 8px 30px rgba(0,0,0,0.6)"
        : "0 8px 30px rgba(0,0,0,0.15)",
  };
}

export function showError(message: string, theme: string) {
  toast.error(message, {
    style: getToastStyle(theme),
  });
}

export function showSuccess(message: string, theme: string) {
  toast.success(message, {
    style: getToastStyle(theme),
  });
}

export function showInfo(message: string, theme: string) {
  toast(message, {
    style: getToastStyle(theme),
  });
}
