// E:\programming\Project\transvidtexter\pages\api\convertAudio.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../db'; // PostgreSQLとの接続のための設定

// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string;

function generateToken(payload: any): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
}

function verifyToken(token: string): any {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).end();
    }

    // トークンの検証
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "トークンが提供されていません" });
    }

    // ここでverifyTokenの結果をdecodedに格納
    const decoded = verifyToken(token);

    const userId = decoded.userId;  // トークンのペイロードからユーザーIDを取得

    const videoId = req.body.videoId;
    if (!videoId) {
      return res.status(400).json({ message: "動画IDが必要です" });
    }

    // 動画の取得 (仮の実装)
    const videoPath = await getVideoPathFromDatabase(videoId);

    // 音声の抽出と変換
    const extractedAudioPath = await extractAudioFromVideo(videoPath);
    const text = await convertAudioToTextWithGoogle(extractedAudioPath);

    // データベースに変換されたテキストを保存
    await saveConvertedTextToDatabase(videoId, text);

    res.status(200).json({ message: "音声の変換に成功しました" });

  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

// 以下の関数は、実際の実装で必要な外部ライブラリやAPIを使用して定義する必要があります。

async function getVideoPathFromDatabase(videoId: string): Promise<string> {
  // データベースから動画のパスを取得
  const result = await pool.query('SELECT path FROM videos WHERE id = $1', [videoId]);
  return result.rows[0].path;
}

async function extractAudioFromVideo(videoPath: string): Promise<string> {
  // TODO: 実際の実装を追加
  return "path_to_extracted_audio";
}

async function convertAudioToTextWithGoogle(audioPath: string): Promise<string> {
  // GoogleのSpeech-to-Text APIを使用して音声をテキストに変換します。
  return "path_to_extracted_audio";
}

async function saveConvertedTextToDatabase(videoId: string, text: string) {
  // データベースに変換されたテキストを保存します。
}
