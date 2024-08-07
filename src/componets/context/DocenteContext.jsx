import axios from "axios";
import React, { useEffect, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginContext } from "./LoginContext";

const ContextDocente = createContext();

export const useDocenteContext = () => {
  return useContext(ContextDocente);
};


export const DocenteContext = ({ children }) => {

  const [ArrayDocentes, setArrayDocentes] = useState([]);
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [data,setData]=useState({});
  const [docente,setDocente] = useState(null);
  const {autorization} = useLoginContext();


  const change = (value) => {
    if (value === "&laquo; Previous") {
      setCurrentPage(currentPage - 1);
    } else if (value === "Next &raquo;") {
      setCurrentPage(currentPage + 1);
    } else {
      setCurrentPage(value);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("sessionActive") !== null) {
      allDocentes();
    }
  }, [currentPage]);


  const showDocente = (idDocente) =>{
    axios
    .get("http://127.0.0.1:8000/api/v1/docentes/" + idDocente, {
      headers: {
        Authorization: `Bearer ${autorization()}`,
      },
    })
    .then((response) => {
      setDocente(response.data.data)
     
    })
    .catch((errors) => {
      console.log(errors);
    });
  }

  const allDocentes = () => {
    axios
      .get("http://127.0.0.1:8000/api/v1/docentes?page=" + currentPage, {
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      })
      .then((response) => {
        setArrayDocentes(response.data.data.data);
        setLinks(response.data.data.links);
        setData(response.data.data)
        console.log(response.data.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const searchDocente = (ValueSearch) => {
    ValueSearch !== ""
      ? axios
          .get("http://127.0.0.1:8000/api/v1/docentes/search/" + ValueSearch, {
            headers: {
              Authorization: `Bearer ${autorization()}`,
            },
          })
          .then((response) => {
            setArrayDocentes(response.data.data.data);
            setLinks(response.data.data.links);
            setData(response.data.data)
          })
          .catch((error) => {
            console.log(error);
          })
      : allDocentes();
  };





  return (
    <ContextDocente.Provider
      value={{
        ArrayDocentes,
        searchDocente,
        links,
        setCurrentPage,
        allDocentes,
        change,
        data,
        showDocente,
        docente
      }}
    >
      {children}
    </ContextDocente.Provider>
  );
};
