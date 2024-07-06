 import React, { useEffect, useState } from 'react'
 import {Panel} from "../Panel/Panel"
import { FilterReporte } from './Filtros/FilterReporte'
import TablePDF from './PDFcomponet/TablePDF'
import Planilla from './PDFcomponet/Planilla'
import axios from 'axios'
import { useLoginContext } from '../context/LoginContext'

 export const ItemListReportes = () => {
  

   return (
    
        <div>
            {/* <FilterReporte/> */}

            <Planilla />
  
        </div>
   
   )
 }
 