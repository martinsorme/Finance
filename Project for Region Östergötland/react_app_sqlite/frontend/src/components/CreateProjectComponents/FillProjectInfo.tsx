import React from 'react'
import InputLeftProject from './InputLeftProject'
import InputRightProject from './InputRightProject'
import QuestionSection from './QuestionSection'

type Props = {}

const FillProjectInfo = (props: Props) => {
  return (
    <div style={{backgroundColor:"white", height:"100vh", flexDirection:"row", display:"flex"}}>
    <InputLeftProject/>
    <InputRightProject/>
    <QuestionSection/>
    </div>
  )
}

export default FillProjectInfo