import { createAuthClient } from "better-auth/react";

// For now, let's create a simpler auth client without the Expo plugin
// We'll add the Expo-specific features later once the basic setup works
export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8081",
});

// Export commonly used auth methods for convenience
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;
