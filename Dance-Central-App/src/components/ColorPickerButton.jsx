import React, { useRef } from "react";
import Button from "./button";

const ColorPickerButton = ({ onPick }) => {
    const [color, setColor] = React.useState();
    const colorInputRef = useRef(null);

    const activateColorPick = () => {
        colorInputRef.current.click();
    }

    const handleChange = (e) => {
        const next = e.target.value; // "#RRGGBB"
        setColor(next);
        onPick(color);
        // onPick && onPick(next);
    };

    return (
        <div>
            <Button text="Color Palette" icon="+" onClick={activateColorPick} />
            <input
                id="color-input"
                type="color"
                value={color}
                ref={colorInputRef}
                onChange={handleChange}
                style={{
                    display: "none",
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