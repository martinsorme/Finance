import React from 'react'
import LightBlueHeader from '../LightBlueHeader'
import FillProjectInfo from './FillProjectInfo'

type Props = {tab : number, timeline: number}

const CreateProjectSection = ({tab,timeline}: Props) => {
  return (
    <div style={{backgroundColor: "#E5F0F7", width:"100%", flexDirection:"column"}}>
        <LightBlueHeader icon="iconoir:clipboard-check" text="Skapa nytt Förbättringsarbete" isFinishProject={false}/>
        <FillProjectInfo/>
        </div>
  )
}

export default CreateProjectSection