import threeLines from "../assets/threeLineBar.png"
import Button from "./button";
import "./menu.css";

const MenuOpenButton = ({open}) => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(open);
    if (isMenuOpen == false) {
        document.getElementById("menu-bg").style.display = "flex";
    }

    const handleMenuClick = () => {
        if (isMenuOpen) {
            document.getElementById("menu-bg").style.display = "none";
            alert("closed menu " + document.getElementById("menu-bg").classList);
            setIsMenuOpen(false);
        } else if (isMenuOpen == false) {
            document.getElementById("menu-bg").style.display = "flex";
            alert("opened Menu");
            setIsMenuOpen(true);
        }
    }

    return (
        <div id="menuCloseContainer">
            <h1>hi</h1>
            <Button icon="≡" onClick ={handleMenuClick} id="menuCloseButton" />
        </div>
    );
};

export default MenuOpenButton;