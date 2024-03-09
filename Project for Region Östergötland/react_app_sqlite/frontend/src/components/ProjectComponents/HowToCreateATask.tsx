import React from 'react'

const HowToCreateATask = () => {
    return (
        <div style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ backgroundColor: 'var(--darkblue)', color:'#ffffff', textAlign: 'center', borderRadius:'20px'}}>Hur du skapar en ny uppgift:</h3>
        <p style={{ color: 'var(--darkblue)' }}>
          <b>Skapa en ny uppgift genom att följa dem här stegen:</b>
        
          <ol>
            <li>Namge uppgiften med ett lämpligt namn.</li>
            <li>Beskriv uppgiften i "Beskrivning" för att delge viktig eller lämplig information för att kunna genomföra uppgiften.</li>
            <li><b>Vet du vem som ska genomföra uppgiften?</b> Klicka på knappen "Tilldela uppgift" för att tilldela en team-medlem uppgiften. </li>
            <li><b>Finns det att datum som uppgiften måste vara klar?</b> Lägg till ett datum på uppgiften genom att klicka på "Datum". </li>
            <li><b>Färdig?</b> Spara uppgiften genom att klicka på 'Spara'. Uppgiften läggs då till under 'Att göra'.</li>
          </ol>
        </p>
      </div>
    );
  };

export default HowToCreateATask;