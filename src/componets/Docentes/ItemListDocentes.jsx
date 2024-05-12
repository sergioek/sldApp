import React, { useEffect } from 'react'
import { Panel } from '../Panel/Panel'
import { TableDocentes } from './TableDocentes'
import { useDocenteContext } from '../context/DocenteContext'


export const ItemListDocentes = () => {
  const {allDocentes} = useDocenteContext()

  useEffect(()=>{
    allDocentes()
  },[])

  return (
 <Panel>
    <TableDocentes/>
  </Panel>
  )
}
