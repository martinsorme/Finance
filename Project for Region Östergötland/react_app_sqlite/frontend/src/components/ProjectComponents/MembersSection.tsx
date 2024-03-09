import React from 'react'
import { Icon } from '@iconify/react';


type Props = {
  member: string
}

const MembersSection = ({member}: Props) => {
  return (
      <div style={{ display: "flex", alignItems: "center", marginLeft: "8%", marginTop: "5%" }}>
        <Icon icon="octicon:person-fill-16" width="40" height="40" style={{ color: "#182745" }} />
        <div style={{fontSize:"18px", marginLeft:"4%"}}>{member}</div>
      </div>
    )
  }
  

export default MembersSection


                