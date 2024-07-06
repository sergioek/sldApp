import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLoginContext } from "./LoginContext";
import { useParams } from "react-router-dom";


const ContextLicencia = createContext();

export const useLicenciaContext = () => {
  return useContext(ContextLicencia);
};

export const LicenciaContext = ({ children }) => {
  const {idDocente} = useParams()
  const {autorization} = useLoginContext();
  const [licencias,setLicencias] = useState([]);
  const [articulos,setArticulos]= useState([])
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data,setData]=useState({});

  

  const change = (value) => {
    if (value === "&laquo; Previous") {
      setCurrentPage(currentPage - 1);
    } else if (value === "Next &raquo;") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(value);
    }
  };

  const allLicencias = (id) => {
    axios
      .get("http://127.0.0.1:8000/api/v1/licencias/" + id + "?"+ "page=" + currentPage, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
    
        setLicencias(response.data.data.data)
        setLinks(response.data.data.links);
        setData(response.data.data)
   
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
      
        setLicencias(response.data.data.data)
        setLinks(response.data.data.links);
        setData(response.data.data)
       
      })
      .catch((errors) => {
        console.log(errors);
      });
  };


  const allArticulos = ()=>{
    axios
    .get("http://127.0.0.1:8000/api/v1/articulos/",{
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    })
    .then((response) => {
      setArticulos(response.data.data)
     
    })
    .catch((errors) => {
      console.log(errors);
    });

  }



  

  return (
    <ContextLicencia.Provider value={{allLicencias,licencias,search,allArticulos,articulos,links,data,change,currentPage}}>{children}</ContextLicencia.Provider>
  );
};
