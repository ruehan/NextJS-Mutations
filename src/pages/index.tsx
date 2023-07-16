import styled from 'styled-components';
import useSWR, { mutate } from 'swr';


const Container = styled.div`  
  width: 70%;
  height: 90vh;
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 5vh;
  left: 15%;
  overflow: hidden;
`

const Title = styled.h1`
  font-size: 50px;
  color: white;
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
`

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  /* justify-content: space-between; */
  justify-content: center;
`

const Button = styled.button`
  width: 50%;
  height: 50px;
  margin: 20px;
  font-size: 25px;
`


const VideoPage = () => {
  const { data, error } = useSWR('/api/videos');

  console.log(data)

  if (error) {
    return <div>Error fetching videos</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleLike = async () => {
    const updatedVideo = { ...data, isLiked: !data.isLiked };

    mutate('/api/videos', updatedVideo, false);

    try {
      await fetch('/api/like', {
        method: 'POST',
        body: JSON.stringify({ url: data.url , isLiked: data.isLiked}),
        headers: {
          'Content-Type': 'application/json',
        },

      });

      mutate('/api/videos', updatedVideo);
    } catch (error) {
      console.error('Error updating like:', error);
      mutate('/api/videos', data, true);
    }
  };

  const handleFetchNewVideo = async () => {

    mutate('/api/videos');
  };

  return (
    <Container>
      <Title>Dog Video</Title>
      {data && (
        <Box>
          <h3>{data.url}</h3>
          <video src={data.url} autoPlay loop muted height={"500px"}></video>
          <ButtonContainer>
            <Button onClick={handleLike}>{data.isLiked ? '싫어요' : '좋아요'}</Button>
            <Button onClick={handleFetchNewVideo}>새로운 영상</Button>
          </ButtonContainer>
        </Box>
      )}
      
    </Container>
  );
};

export default VideoPage;
