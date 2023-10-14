import React from "react"
import { Link } from "react-router-dom";

interface User { 
    displayName: string
}

type NavBarProps = {
    user?: User
}

export const NavBar = ({ user }: NavBarProps) => {
    const logout = () => {
        window.open("http://localhost:5000/auth/logout", "_self");
    };
    return (<div style={{border: "1px solid black"}}>
        <Link className="link" to="/">Home</Link>
        {user ? 
            <div>Logged in: {user.displayName} <button onClick={logout}>Logout</button> </div>  
            : 
            <div><Link className="link" to="login">Login</Link></div> 
        }
    </div>)
}