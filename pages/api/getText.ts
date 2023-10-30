// E:\programming\Project\transvidtexter\pages\api\getText.ts

import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { pool } from '../../db';

const SECRET_KEY = process.env.SECRET_KEY as string;

function verifyToken(token: string): any {
    try {
        return jwt.verify(token, SECRET_KEY);
    } catch (error) {
        return null;
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    // トークンの検証
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "トークンが提供されていません" });
    }
    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: "認証されていません" });
    }

    const userId = decoded.userId; 

    const videoId = Array.isArray(req.query.videoId) ? req.query.videoId[0] : req.query.videoId; // 修正点
    if (!videoId) {
      return res.status(400).json({ message: "動画IDが必要です" });
    }

    // データベースからテキストを取得
    const text = await getConvertedTextFromDatabase(videoId);

    res.status(200).json({ text });

  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

async function getConvertedTextFromDatabase(videoId: string): Promise<string> {
  const result = await pool.query('SELECT text FROM converted_texts WHERE video_id = $1', [videoId]);
  return result.rows[0].text;
}
