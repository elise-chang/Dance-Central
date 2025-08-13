import React from "react";
import ColorPickerButton from "./ColorPickerButton";
import Button from "./button";

const ColorPalette = () => {
    const [color, setColor] = React.useState(null);

    const [colors, setColors] = React.useState([]);


    const addColor = (hex) => {
        setColor(hex);
        if (color == null || color == undefined) return;
        const newColor = confirm("Select Color: " + color);
        if (newColor) {
            setColors(oldColors => [...oldColors, color]);
            //alert(colors + "stan loona");
        }


        // const colorInput = document.getElementById("color-input");
        // if (!colorInput) alert("error");
        // alert("colors !");
        // setColors((arr) => (arr.includes(hex) ? arr : [...arr, hex]));
        // alert(colors);
    }

  // optional: click a slice to remove it
    const removeColor = (hex) =>
        setColors((arr) => arr.filter((c) => c !== hex));

    if (colors.length == 0) {
        return (
            <div id="color-pick-bg">
                <div id="no-colors">
                    Pick a color!
                    <ColorPickerButton onPick={addColor} />
                </div>
            </div>
        )
    } else {
        return (
            <div id="color-pick-bg">
                <ul>
                    {colors.map(t => (
                    <li
                        style={{backgroundColor: t}}
                        onClick={removeColor}
                        className="color-div"
                    >{t}
                    </li>
                    ))}

                    {/* <div className="style-1">
                        {colors.length === 0 ? (
                        <div className="style-2">
                            Pick a color to build your palette
                        </div>
                        ) : (
                        colors.map((c) => (
                            <div
                            key={c}
                            title={`${c} (click to remove)`}
                            onClick={() => removeColor(c)} // or omit to make it static
                            style={{ flex: 1, background: c, cursor: "pointer" }}
                            />
                        ))
                        )} 
                        
                    </div>  */}
                </ul>
                <ColorPickerButton onPick={addColor} />
            </div>
        );
    }
};




export default ColorPalette