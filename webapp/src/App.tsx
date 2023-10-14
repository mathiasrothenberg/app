import React from 'react';
import './App.css';
import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Login } from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState(undefined);
  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          //'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);
  
  return (
    <div>
      <BrowserRouter>
      <div><NavBar user={user} /></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
