export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

export function isTokenExpired(token: string): boolean {
  try {
    const [, payloadBase64] = token.split(".");
    const payload = JSON.parse(atob(payloadBase64));
    const now = Date.now() / 1000;
    return payload.exp < now;
  } catch {
    return true;
  }
}
