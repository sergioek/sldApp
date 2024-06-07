import {useEffect} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { useLoginContext } from '../context/LoginContext'

export const Panel = ({children}) => {
  const {UserName,Logged} = useLoginContext();

  const navigate = useNavigate();
  
  useEffect(()=>{
    
    const session = sessionStorage.getItem("sessionActive") 

    if(UserName == null || session == null || Logged == null  ){
       navigate("/")
     }
   },[UserName,Logged])
 
  return (
    <div className='h-screen w-auto'>
        <Navbar/>
        {children}
        <Footer/>
    </div>
  )
}
