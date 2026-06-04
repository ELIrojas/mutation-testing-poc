import { describe, it, expect } from "vitest";
import { validateLogin, validateRegister, getPasswordStrength } from "../utils/validators";

describe("validateLogin", () => {
  it("retorna error si email está vacío", () => {
    expect(validateLogin({ email: "", password: "123456" })).toBe("Please fill in all fields.");
  });

  it("retorna error si password está vacío", () => {
    expect(validateLogin({ email: "test@test.com", password: "" })).toBe("Please fill in all fields.");
  });

  it("retorna error si email es inválido", () => {
    expect(validateLogin({ email: "noesvalido", password: "123456" })).toBe("Invalid email address.");
  });

  it("retorna vacío si todo es válido", () => {
    expect(validateLogin({ email: "test@test.com", password: "123456" })).toBe("");
  });
});

describe("validateRegister", () => {
  const base = {
    firstName: "John",
    lastName: "",
    email: "john@test.com",
    password: "Abcdef1",
    confirm: "Abcdef1",
    terms: true,
  };

  it("retorna error si firstName está vacío", () => {
    expect(validateRegister({ ...base, firstName: "" })).toBe("Fill in all required fields.");
  });

  it("retorna error si email está vacío", () => {
    expect(validateRegister({ ...base, email: "" })).toBe("Fill in all required fields.");
  });

  it("retorna error si email es inválido", () => {
    expect(validateRegister({ ...base, email: "noesvalido" })).toBe("Invalid email address.");
  });

  it("retorna error si password tiene menos de 6 caracteres", () => {
    expect(validateRegister({ ...base, password: "abc", confirm: "abc" })).toBe("Password must be at least 6 characters.");
  });

  it("retorna error si passwords no coinciden", () => {
    expect(validateRegister({ ...base, confirm: "diferente" })).toBe("Passwords do not match.");
  });

  it("retorna error si terms no está aceptado", () => {
    expect(validateRegister({ ...base, terms: false })).toBe("You must accept the terms.");
  });

  it("retorna vacío si todo es válido", () => {
    expect(validateRegister(base)).toBe("");
  });
});

describe("getPasswordStrength", () => {
  it("retorna 0 si password está vacío", () => {
    expect(getPasswordStrength("")).toBe(0);
  });

  it("retorna 1 si password tiene menos de 6 caracteres", () => {
    expect(getPasswordStrength("abc")).toBe(1);
  });

  it("retorna 2 si password tiene entre 6 y 9 caracteres", () => {
    expect(getPasswordStrength("abcdef")).toBe(2);
  });

  it("retorna 4 si password tiene mayúscula y número", () => {
    expect(getPasswordStrength("Abcdef1")).toBe(4);
  });

  it("retorna 3 si password es largo pero sin mayúscula ni número", () => {
    expect(getPasswordStrength("abcdefghij")).toBe(3);
  });
});