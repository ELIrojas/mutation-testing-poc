export interface UserRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
}

export function getSession(): UserRecord | null {
  const data = localStorage.getItem("fg_session");
  return data ? JSON.parse(data) : null;
}

export function saveSession(user: UserRecord): void {
  localStorage.setItem("fg_session", JSON.stringify(user));
}

export function clearSession(): void {
  localStorage.removeItem("fg_session");
}

export function getUsers(): UserRecord[] {
  return JSON.parse(localStorage.getItem("fg_users") || "[]");
}

export function saveUsers(users: UserRecord[]): void {
  localStorage.setItem("fg_users", JSON.stringify(users));
}   