import React from "react";

const Button = ({
    text,
    icon,
    image,
    onClick,
}) => {
    const handleClick = (e) => {
        //implementation
        if (onClick) {
            onClick(e);
        }
    };
    return (
        <button type = "button" onClick = {handleClick}>
            {props.text}
        </button>
    );
};

export default Button