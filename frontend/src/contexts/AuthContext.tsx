"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, UserRole } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
  isBranch: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo/frontend-only mode
const MOCK_USERS = [
  {
    id: "admin-001",
    email: "admin@vendor.com",
    password: "admin123",
    role: "admin" as UserRole,
    branch_name: undefined,
    created_at: new Date().toISOString(),
  },
  {
    id: "branch-001",
    email: "branch@vendor.com",
    password: "branch123",
    role: "branch" as UserRole,
    branch_name: "Main Branch",
    created_at: new Date().toISOString(),
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session on mount
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("auth_user");
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!mockUser) {
      throw new Error("Invalid email or password");
    }

    const { password: _, ...userWithoutPassword } = mockUser;
    setUser(userWithoutPassword);
    localStorage.setItem("auth_user", JSON.stringify(userWithoutPassword));
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem("auth_user");
  };

  const value = {
    user,
    loading,
    signIn,
    signOut,
    isAdmin: user?.role === "admin",
    isBranch: user?.role === "branch",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
