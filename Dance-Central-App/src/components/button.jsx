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
    if (image) {
        return (
        <button type = "button" onClick = {handleClick} style = {{width : 100, aspectRatio: 2/4, padding: 0, overflow: "hidden"}}>
            {image && <img src = {image} style = {{height: "100%", width: "100%", objectFit: "cover"}}/>}
        </button>
        );
    }
    else if (icon) {
        return (
        <button type = "button" onClick = {handleClick} style = {{width : 30, aspectRatio: 1/1, padding: 0, display: "flex", alignItems: "center", justifyContent : "center"}}>
            {icon && <span> {icon} </span>}
        </button>
        );
    }
    else {
        return (
        <button type = "button" onClick = {handleClick}>
            <span> {text} </span>
        </button>
        );
    }  
};

export default Button