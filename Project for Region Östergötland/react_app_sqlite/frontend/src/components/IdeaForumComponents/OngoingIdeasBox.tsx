import React from 'react'

type Props = {}

const OngoingIdeasBox = (props: Props) => {
  return (
    <div style= {{display:"flex", width:"400px", flexDirection:"column", alignItems:"center", marginLeft:"10px", marginTop:"12px", justifyContent:"center"}}>
        <div style={{fontWeight:"Bold", fontSize:"19px"}}>Mina Utkast:</div>
        <div style={{width:"350px", border:"3px solid #182745", borderRadius:"10px", height:"230px", backgroundColor:"#E5EFF7"}}>
        <div style={{backgroundColor:"#CEE3F0", width:"300px", marginLeft:"20px", height:"30px", marginTop:"10px", borderRadius:"2px"}}>
            <div style={{fontSize:"18px", marginLeft:"10px", display:"flex", alignItems:"center"}}>Förslag 1</div>
        </div>
        <div style={{backgroundColor:"#CEE3F0", width:"300px", marginLeft:"20px", height:"30px", marginTop:"10px", borderRadius:"2px"}}>
            <div style={{fontSize:"18px", marginLeft:"10px", display:"flex", alignItems:"center"}}>Förslag 2</div>
        </div>
        <div style={{backgroundColor:"#CEE3F0", width:"300px", marginLeft:"20px", height:"30px", marginTop:"10px", borderRadius:"2px"}}>
            <div style={{fontSize:"18px", marginLeft:"10px", display:"flex", alignItems:"center"}}>Förslag 3</div>
        </div>
        <div style={{backgroundColor:"#CEE3F0", width:"300px", marginLeft:"20px", height:"30px", marginTop:"10px", borderRadius:"2px"}}>
            <div style={{fontSize:"18px", marginLeft:"10px", display:"flex", alignItems:"center"}}>Förslag 4</div>
        </div>
        <div style={{backgroundColor:"#CEE3F0", width:"300px", marginLeft:"20px", height:"30px", marginTop:"10px", borderRadius:"2px"}}>
            <div style={{fontSize:"18px", marginLeft:"10px", display:"flex", alignItems:"center"}}>Förslag 5</div>
        </div>
        </div>
    </div>
  )
}

export default OngoingIdeasBox