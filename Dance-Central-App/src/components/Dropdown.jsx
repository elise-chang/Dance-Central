import React from "react";

import './dropdown.css';
import Button from "./button";
import DropdownMenu from "./DropdownMenu";

const Dropdown = (props) => {
    const [open, setOpen] = React.useState(false);
    const [openSymbol, setOpenSymbol] = React.useState(" ▼");
    const menuId = props.text + "Id"
    const [items, setItems] = React.useState([{id: 1, text: props.text }])
    const [hidden, setHidden] = React.useState(true);

    // React.useEffect(() => {
    //     const menuBar = document.getElementById("menu-bg");
    //     if (!menuBar) return;
    //     if (isMenuOpen) {
    //         menuBar.style.display = "flex";
    //     } else if (isMenuOpen == false) {
    //         menuBar.style.display = "none";
    //     }
    // }, [isMenuOpen]);

    const doOpen = () => {

        if (open == false) {
            setOpen(true);
            setOpenSymbol(" ▲");
            //add more here for the other stuff later
            setHidden(false);
            return (
                <div className="dropdown">
                    <Button text={props.text + openSymbol + "0"} className="dropdown-bg" onClick={doOpen} />
                    {/* <ul className="dropdown-menu">
                        <li className="dropdown-item"><button>{props.text}</button></li>
                        <li>{menuId}</li>
                    </ul>
                    <div>{menuId}</div>
                    <DropdownMenu id={menuId} /> */}
                </div>
            );
            
        } else {
            setOpen(false);
            setOpenSymbol(" ▼");
            // add more here for the other stuff later
            setHidden(true);
        }
    }


    return (
        <div className="dropdown">
            <Button text={props.text + openSymbol} className="dropdown-bg" onClick={doOpen} />
            <ul>
                <li>item</li>
            </ul>
        </div>
    );
}

export default Dropdown;