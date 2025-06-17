import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Temporary types until Better Auth is fully working
interface User {
  id: string;
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  batch?: string;
  admissionCode?: string;
}

interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
}

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
      
      // Auth methods (Mock implementation for now)
      signIn: async (email: string, password: string) => {
        try {
          set({ isLoading: true });

          // Mock authentication - replace with real implementation later
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

          if (email === 'test@example.com' && password === 'password') {
            const mockUser: User = {
              id: '1',
              email,
              name: 'Romaric Test',
              firstName: 'Romaric',
              lastName: 'Test',
            };

            const mockSession: Session = {
              id: 'session-1',
              userId: '1',
              expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            };

            set({
              user: mockUser,
              session: mockSession,
              isLoading: false
            });
            return { success: true };
          } else {
            set({ isLoading: false });
            return { success: false, error: 'Invalid email or password' };
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

          // Mock sign up - replace with real implementation later
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

          const mockUser: User = {
            id: Math.random().toString(36).substr(2, 9),
            email: data.email,
            name: data.name,
            firstName: data.name.split(' ')[0],
            lastName: data.name.split(' ').slice(1).join(' '),
            admissionCode: data.admissionCode,
          };

          const mockSession: Session = {
            id: 'session-' + Math.random().toString(36).substr(2, 9),
            userId: mockUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          };

          set({
            user: mockUser,
            session: mockSession,
            isLoading: false
          });
          return { success: true };
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

          // Mock Google sign in - replace with real implementation later
          await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate OAuth flow

          const mockUser: User = {
            id: 'google-' + Math.random().toString(36).substr(2, 9),
            email: 'romaric@gmail.com',
            name: 'Romaric Google',
            firstName: 'Romaric',
            lastName: 'Google',
          };

          const mockSession: Session = {
            id: 'session-google-' + Math.random().toString(36).substr(2, 9),
            userId: mockUser.id,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
          };

          set({
            user: mockUser,
            session: mockSession,
            isLoading: false
          });
          return { success: true };
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

          // Mock sign out - replace with real implementation later
          await new Promise(resolve => setTimeout(resolve, 500));

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

          // Mock initialization - check if user data exists in storage
          // The persist middleware will automatically restore user/session from AsyncStorage
          await new Promise(resolve => setTimeout(resolve, 500)); // Simulate initialization delay

          set({
            isLoading: false,
            isInitialized: true
          });
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
