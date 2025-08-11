import React from "react";
import ColorPickerButton from "./ColorPickerButton";

const ColorPalette = () => {
    // const [color, setColor] = React.useState(initialColor);

    //   const handleChange = (e) => {
    //     const next = e.target.value; // "#RRGGBB"
    //     setColor(next);
    //     onChange && onChange(next);
    //   };
    // const [current, setCurrent] = React.useState("#FF94C8");
    const [colors, setColors] = React.useState([]);
    const addColor = (hex) =>
    setColors((arr) => (arr.includes(hex) ? arr : [...arr, hex]));

  // optional: click a slice to remove it
    const removeColor = (hex) =>
        setColors((arr) => arr.filter((c) => c !== hex));

    return (
        <div style={{ display: "grid", gap: 12 }}>
        <ColorPickerButton onPick={addColor} />

        {/* Evenly split palette bar */}
        <div
            style={{
            display: "flex",
            height: 32,
            border: "1px solid #ddd",
            borderRadius: 8,
            overflow: "hidden",
            }}
        >
            {colors.length === 0 ? (
            <div
                style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
                fontSize: 12,
                }}
            >
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
        </div>
        </div>
    );
};




export default ColorPalette