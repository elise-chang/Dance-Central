import React from "react";

import './dropdown.css';
import Button from "./button";

const Dropdown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [openSymbol, setOpenSymbol] = React.useState(" ▼");


    const doOpen = () => {

        if (open == false) {
            setOpen(true);
            setOpenSymbol(" ▲");
            //add more here for the other stuff later
        } else {
            setOpen(false);
            setOpenSymbol(" ▼");
            // add more here for the other stuff later
        }
    }


    return (
        <div className="dropdown">
            <Button text={props.text + openSymbol} className="dropdown-bg" onClick={doOpen}>
                <span>{props.text}</span>
                <ul className="dropdown-menu">
                    <li className="dropdown-item"><button>{props.text}</button></li>
                    <li>hi</li>
                </ul>

            </Button>
        </div>
    )
}

export default Dropdown;