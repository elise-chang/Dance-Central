import Button from "../components/button";

const Login = () => {
    

    return (
        <div id="login-container">
            <h1>Log In</h1>
            <input placeholder="Username" id="username"></input>
            <input placeholder="Password" id="password"></input>
            <Button text="Log In" id="login-button" />
        </div>
    )
}

export default Login;