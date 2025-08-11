import React from "react";
import { Link } from 'react-router-dom';
import "./menu.css";
import Button from './button';
import threeLines from "../assets/threeLineBar.png"


const MenuNavbar = (props) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(props.open);
    if (isMenuOpen == "false") {
        setIsMenuOpen(false);
    }

    React.useEffect(() => {
        const menuBar = document.getElementById("menu-bg");
        if (!menuBar) return;
        if (isMenuOpen) {
            menuBar.style.display = "flex";
        } else if (isMenuOpen == false) {
            menuBar.style.display = "none";
        }
    }, [isMenuOpen]);

    const handleMenuClick = () => {
        if (props.static == "true") return;
        if ((isMenuOpen)) {
            setIsMenuOpen(false);
        } else {
            setIsMenuOpen(true);
        }
    }
    if (!isMenuOpen) {
        return (
            <Button icon="≡" onClick ={handleMenuClick} id="menuOpenButton" />
        );
    } else {
        return (
            <div id="menu-bg">
            <div id="menuCloseContainer">
                <Button icon="≡" onClick ={handleMenuClick} id="menuCloseButton" />
            </div>
                <div id="app-name">
                    <h1>Dance <br /> Central</h1> 
                </div>
                <div className="button-container">
                    <Link to="/" className="menu-btn"><Button text="Home">Home</Button></Link>
                    <Link to="/calendar" className="menu-btn"><Button text="Calendar" ></Button></Link>
                    <Link to="/blocking" className="menu-btn"><Button text="Blocking" ></Button></Link>
                    <Link to="/casting" className="menu-btn"><Button text="Casting" ></Button></Link>
                    <Link to="/cleaning" className="menu-btn"><Button text="Cleaning" ></Button></Link>
                    <Link to="/outfits" className="menu-btn"><Button text="Outfits" ></Button></Link>
                </div>
                <div id="menu-spacer"></div>
                <a>YourName sign out</a>
            </div>
        );
    }
}

export default MenuNavbar;