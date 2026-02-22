const STORAGE_KEY = "zain_admin_session_v1";

const ADMIN_USERNAME = "zainRealEstate@gmail.com";
// Change this anytime (single source of truth):
const ADMIN_PASSWORD = "Zain#RE_9vK!2026$Ax";

export function getAdminUsername() {
  return ADMIN_USERNAME;
}

export function isAdminLoggedIn() {
  return localStorage.getItem(STORAGE_KEY) === "1";
}

export function adminLogin(username: string, password: string) {
  const ok =
    username.trim().toLowerCase() === ADMIN_USERNAME.toLowerCase() &&
    password === ADMIN_PASSWORD;

  if (ok) localStorage.setItem(STORAGE_KEY, "1");
  return ok;
}

export function adminLogout() {
  localStorage.removeItem(STORAGE_KEY);
}