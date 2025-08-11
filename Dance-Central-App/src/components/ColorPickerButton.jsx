import React from "react";
import Button from "./button";

const ColorPickerButton = ({ initialColor = "#FF94C8", onPick }) => {
    const [color, setColor] = React.useState(initialColor);

    const handleChange = (e) => {
        const next = e.target.value; // "#RRGGBB"
        setColor(next);
        onPick && onPick(next);
    };

    return (
        <div style={{ position: "relative", display: "inline-block" }}>
        <Button text="Color Palette" icon="+" />

        <input
            type="color"
            value={color}
            onPick={handleChange}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 30,
                height: 30,
                background: "transparent",
                // opacity: 0
            }}
        />
        </div>
    );
};

export default ColorPickerButton;

// const ColorPicker = ({ initialColor = "#FF94C8", onChange }) => {
//     const [open, setOpen] = React.useState(false);
//     const [color, setColor] = React.useState(initialColor);

//     const toggleOpen = () => setOpen((o) => !o);
//     const close = () => setOpen(false);

//     const handleChange = (c) => {
//         setColor(c.hex);
//         if (onChange) onChange(c.hex);
//     };

//     const popover = { position: "absolute", zIndex: 1001, top: "100%", marginTop: 8 };
//     const cover = { position: "fixed", top: 0, right: 0, bottom: 0, left: 0, zIndex: 1000 };

//     return (
//         <div style={{ position: "relative", display: "inline-block" }}>
//         <Button icon="+" onClick={toggleOpen} />
//         {open && (
//             <>
//             <div style={cover} onClick={close} />
//             <div style={popover}>
//                 <ChromePicker color={color} onChange={handleChange} disableAlpha />
//             </div>
//             </>
//         )}
//         </div>
//     );
// };

// export default ColorPicker;