import React from "react";
import ColorPickerButton from "./ColorPickerButton";
import Button from "./button";

const ColorPalette = () => {
    const [color, setColor] = React.useState(null);

    //   const handleChange = (e) => {
    //     const next = e.target.value; // "#RRGGBB"
    //     setColor(next);
    //     onChange && onChange(next);
    //   };
    // const [current, setCurrent] = React.useState("#FF94C8");
    const [colors, setColors] = React.useState([]);
    const addColor = (hex) => {
        setColor(hex);
        confirm("Select Color: " + color);
        // const colorInput = document.getElementById("color-input");
        // if (!colorInput) alert("error");
        // alert("colors !");
        // setColors((arr) => (arr.includes(hex) ? arr : [...arr, hex]));
        // alert(colors);
    }

  // optional: click a slice to remove it
    const removeColor = (hex) =>
        setColors((arr) => arr.filter((c) => c !== hex));

    if (colors.length > 0) {
        return (
            <div className="style-2">
                Pick a color!
            </div>
        )
    } else {
        return (
            <div id="color-pick-bg">

                {colors.map(t => (
                <div
                    style={backgroundColor = t}
                    onClick={removeColor}
                >{t}
                </div>
                ))}

                {/* Evenly split palette bar */}
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
                    
                </div> */}
                <ColorPickerButton onPick={addColor} />
            </div>
        );
    }
};




export default ColorPalette