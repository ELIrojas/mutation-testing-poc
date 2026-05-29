// export interface RegisterData {
//   firstName: string;
//   email: string;
//   password: string;
//   confirm: string;
//   terms: boolean;
// }

// // Interfaz para el Login
// export interface LoginData {
//   email: string;
//   password: string;
// }

// export function validateRegister(form: RegisterData): string {
//   if (!form.firstName || !form.email || !form.password) {
//     return "Fill in all required fields.";
//   }
//   if (form.password !== form.confirm) {
//     return "Passwords do not match.";
//   }
//   if (!form.terms) {
//     return "You must accept the terms.";
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//     return "Invalid email address.";
//   }
//   return "";
// }

// export function getPasswordStrength(password: string): number {
//   if (password.length === 0) return 0;
//   if (password.length < 6) return 1;
//   if (password.length < 10) return 2;
//   if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
//   return 3;
// }

// export function validateLogin(form: LoginData): string {
//   if (!form.email || !form.password) {
//     return "Please fill in all fields.";
//   }
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//     return "Invalid email address.";
//   }
//   return "";
// }


export interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
  terms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export function validateRegister(form: RegisterData): string {
  if (!form.firstName || !form.email || !form.password) {
    return "Fill in all required fields.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return "Invalid email address.";
  }
  if (form.password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  if (form.password !== form.confirm) {
    return "Passwords do not match.";
  }
  if (!form.terms) {
    return "You must accept the terms.";
  }
  return "";
}

export function validateLogin(form: LoginData): string {
  if (!form.email || !form.password) {
    return "Please fill in all fields.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    return "Invalid email address.";
  }
  return "";
}

export function getPasswordStrength(password: string): number {
  if (password.length === 0) return 0;
  if (password.length < 6) return 1;
  if (password.length < 10) return 2;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 4;
  return 3;
}