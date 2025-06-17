import { betterAuth } from "better-auth";
import { expoClient } from "@better-auth/expo";

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: ":memory:", // For development - use a real database in production
  },
  
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false, // Disable for development
  },
  
  socialProviders: {
    google: {
      clientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  
  // Trust the app scheme for deep linking
  trustedOrigins: [
    "opendreams://", // Your app scheme
    "exp://", // Expo development
    "http://localhost:8081", // Expo web
  ],
  
  // Session configuration
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  
  // User configuration
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: false,
      },
      lastName: {
        type: "string",
        required: false,
      },
      batch: {
        type: "string",
        required: false,
      },
      admissionCode: {
        type: "string",
        required: false,
      },
    },
  },
  
  plugins: [
    expoClient({
      scheme: "opendreams",
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.User;
