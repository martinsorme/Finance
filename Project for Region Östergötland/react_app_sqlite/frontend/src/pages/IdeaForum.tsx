import React from 'react'
import LeftSidePanel from '../components/LeftSidePanelComponents/LeftSidePanel'
import IdeaForumSection from '../components/IdeaForumComponents/IdeaForumSection'

const IdeaForum = () => {
  return (
    <div style={{ display: "flex", flexDirection: "row"}}>
      <LeftSidePanel greenButton={4}/>
      <IdeaForumSection/>
</div>
  )
}

export default IdeaForum