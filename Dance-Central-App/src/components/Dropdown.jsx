import React from "react";

import './dropdown.css';
import Button from "./button";
import DropdownMenu from "./DropdownMenu";

const Dropdown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [openSymbol, setOpenSymbol] = React.useState(" ▼");
    const menuId = props.text + "Id"

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
                <ul className="dropdown-menu">
                    <li className="dropdown-item"><button>{props.text}</button></li>
                    <li>{menuId}</li>
                </ul>

            </Button>
            <div>{menuId}</div>
            <DropdownMenu id={menuId} />
        </div>
    )
}

export default Dropdown;