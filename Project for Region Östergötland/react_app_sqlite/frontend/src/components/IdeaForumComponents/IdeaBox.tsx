import React, {useState} from 'react'
import SearchFilter from './SearchFilter'
import SuggestionBox from './SuggestionBox'



type Props = {}

const names: any = ["Förbättringsförslag 1", "Förbättringsförslag 2", "Förbättringsförslag 3", 
                "Förbättringsförslag 4", "Förbättringsförslag 5", "Förbättringsförslag 6", "Förbättringsförslag 7", 
                "Förbättringsförslag 8", "Förbättringsförslag 9" ]


const IdeaBox = (props: Props) => {
    const [inputValue, setInputValue] = useState('');

const filteredNames = names.filter((name: string) => name.toLowerCase().includes(inputValue.toLowerCase()));
  return (
    <div style={{display:"flex", flexDirection: "column", backgroundColor: "#E5F0F8", 
    width:"700px", marginLeft:"50px", borderRadius:"10px", height: "550px", overflowY:"auto"}}>
        <SearchFilter input = {setInputValue}/>
        {filteredNames.map((name: string) => (
                <SuggestionBox name = {name}/>
            
        ))}

       </div>
  )
}

export default IdeaBox