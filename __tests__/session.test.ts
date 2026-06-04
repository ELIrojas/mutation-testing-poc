import { describe, it, expect, beforeEach } from "vitest";
import {
  getSession,
  saveSession,
  clearSession,
  getUsers,
  saveUsers,
} from "../utils/session";
import type { UserRecord } from "../utils/session";

const mockUser: UserRecord = {
  id: 1,
  firstName: "Juan",
  lastName: "Pérez",
  email: "juan@test.com",
  password: "Secret1",
  createdAt: "2024-01-01",
};

beforeEach(() => {
  localStorage.clear();
});

describe("getSession", () => {
  it("retorna null si no hay sesión", () => {
    expect(getSession()).toBeNull();
  });

  it("retorna el usuario guardado", () => {
    localStorage.setItem("fg_session", JSON.stringify(mockUser));
    expect(getSession()).toEqual(mockUser);
  });
});

describe("saveSession", () => {
  it("guarda el usuario en localStorage", () => {
    saveSession(mockUser);
    const raw = localStorage.getItem("fg_session");
    expect(JSON.parse(raw!)).toEqual(mockUser);
  });
});

describe("clearSession", () => {
  it("elimina la sesión de localStorage", () => {
    saveSession(mockUser);
    clearSession();
    expect(localStorage.getItem("fg_session")).toBeNull();
  });
});

describe("getUsers", () => {
  it("retorna array vacío si no hay usuarios", () => {
    expect(getUsers()).toEqual([]);
  });

  it("retorna los usuarios guardados", () => {
    localStorage.setItem("fg_users", JSON.stringify([mockUser]));
    expect(getUsers()).toEqual([mockUser]);
  });
});

describe("saveUsers", () => {
  it("guarda el array de usuarios en localStorage", () => {
    saveUsers([mockUser]);
    const raw = localStorage.getItem("fg_users");
    expect(JSON.parse(raw!)).toEqual([mockUser]);
  });
});