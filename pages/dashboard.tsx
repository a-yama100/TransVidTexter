// E:\programming\Project\transvidtexter\pages\dashboard.tsx

import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/authContext';
import axios from 'axios';
import Link from 'next/link';

type VideoType = {
    id: number;
    name: string;
};

export default function Dashboard() {
    const { user, logout } = useAuth();
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
      // ダッシュボード情報を取得
      axios.get('/api/dashboard')
        .then(response => {
          setVideos(response.data.videos);
        })
        .catch(error => {
          setError('ダッシュボードの情報取得に失敗しました。');
        });
    }, []);

    return (
      <div className="container mt-5">
        <h2>ダッシュボード</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <h3>動画と文字起こしの履歴</h3>
        <ul>
          {videos.map(video => (
            <li key={video.id}>
              {video.name} - <Link href={`/texts/${video.id}`}>テキストを表示</Link>
            </li>
          ))}
        </ul>
        <h3>アップロード</h3>
        {/* ここに動画アップロードのコードを追加 */}
        <h3>アカウント操作</h3>
        <Link href="/updateProfile">アカウント情報の更新</Link>
        <br />
        <Link href="/terminateAccount">アカウントを退会</Link>
        <br />
        <button onClick={logout} className="btn btn-danger mt-3">ログアウト</button>
      </div>
    );
  }
