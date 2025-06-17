import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    provider: "sqlite",
    url: "./dev.db", // SQLite file for development
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
    "http://localhost:3000", // Alternative dev server
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
});

// Export types - we'll define them manually for now
export type Session = {
  id: string;
  userId: string;
  expiresAt: Date;
};

export type User = {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  batch?: string;
  admissionCode?: string;
};
