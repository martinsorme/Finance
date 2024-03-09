import React from 'react'

type Props = {tab:number}


   
    
const TabsCreateProject = ({tab}: Props) => {
    const getColor = (number: number) => {
        return tab === number ? "#CEE3EF": "#A0C8E3"
    }
  return (
    <div style={{display: "flex", flexDirection:"row"}}>
        <div style={{marginTop: "20px", marginLeft: "40px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(1), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Förbättringsförslag</div>
          <div style={{marginTop: "20px", marginLeft: "42px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(2), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Allmän information</div>
          <div style={{marginTop: "20px", marginLeft: "42px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(3), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Intressentanalys</div>
          <div style={{marginTop: "20px", marginLeft: "42px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(4), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Behovskarta</div>
          <div style={{marginTop: "20px", marginLeft: "42px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(5), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Omvärldsspanning</div>
      <div style={{marginTop: "20px", marginLeft: "42px", fontSize: "15px", 
                    color: "black", display: "flex", backgroundColor: getColor(6), width: "150px", 
                     height:"50px", justifyContent: "center", alignItems:"center" }}>Bearbetning</div>
     
    </div>
  )
}

export default TabsCreateProject