import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./componets/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "./componets/context/LoginContext";
import { ItemListDocentes } from "./componets/Docentes/ItemListDocentes";
import { Panel } from "./componets/Panel/Panel";
import { Registro } from "./componets/Registro/Registro";


function App() {
  return (
    <>
      <LoginContext>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/docentes" element={<ItemListDocentes />} />
     
          </Routes>
        </BrowserRouter>
      </LoginContext>
    </>
  );
}

export default App;
