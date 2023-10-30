// E:\programming\Project\transvidtexter\pages\api\termination.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../db'; // PostgreSQLとの接続のための設定
import jwt from 'jsonwebtoken';

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
    if (req.method !== 'DELETE') {
      return res.status(405).end();
    }

    // トークンの検証
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      // トークンが提供されていない場合、セッションやCookieをクリアする
      res.setHeader('Set-Cookie', 'session=; Max-Age=0');
      return res.status(401).json({ message: "トークンが提供されていません" });
    }
    const decoded = verifyToken(token);

    if (!decoded || !decoded.userId) {
      // 認証に失敗した場合、セッションやCookieをクリアする
      res.setHeader('Set-Cookie', 'session=; Max-Age=0');
      return res.status(401).json({ message: "認証されていません" });
    }

    const userId = decoded.userId;

    // データベースからユーザーを削除
    await deleteUserFromDatabase(userId);

    res.status(200).json({ message: "アカウントが削除されました" });

  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

async function deleteUserFromDatabase(userId: number) {
  await pool.query('DELETE FROM users WHERE id = $1', [userId]);
}
