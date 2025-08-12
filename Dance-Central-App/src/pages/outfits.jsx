import "../pages/outfits.css"

import Button from "../components/button";
import ColorPalette from "../components/ColorPalette";
import Dropdown from "../components/Dropdown";
import MenuNavbar from "../components/MenuNavbar";
import Textbox from "../components/Textbox";
import MediaUploader from "../components/MediaUploader";


const Outfits = () => {
    return (
        <div id="outfit-container">
            <MenuNavbar />
            <div className="page-heading outfits-heading">
                <h1>Outfits</h1>
                <div className="song-and-concepts">
                    <Dropdown className = "dropdown" text = "Song Title"></Dropdown>
                    <div className="concepts-textbox">
                        <h2>Concepts:</h2>
                        <Textbox/>
                    </div>
                </div>
                <div className = "page-heading-right">
                    <Button className = "help-button" icon="?"/>
                    <Dropdown className = "dropdown" text =  "Team Name"></Dropdown>
                </div>
            </div>
            <ColorPalette />

            <div className="outfit-photos">

            <section className="pending background-div">
                <header className="pending-header">
                    <h2>Pending Outfits</h2>
                    <Button text="Select" />
                </header>
                <div className="pending-photos">
                    <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                    <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                    <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                </div>
            </section>


            <section className="inspiration background-div">
                <header className="inspiration-header">
                    <h2>Inspiration</h2>
                </header>
                <div className="inspiration-buttons">
                    <Button text="Generate Inspiration" />
                    <Button text="Upload Images" />

                    <Button text="Link Pinterest" />
                    
                </div>
                <div className="inspiration-photos">

                    </div>
                    <footer className="inspiration-footer">
                        <Button text="Edit" />
                    </footer>
                </section>

                <section className="approved background-div">
                    <header className="approved-header">
                        <h2>Approved Outfits</h2>
                        <Button text="Edit" />
                    </header>
                    <div className="approved-photos">
                        <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                        <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                        <Button image = "https://i.pinimg.com/736x/19/45/2d/19452d14eca923a236d6e51deae86c79.jpg"/>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Outfits;