import Button from "../components/button";
import Dropdown from "../components/Dropdown";
import MenuNavbar from "../components/MenuNavbar";
import Textbox from "../components/Textbox";


const Home = () => {
    return (
        <div id="home-container">
            <MenuNavbar open="true" static="true" />
            <div className="page-heading">
                <h1>Home Page</h1>
                <div className = "page-heading-right">
                    <Button className = "help-button" icon="?"/>
                    <Dropdown className = "dropdown">TeamName</Dropdown>
                </div>
            </div>

            <h2>Reminders</h2>
                <div style = {{height: "100px"}}>
                    <Textbox />
                </div>
            <h2>Calendar</h2>
                <div>CALENDAR</div>
    </div>
    );
};

export default Home;