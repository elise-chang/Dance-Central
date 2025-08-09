import React from "react";

function Textbox() {
    const [text, setText] = useState("");

    const handleChange = (e) => {
        setInputValue(e.target.value)
    }

    return (
        <div>
            <input
                type = "text"
                value = {text}
                onChange = {handleChange}
                placeholder = "Type here..."/>
            <p>You typed: {text}</p>
        </div>
    )
}

export default TextBox