// E:\programming\Project\transvidtexter\pages\signup.tsx

// pages/signup.tsx
import React, { useState, FormEvent } from 'react'; // FormEventをインポート
import { useAuth } from '../contexts/authContext';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { entry } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => { // 型を指定
    e.preventDefault();
  
    try {
      await entry(email, password);
      const response = await axios.post('/api/entry', { username, email, password }); 
      if (response.data.success) {
        login(email, password);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('アカウントの作成に失敗しました。再試行してください。');
    }
  };

  return (
    <div className="container">
      <h2>新規登録</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">ユーザー名</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
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
        <button type="submit" className="btn btn-primary">アカウントを作成</button>
      </form>
    </div>
  );
}
