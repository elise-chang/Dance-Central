import React from "react";

import './dropdown.css';

const Dropdown = (props) => {
    const [open, setOpen] = React.useState(false);

    const doOpen = () => {
        if (open == false) {
            setOpen(true);
            //add more here for the other stuff later
        } else {
            setOpen(false);
            // add more here for the other stuff later
        }
    }

    return (
        <div className="dropdown">
            <div className="dropdown-bg" onClick={doOpen}>
                <span>{props.text}</span>
                <ul className="dropdown-menu">
                    <li className="dropdown-item"><button>{props.text}</button></li>
                    <li>hi</li>
                </ul>

            </div>
        </div>
    )
}

export default Dropdown;