// E:\programming\Project\transvidtexter\pages\upload.tsx

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { useAuth } from '../contexts/authContext';

export default function Upload() {
  const { isAuthenticated } = useAuth();
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const formData = new FormData();
      formData.append('video', acceptedFiles[0]);

      const response = await axios.post('/api/uploadVideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
          setUploadProgress(percentCompleted);
        },
      });

      if (response.data.success) {
        setUploadStatus('アップロード成功!');
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
        if (err instanceof Error) {
          setUploadStatus('アップロード失敗: ' + err.message);
        } else {
          setUploadStatus('アップロード失敗: 未知のエラー');
        }
      }
    }

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        accept: 'video/*' as const,
    });

  if (!isAuthenticated) {
    return <div>ログインしてください。</div>;
  }

  return (
    <div className="container mt-5">
      <h2>動画アップロード</h2>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>動画をこちらにドラッグ&ドロップするか、クリックしてファイルを選択してください。</p>
      </div>
      {uploadProgress !== null && (
        <div>
          アップロード進行中: {uploadProgress}%
        </div>
      )}
      {uploadStatus && <div>{uploadStatus}</div>}
    </div>
  );
}
