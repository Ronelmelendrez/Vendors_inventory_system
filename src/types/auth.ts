export type UserRole = "admin" | "branch";

export interface User {
  id: string;
  email: string;
  role: UserRole;
  branch_name?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isBranch: boolean;
}
