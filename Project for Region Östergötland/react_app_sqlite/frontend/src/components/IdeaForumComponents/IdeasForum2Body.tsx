import React from 'react'
import IdeaBox from './IdeaBox'
import RightSideIdea from './RightSideIdea'

type Props = {}

const IdeasForum2Body = (props: Props) => {
  return (
    <div style={{display:"Flex", flexDirection:"row", marginTop:"70px", width:"100%"}}>
        <IdeaBox/>
        <RightSideIdea/>
        </div>
  )
}

export default IdeasForum2Body