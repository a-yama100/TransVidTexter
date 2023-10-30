// E:\programming\Project\transvidtexter\pages\updateProfile.tsx

import React, { useState, useEffect } from 'react'; // useEffect をインポート
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router'; // useRouter をインポート

const UpdateProfile: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const { isAuthenticated } = useAuth(); // isAuthenticated を取得
  const router = useRouter(); // router インスタンスを取得

  // ユーザーがログインしているかどうかを確認
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('パスワードが一致していません');
      return;
    }

    try {
      const response = await axios.post('/api/update', {
        email,
        password,
      });

      if (response.data.success) {
        setMessage('会員情報を更新しました');
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
        if (err instanceof Error) {
          setMessage(err.message);
        } else {
          setMessage('エラーが発生しました');
        }
      }
  };

  return (
    <div className="container mt-5">
      <h2>会員情報更新</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">メールアドレス</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">新しいパスワード</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">パスワードの確認</label>
          <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">更新</button>
        </form>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default UpdateProfile;
