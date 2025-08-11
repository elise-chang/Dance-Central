import React, { useState } from "react";

function Textbox() {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setText(e.target.value)
    }

    return (
        <div style = {{width: "100%", height: "100%"}} id="textbox">
            <textarea
                value = {text}
                onChange = {handleChange}
                // rows = "5" 
                placeholder = "Type here..."
                style = {{
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                    resize: "none"
                }}
            />
        </div>
    )
}

export default Textbox