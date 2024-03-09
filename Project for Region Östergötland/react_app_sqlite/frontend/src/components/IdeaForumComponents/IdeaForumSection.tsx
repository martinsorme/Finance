import React from 'react'
import LightBlueHeader from '../LightBlueHeader'
import IdeaTabs from './IdeaTabs'
import IdeasForum2Body from './IdeasForum2Body'

type Props = {}

const IdeaForumSection = (props: Props) => {
  return (
    <div style={{backgroundColor: "white", width:"100%", flexDirection:"column"}}>
        <LightBlueHeader icon="mdi:lightbulb-on-outline" text="Förslagsbanken" isFinishProject={false}/>
        <IdeaTabs underline={2}/>
        <IdeasForum2Body/>

        </div>
  )
}

export default IdeaForumSection