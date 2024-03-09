import React, {useState} from 'react'

type Props = {}

const WhatChangeIdea = (props: Props) => {
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInput1] = useState('')

    const handleInputChange = (e :React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
    const handleInputChange1 = (e :React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput1(e.target.value);
      };
  return (
    <div style= {{display:"flex", width:"400px", flexDirection:"column", marginLeft:"10px", alignItems:"center"}}>
        <div style={{fontWeight:"Bold", fontSize:"19px"}}>Vad vill du förändra?</div>
        <div style={{width:"350px", border:"3px solid #182745", borderRadius:"10px", height:"230px"}}>
            <div style={{fontWeight:"bold", fontSize:"13px", marginLeft:"15px", marginTop:"15px"}}>
                Vad tycker du borde förbättras? 
            </div>
            <input style={{fontSize:"13px",border:"1px solid #182745",marginLeft:"15px", marginTop: "10px", 
            borderRadius:"10px", backgroundColor: "#E5EFF7", width:"300px", height:"30px", paddingLeft:"20px",  boxShadow: "0 0 20px rgba(0, 0, 0, 0.3) "}} 
        type="text" placeholder="Beskriv här..." value={inputValue} onChange={handleInputChange}>
        </input>
        <div style={{fontWeight:"bold", fontSize:"13px", marginLeft:"15px", marginTop:"15px"}}>
                Vad tycker du borde förbättras? 
            </div>
            <textarea style={{ resize: "none", fontSize:"13px",border:"1px solid #182745", marginLeft:"15px", marginTop:"5px", paddingTop:"5px",
            borderRadius:"10px", backgroundColor: "#E5EFF7", width:"300px", height:"60px", paddingLeft:"20px",  boxShadow: "0 0 20px rgba(0, 0, 0, 0.3) "}} 
               placeholder="Beskriv här..." value={inputValue1} onChange={handleInputChange1}>
        </textarea>
        <button style={{height:"30px",width:"120px", color: "white", backgroundColor:"#182745", display:"flex", 
                    justifyContent:"center", alignItems:"center", borderRadius:"10px", 
                    fontSize:"13px", fontWeight:"bold", marginTop:"5px", marginLeft: "110px"}}>Spara Förslag</button>

        </div>
        


    </div>
  )
}

export default WhatChangeIdea