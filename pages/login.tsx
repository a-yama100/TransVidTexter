// E:\programming\Project\transvidtexter\pages\login.tsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/entry', { email, password }); // 認証エンドポイントとの連携
      if (response.data.success) {
        login(email, password); // 認証コンポーネント/フックの利用
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('ログインに失敗しました。再試行してください。');
    }
  };

  return (
    <div className="container">
      <h2>ログイン</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">メールアドレス</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">パスワード</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">ログイン</button>
      </form>
      <div className="mt-3">
        <a href="/reset-password">パスワードを忘れた場合</a>
      </div>
    </div>
  );
}
