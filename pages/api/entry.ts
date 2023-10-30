// E:\programming\Project\transvidtexter\pages\api\entry.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcrypt'; // パスワードのハッシュ化のためのライブラリ
import { pool } from '../../db'; // PostgreSQLとの接続のための設定

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, email, password } = req.body;

    // 入力バリデーションを行う...

    // パスワードのハッシュ化
    const hashedPassword = await hash(password, 10);

    // ユーザー情報の保存
    const result = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
      [username, email, hashedPassword]
    );

    res.status(200).json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
