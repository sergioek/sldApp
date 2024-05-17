import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDocenteContext } from "./DocenteContext";

const ContextObligaciones = createContext();

export const useObligacionesContext = () => {
  return useContext(ContextObligaciones);
};

export const ObligacionesContext = ({ children }) => {
const {autorization}=useDocenteContext()
const [obligaciones,setObligaciones] = useState([]);
const [docente,setDocente] = useState(null);
const [formData, setFormData] = useState(null);


  const allObligaciones = (idDocente) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/obligaciones/docente/" + idDocente, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setObligaciones(response.data.data)
      })
      .catch((errors) => {
        console.log(errors);
      });

      axios
      .get("http://127.0.0.1:8000/api/v1/docentes/" + idDocente, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setDocente(response.data.data)
        console.log(response.data.data)
      })
      .catch((errors) => {
        console.log(errors);
      });
      
  };

  const showObligacion = (idDocente)=>{
    axios.get("http://127.0.0.1:8000/api/v1/obligaciones/" + idDocente, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    }).then((response)=>{
        setFormData(response.data.data[0])
    }).catch((errors)=>{
      console.log(errors)
    })
  }

  return (
    <ContextObligaciones.Provider value={{allObligaciones,obligaciones,showObligacion,formData,docente}}>
      {children}
    </ContextObligaciones.Provider>
  );
};
