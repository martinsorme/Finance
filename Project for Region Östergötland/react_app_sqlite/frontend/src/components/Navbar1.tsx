/* Currently unused but good to have */

import React from "react";
import logo1 from '../images/ROlogo-P-vit.png';
import { Icon } from '@iconify/react';

type Props = {};

export default function Navbar({}: Props) {
  return ( 
    <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#182745", position:"fixed", right:0, left: 0, top: 0 }}>
    <div id="navbar-brand">
      <a href="/">
      <img src={logo1} alt="logo" width="300" height="75" style={{"marginLeft" : "15px"}} />
      </a>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav" style={{display : "flex" , "marginLeft" : "88%"}}>
      <li className="nav-item">
  <a className="nav-link" aria-current="page" href="/" style={{ color: "white", fontSize: "15px", display: "flex", flexDirection: "column", alignItems: "center"  }}>
    <Icon icon="ic:baseline-notifications-active" color="white" width="30" />
    Aviseringar
      </a>
      </li>
      <li className="nav-item">
      <a className="nav-link" href="/" style={{ color: "white", fontSize: "15px", display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px", marginLeft: "10px" }}>Logga ut
        <Icon icon="ic:baseline-log-out" color="white" width="20" style={{ marginLeft: "5px" }} />
    
      </a>
    </li>
      </ul>
    </div>
  </nav>

  );
}
