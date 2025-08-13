import React from "react";
import Audio from "../components/Audio";
import "../components/audio.css";

import Dropdown from "../components/Dropdown";
import MenuNavbar from "../components/MenuNavbar";
import Textbox from "../components/Textbox";
import Button from "../components/button";


const Blocking = () => {
  return (
    <div id="blocking-container">
      <MenuNavbar />  
      <div className="page-heading">
                <h1>Blocking</h1>
                <div className = "page-heading-right">
                    <Button className = "help-button" icon="?"/>
                    <Dropdown className = "dropdown" text="TeamName" />
                </div>
            </div>
      <Audio />
    </div>
  );
};

export default Blocking;