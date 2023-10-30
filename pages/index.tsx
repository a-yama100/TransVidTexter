// E:\programming\Project\transvidtexter\pages\index.tsx

import Header from '../components/Header';
import Footer from '../components/Footer';
import { useAuth } from '../contexts/authContext';

export default function Home() {
    const { user, isAuthenticated } = useAuth(); // 認証情報を取得
  
    return (
      <div className="container">
        <Header />
  
        <div className="content">
          <h1>Welcome to TransVidTexter</h1>
          <p>アプリケーションの概要や主な機能を紹介。</p>
  
          {!isAuthenticated ? (
            <div>
              <a href="/login" className="btn btn-primary">ログイン</a>
              <a href="/signup" className="btn btn-secondary">新規登録</a>
            </div>
          ) : (
            <p>Welcome, {user.username}!</p>
          )}
        </div>
  
        <Footer />
      </div>
    );
  }
  