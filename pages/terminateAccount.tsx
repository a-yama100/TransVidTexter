// E:\programming\Project\transvidtexter\pages\terminateAccount.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';
import { useRouter } from 'next/router';

const TerminateAccount: React.FC = () => {
  const [message, setMessage] = useState('');
  const { logout } = useAuth();
  const router = useRouter();

  const handleTerminate = async () => {
    try {
      const response = await axios.post('/api/termination');

      if (response.data.success) {
        logout(); // ログアウト処理
        router.push('/'); // ホームページにリダイレクト
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage('退会処理中にエラーが発生しました。');
    }
  };

  return (
    <div className="container mt-5">
      <h2>会員退会</h2>
      <p>本当に退会しますか？ 一度退会すると、すべてのデータが削除されます。</p>
      <button onClick={handleTerminate} className="btn btn-danger">退会する</button>
      {message && <div className="mt-3">{message}</div>}
    </div>
  );
};

export default TerminateAccount;
