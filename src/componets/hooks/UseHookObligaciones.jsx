import axios from "axios";
import React, { useState } from "react";
import { useDocenteContext } from "../context/DocenteContext";

export const UseHookObligaciones = () => {
  const {autorization}=useDocenteContext();

  const allObligaciones = (id) => {
    axios.get("http://127.0.0.1:8000/api/v1/obligaciones/"+id,{
        headers: {
          Authorization: `Bearer ${autorization()}`,
        },
      }).then((response)=>{
        
    }).catch((errors)=>{
        console.log(errors)
    })
  };

  return {
    allObligaciones
  };
};
