// E:\programming\Project\transvidtexter\pages\api\update.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../db'; // PostgreSQLとの接続のための設定
import bcrypt from 'bcrypt'; // パスワードのハッシュ化のためのライブラリ
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
    if (req.method !== 'POST') {
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

    const { password, email } = req.body;

    // パスワードのハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // データベースでユーザー情報を更新
    await updateUserInDatabase(userId, hashedPassword, email);

    res.status(200).json({ message: "情報が更新されました" });

  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}

async function updateUserInDatabase(userId: number, password: string, email: string) {
  await pool.query('UPDATE users SET password = $1, email = $2 WHERE id = $3', [password, email, userId]);
}
