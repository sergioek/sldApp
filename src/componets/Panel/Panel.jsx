import {useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useLoginContext } from '../context/LoginContext'

export const Panel = ({children}) => {
  const {UserName} = useLoginContext();

  const navigate = useNavigate();
  useEffect(()=>{
    
    if(UserName == null){
       navigate("/")
     }
   },[UserName])
 
  return (
    <div className='h-screen w-auto'>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}
