import React from 'react'
import LightBlueHeader from '../components/LightBlueHeader'
import LeftSidePanel from '../components/LeftSidePanelComponents/LeftSidePanel'
import MainSection from '../components/AllProjectsComponents/MainSection'

type Props = {}

const AllProjectsPage = (props: Props) => {
    let name = JSON.parse(sessionStorage.getItem("auth") + "").unit;
  return (
    <div>
        <LeftSidePanel greenButton={5} />
        <LightBlueHeader icon="carbon:ibm-cloud-projects" text={"Alla förbättringsarbeten"}/>
        <MainSection/>
    </div>
  )
}

export default AllProjectsPage