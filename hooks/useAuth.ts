import { useAuthStore } from '../stores/auth-store';

export const useAuth = () => {
  const {
    user,
    session,
    isLoading,
    isInitialized,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    isAuthenticated,
  } = useAuthStore();

  return {
    // State
    user,
    session,
    isLoading,
    isInitialized,
    isAuthenticated: isAuthenticated(),
    
    // Actions
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
};
