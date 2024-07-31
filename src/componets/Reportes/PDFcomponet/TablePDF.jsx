import React, { useEffect, useState } from "react";
import { useLoginContext } from "../../context/LoginContext";
import { FilterReporte } from "../Filtros/FilterReporte";

import axios from "axios";

const TablePDF = () => {

  const { autorization } = useLoginContext();
  
  const reporteLicencias = (fechaInicio, fechaFinal) => {
  
      axios
        .get(
          "http://127.0.0.1:8000/api/v1/reporte/reporteLicencias/" +
            fechaInicio +
            "/" +
            fechaFinal,
          {
            headers: {
              Authorization: `Bearer ${autorization()}`,
            },
            responseType: "blob", // Importante para manejar el PDF
          }
        )
        .then((response) => {
          // Crear una URL de objeto para el PDF
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Planilla-A2.pdf"); // Nombre del archivo
          document.body.appendChild(link);
          link.click();
          // Remover el enlace después de descargar
          document.body.removeChild(link);
        })
        .catch((errors) => {
          console.log(errors);
        });
  };


  const reportePresentismo = (fechaInicio, fechaFinal) => {
    axios
      .get(
        "http://127.0.0.1:8000/api/v1/reporte/reportePresentismo/" +
          fechaInicio +
          "/" +
          fechaFinal,
        {
          headers: {
            Authorization: `Bearer ${autorization()}`,
          },
          responseType: "blob", // Importante para manejar el PDF
        }
      )
      .then((response) => {
        // Crear una URL de objeto para el PDF
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Planilla-Presentismo.pdf"); // Nombre del archivo
        document.body.appendChild(link);
        link.click();
        // Remover el enlace después de descargar
        document.body.removeChild(link);
      })
      .catch((errors) => {
        console.log(errors);
      });
  };

 

  return (
    <div>
      <FilterReporte reporteLicencias={reporteLicencias} reportePresentismo={reportePresentismo} />
    </div>
  );
};

export default TablePDF;
