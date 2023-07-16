import { getVideo, createVideo } from './video.model';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const video = await getVideo();
      res.status(200).json(video);
    } catch (error) {
      console.error('Error fetching video:', error);
      res.status(500).json({ message: 'Error fetching video' });
    }
  } else if (req.method === 'POST') {
    try {
      const videoData = req.body;

      const createdVideo = await createVideo(videoData);
    //   const video = await getVideo(videoData);

    //   res.status(200).json(video);
      res.status(200).json({ message: 'Video created', video: createdVideo });
    } catch (error) {
      console.error('Error creating video:', error);
      res.status(500).json({ message: 'Error creating video' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}