import React from 'react'
import WhatChangeIdea from './WhatChangeIdea'
import OngoingIdeasBox from './OngoingIdeasBox'

type Props = {}

const RightSideIdea = (props: Props) => {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
        <WhatChangeIdea/>
        <OngoingIdeasBox/>
        </div>
  )
}

export default RightSideIdea