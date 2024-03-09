import React from 'react'
import { Icon } from '@iconify/react';
type Props = {greenButton : number}

const ButtonsSidePanel = ({greenButton}: Props) => {
    const getBorderColor = (number: number) => {
        return greenButton === number ? "#B9D87A": "#A9D7FF"
    }
    
  return (
    <div style={{marginTop: "20px", display:"flex", justifyContent:"center", flexDirection:"column", marginRight:"10px",marginLeft:"10px" }}>
     <a href="/" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: getBorderColor(1), color: "#182745", display: "flex", alignItems: "center", height:"60px" }}>
  <Icon icon="ic:outline-home" color="#182745" width="50" height="50" style={{ margin: "center"  }} />
  <span style={{ fontWeight: "bold",fontSize: "18px", display: "flex", alignItems:"center", justifyContent:"center", marginLeft:"50px"}}>Hem</span>
</a>
<a href="/dinaforbattringsarbeten" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: getBorderColor(2), color: "#182745", display: "flex", alignItems: "center", marginTop:"10px", height:"60px" }}>
  <Icon icon="ph:squares-four" color="#182745" width="57" height="50"  style={{ margin: "center" }} />
  <span style={{ fontWeight: "bold",display: "flex", alignItems:"center", justifyContent:"center", marginLeft:"1px", fontSize:"15px"}}>Mina förbättringsarbeten</span>
</a>
<a href="/skapaforbattringsforslag" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: getBorderColor(3), color: "#182745", display: "flex", alignItems: "center", marginTop:"10px", height:"60px" }}>
  <Icon icon="iconoir:add-page" color="#182745" width="69" height="50" style={{ margin: "center"  }} />
  <span style={{ fontWeight: "bold",display: "flex", alignItems:"center", justifyContent:"center", marginLeft:"1px", fontSize:"15px"}}>Skapa nytt förbättringsförslag</span>
</a>
<a href="/allaforbattringsarbeten" className="btn btn-primary btn-lg active" role="button" aria-pressed="true" style={{ backgroundColor: getBorderColor(5), color: "#182745", display: "flex", alignItems: "center", marginTop:"10px", height:"60px" }}>
<Icon icon="carbon:ibm-cloud-projects" color="#182745" width="50" height="50" style={{ margin: "center" }} />
  <span style={{ fontWeight: "bold", fontSize: "15px", display: "flex", alignItems:"center", justifyContent:"center", marginLeft:"3px"}}>Alla förbättringsarbeten</span>
</a>


    </div>
  )
    
}


export default ButtonsSidePanel