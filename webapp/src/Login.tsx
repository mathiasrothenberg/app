import React from "react";

export const Login = () => {
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
    };
    return (
        <div>
            <button onClick={google}>Login</button>
        </div>
    )
}