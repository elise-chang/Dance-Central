import React from "react";

const Button = ({
    text,
    icon,
    image,
    onClick,
    className
    // style
}) => {
    const handleClick = (e) => {
        //implementation
        if (onClick) {
            onClick(e);

        }
    };
    if (image) {
        return (
        <button className = "image-button" type = "button" onClick = {handleClick}>
            {image && <img src = {image} style = {{height: "100%", width: "100%", objectFit: "cover"}}/>}
        </button>
        );
    }
    else if (icon) {
        return (
        <button className = "icon-button" type = "button" onClick = {handleClick}>
            {icon && <span> {icon} </span>}
        </button>
        );
    }
    else {
        return (
        <button className = "text-button" type = "button" onClick = {handleClick}>
            <span> {text} </span>
        </button>
        );
    }  
};

export default Button