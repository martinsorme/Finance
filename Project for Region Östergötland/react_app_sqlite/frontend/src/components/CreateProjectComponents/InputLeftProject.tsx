import React from 'react'
import TimelineProject from './TimeLineProject'
import TimeLineText from './TimeLineText'



type Props = {}

const InputLeftProject = (props: Props) => {
  
  return (
    //Calling for timeline and explanatory text to each stage 
    <div style={{ display: 'flex', flexDirection: 'row', marginLeft:"10px", backgroundColor:"white", height: "2050px" }}>
      <TimeLineText/>
      <TimelineProject/>
      
      
    </div>
  )
}

export default InputLeftProject