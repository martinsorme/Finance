import React from 'react'
import HowToAnswer from './HowToAnswer'

type Props = {}

// Descriptions for how to answer each input
const QuestionSection = (props: Props) => {
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
        <HowToAnswer title={"Jag behöver hjälp"} qtitle ={"Du ska tänka på följande:"} description={"Fundera över hur situationen är just nu och på vilket sätt ditt förslag kan förbättra denna situation. Målet är att sätta ord på varför förändringen bör genomföras och varför det är något som ska prioriteras."} top="310px"/>
        <HowToAnswer title={"Jag behöver hjälp"} qtitle={"Du ska tänka på följande:"} description={"Fundera över hur denna förändring påverkar patientupplevelsen och på vilka sätt den leder till en förbättring för patienten. På vilka sätt påverkas patienten av denna förändringen?"} top="220px"/>
        <HowToAnswer title={"Jag behöver hjälp"} qtitle ={"Du ska tänka på följande:"} description={"Fundera över vilka resurser som behövs, vilket stöd eller hjälp som personen som genomför förändringen behöver och vilken kunskap och kompetens som behövs för att kunna genomföra förändringen."} top="120px"/>
        <HowToAnswer title={"Jag behöver hjälp"} qtitle={"Du ska tänka på följande:"} description={"Det är viktigt att kunna mäta förändringen. Fundera därför på hur vi mäter läget just nu och vad som behöver mätas för att kunna avgöra huruvida förändringen leder till en förbättring eller inte."} top="215px"/>
        
    </div>
  )
}


export default QuestionSection