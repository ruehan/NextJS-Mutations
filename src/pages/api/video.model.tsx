import client from '@/libs/client';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const getVideo = async () => {
//   return client.video.findFirst();
    const newVideo = await fetch('https://dogs-api.nomadcoders.workers.dev/dogs/random');
    const data = await newVideo.json();


    createVideo(data)

    return data

};

export const updateVideoLike = async (data) => {

  // console.log("url : ", isLiked.url)
  return client.video.update({
    where: {
        url: data.url
    },
    data: {
      isLiked: !data.isLiked,
    },
  });
};

export const createVideo = async (videoData: { url: string; }) => {

    if ( await client.video.findFirst({
        where: {
          url: videoData.url
        }
      })) {
        return null
  } else {
      
      return client.video.create({
        data: {
            url: videoData.url
        }
  })
  }
}