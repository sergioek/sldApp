
import "./App.css";
import Login from "./componets/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginContext } from "./componets/context/LoginContext";
import { ItemListDocentes } from "./componets/Docentes/ItemListDocentes";
import { Registro } from "./componets/Registro/Registro";
import { DocenteContext } from "./componets/context/DocenteContext";
import { ItemNuevoDocente } from "./componets/Docentes/Nuevo/ItemNuevoDocente";
import { ItemEditarDocente } from "./componets/Docentes/Editar/ItemEditarDocente";
import { ItemListObligaciones } from "./componets/Obligaciones/ItemListObligaciones";
import { ObligacionesContext } from "./componets/context/ObligacionesContext";


function App() {
  return (
    <>
      <LoginContext>
      <DocenteContext>
        <ObligacionesContext>
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<Login />} />
            
            <Route path="/registro" element={<Registro />} />
            
            <Route path="/docentes" element={<ItemListDocentes />} />
            
            <Route path="/docente-nuevo" element={<ItemNuevoDocente/>}/>            
            
            <Route path="/docente-editar/:id" element={<ItemEditarDocente/>} />

            <Route path="/obligaciones/:idDocente" element={<ItemListObligaciones/>}/>

          </Routes>

        </BrowserRouter>
        </ObligacionesContext>
        </DocenteContext>
      </LoginContext>
    </>
  );
}

export default App;
