import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authClient } from '../lib/auth-client';
import type { User, Session } from '../lib/auth';

interface AuthState {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setInitialized: (initialized: boolean) => void;
  
  // Auth methods
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (data: { name: string; email: string; password: string; admissionCode?: string }) => Promise<{ success: boolean; error?: string }>;
  signInWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  
  // Utility methods
  isAuthenticated: () => boolean;
  initialize: () => Promise<void>;
  reset: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      session: null,
      isLoading: false,
      isInitialized: false,
      
      // State setters
      setUser: (user) => set({ user }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),
      setInitialized: (isInitialized) => set({ isInitialized }),
      
      // Auth methods
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });
          
          const result = await authClient.signIn.email({
            email,
            password,
          });
          
          if (result.data) {
            set({ 
              user: result.data.user,
              session: result.data.session,
              isLoading: false 
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error?.message || 'Sign in failed' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'An unexpected error occurred' 
          };
        }
      },
      
      signUp: async (data) => {
        try {
          set({ isLoading: true });
          
          const result = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            // Add custom fields
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' '),
            admissionCode: data.admissionCode,
          });
          
          if (result.data) {
            set({ 
              user: result.data.user,
              session: result.data.session,
              isLoading: false 
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error?.message || 'Sign up failed' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'An unexpected error occurred' 
          };
        }
      },
      
      signInWithGoogle: async () => {
        try {
          set({ isLoading: true });
          
          const result = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard", // This will be converted to deep link
          });
          
          if (result.data) {
            set({ 
              user: result.data.user,
              session: result.data.session,
              isLoading: false 
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: result.error?.message || 'Google sign in failed' };
          }
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error.message : 'An unexpected error occurred' 
          };
        }
      },
      
      signOut: async () => {
        try {
          set({ isLoading: true });
          await authClient.signOut();
          set({ 
            user: null, 
            session: null, 
            isLoading: false 
          });
        } catch (error) {
          console.error('Sign out error:', error);
          // Force clear state even if API call fails
          set({ 
            user: null, 
            session: null, 
            isLoading: false 
          });
        }
      },
      
      // Utility methods
      isAuthenticated: () => {
        const state = get();
        return !!(state.user && state.session);
      },
      
      initialize: async () => {
        try {
          set({ isLoading: true });
          
          // Get current session from Better Auth
          const session = await authClient.getSession();
          
          if (session.data) {
            set({ 
              user: session.data.user,
              session: session.data.session,
              isLoading: false,
              isInitialized: true
            });
          } else {
            set({ 
              user: null,
              session: null,
              isLoading: false,
              isInitialized: true
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({ 
            user: null,
            session: null,
            isLoading: false,
            isInitialized: true
          });
        }
      },
      
      reset: () => {
        set({
          user: null,
          session: null,
          isLoading: false,
          isInitialized: false,
        });
      },
    }),
    {
      name: 'opendreams-auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      // Only persist user and session data, not loading states
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
