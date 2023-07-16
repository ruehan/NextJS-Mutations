import useSWR, { mutate } from "swr"
import styled from "styled-components"
import { useEffect, useState } from "react"
import useMutation from "@/libs/useMutation"

const NewButton = styled.button`

`

const LikeButton = styled.button`

`

export default function Home() {

  // const { data, error, mutate } = useApi()

  const [liked, {loading, data}] = useMutation("/api/liked_video")



  function useApi(){
    return useSWR("/api/video")
  }

  function onClick() {
    mutate("/api/video")
  }


 
  console.log(data)

  // if (error) return <div>Error!!</div>
  // if (!data) return <div>Loading~~</div>

  if (loading) return liked(data)
  
  return (
    <>
      <video src={data.url} autoPlay muted loop height={"500px"}></video>
      <NewButton onClick={onClick}>{loading? "loading" : "not loading"}</NewButton>
      <LikeButton>Like?!</LikeButton>
    </>
  )
}
