import React from 'react'
/*import all images from PGSA_Components folder */
import PGSA_P from '../images/PGSA_Components/PGSA_P.png'
import PGSA_G from '../images/PGSA_Components/PGSA_G.png'
import PGSA_S from '../images/PGSA_Components/PGSA_S.png'
import PGSA_A from '../images/PGSA_Components/PGSA_A.png'
import PGSA_NA from '../images/PGSA_Components/PGSA_NA.png'



type Props = {
    status: string,
    size: string
}

const PgsaDisplay = ({status, size}: Props) => {
    /*write a switch statement */
    var src = PGSA_NA;
    switch(status){
        case "P":
            src = PGSA_P;
            break;
        case "D":
            src = PGSA_G;
            break;
        case "S":
            src = PGSA_S;
            break;
        case "A":
            src = PGSA_A;
            break;
        default:
            src = PGSA_NA;
    }
  return (
    <img
        src={src}
        alt= {status}
        style={{ width: size, height: size, opacity: "100%"}}
      />
  )
}

export default PgsaDisplay