// E:\programming\Project\transvidtexter\contexts\authContext.tsx

import { createContext, useContext, ReactNode } from 'react';
import axios from 'axios';

type AuthContextType = {
  user: any;
  isAuthenticated: boolean;
  entry: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = null; // ここを実装して現在のユーザーを取得
  const isAuthenticated = !!user;

  const entry = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/entry', { email, password });
      if (response.data.success) {
        // ここでユーザー情報をセットするなどの処理を追加
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/login', { email, password }); // 認証エンドポイントとの連携
      if (response.data.success) {
        // ここでユーザー情報をセットするなどの処理を追加
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      throw err;
    }
  };

  const logout = () => {
    // ログアウト処理を実装
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, entry, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};