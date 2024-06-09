import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useLoginContext } from "./LoginContext";


const ContextLicencia = createContext();

export const useLicenciaContext = () => {
  return useContext(ContextLicencia);
};

export const LicenciaContext = ({ children }) => {
  const {autorization} = useLoginContext();
  const [licencias,setLicencias] = useState([]);

  const allLicencias = (id) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/licencias/" + id, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setLicencias(response.data.data)
   
      })
      .catch((errors) => {
        console.log(errors);
      });
  };


  const search = (idDocente,desdeFecha,hastaFecha) => {

    axios
      .get("http://127.0.0.1:8000/api/v1/licencias/"+idDocente + "/" + desdeFecha + "/" + hastaFecha, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setLicencias(response.data.data)
       
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

  

  return (
    <ContextLicencia.Provider value={{allLicencias,licencias,search}}>{children}</ContextLicencia.Provider>
  );
};
