// pages/api/videos/like.js

import { updateVideoLike } from './video.model';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { url, isLiked } = req.body;
    console.log("isLiked",req.body)
    await updateVideoLike(req.body);
    res.status(200).json({ message: 'Like updated' });
  } catch (error) {
    console.error('Error updating like:', error);
    res.status(500).json({ message: 'Error updating like' });
  }
}
