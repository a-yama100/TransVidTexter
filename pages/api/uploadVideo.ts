// E:\programming\Project\transvidtexter\pages\api\uploadVideo.ts

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import { pool } from '../../db';
import fs from 'fs';
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

    const form = new formidable.IncomingForm();
    form.parse(req, async (err: any, fields: any, files: any) => {
      if (err) {
        return res.status(500).json({ message: "ファイルのアップロード中にエラーが発生しました" });
      }

      const videoFile = files.video;
      const newFilePath = `/path/to/storage/${videoFile.name}`; 
      fs.rename(videoFile.path, newFilePath, async (err) => {
        if (err) {
          return res.status(500).json({ message: "ファイルの保存中にエラーが発生しました" });
        }

        // データベースに動画の情報を保存
        await pool.query('INSERT INTO videos (user_id, path) VALUES ($1, $2)', [userId, newFilePath]);

        res.status(200).json({ message: "動画のアップロードに成功しました" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: (error as any).message });
  }
}
