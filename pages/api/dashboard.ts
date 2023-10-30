// E:\programming\Project\transvidtexter\pages\api\dashboard.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { pool } from '../../db'; // PostgreSQLとの接続のための設定
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY as string;

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

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
    // トークンの検証
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: "トークンが提供されていません" });
        return;
    }
    const decoded = verifyToken(token);

    const userId = decoded.userId; // トークンのペイロードからユーザーIDを取得

    // ユーザー関連の情報をデータベースから取得
    const result = await pool.query('SELECT * FROM dashboard WHERE user_id = $1', [userId]);

    // 何らかの情報を取得できなかった場合の処理
    if (!result.rows.length) {
      res.status(404).json({ message: "情報が見つかりませんでした" });
      return;
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
