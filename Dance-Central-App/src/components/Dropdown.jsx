import React from "react";

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
        <div>
            <div onClick={doOpen}>
                <span>{props.text}</span>
                <></>

            </div>
        </div>
    )
}

export default Dropdown;