import React from 'react';


type props = {}
const TimelineProject = (props : props) => {
  const bulletStyle = {width: '10px', height: '10px', backgroundColor: '#162745', border: '4px solid #182745', borderRadius: '50%' }

  //returns style of the bullets 
  const getStyle = (h: string) => {
    return { width: '1px', border: 'none', backgroundColor: '#182745', height: h, margin: 'auto' }
}
const lineItems = [
  { key: 1, value: "960px" },
  { key: 2, value: "280px" },
  {key: 3 , value: "175px"}, 
  { key: 4, value: "300px" },
  // { key: 5, value: "80px" },
];
    
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop:"40px", marginLeft:"10px", backgroundColor:"white" }}>
       <div>
        <div style={bulletStyle}></div>
      </div>
      {lineItems.map((item)=>(
        <div key= {item.key}>
        <div  style={getStyle(item.value)} />
          <div style={bulletStyle}></div>
        </div>
      ))}
     
    </div>
  )
}
export default TimelineProject;
