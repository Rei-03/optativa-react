import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';

// Estado
interface UserState {
  name: string;
  email: string;
  isLoggedIn: boolean;
}

// Acciones
type UserAction =
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'LOGIN' }
  | { type: 'LOGOUT' };

// Reducer
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'SET_NAME':
      return { ...state, name: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, name: '', email: '' };
    default:
      return state;
  }
};

// Estado inicial
const initialState: UserState = {
  name: '',
  email: '',
  isLoggedIn: false,
};

// Contexto
const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

// Provider
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};