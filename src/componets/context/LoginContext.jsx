import { createContext, useContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const useLoginContext = () => {
  return useContext(CartContext);
};

export const LoginContext = ({ children }) => {
  const [Logged, setLogged] = useState({
    name:null,
    email:null,
    token:null,
    token_type:null
  });

  const [UserName,setUserName]=useState(sessionStorage.getItem("sessionActive"));

  const [btnLogin, setBtnLogin] = useState(null)
  

  

  const loginUser = (values) => {
    axios
      .post("http://127.0.0.1:8000/api/v1/login", values)
      .then(function (response) {
        
        const data = {
          name:response.data.user.name,
          email:response.data.user.email,
          token:response.data.token,
          token_type:response.data.token_type,
        }
        setLogged(data)
        sessionStorage.setItem('sessionActive',JSON.stringify(data))
        setUserName(JSON.stringify(data))

      })
      .catch(function (error) {
        setLogged(null)
        setBtnLogin(null);
      });
  };

  const logoutUser= ()=>{
    setLogged({    
      name:null,
      email:null,
      token:null,
      token_type:null})
      sessionStorage.removeItem("sessionActive")
      setUserName(null);
      setBtnLogin(null);
    }

 

  return (
  <CartContext.Provider value={{loginUser,Logged,logoutUser,UserName,btnLogin,setBtnLogin}}>
    {children}
  </CartContext.Provider>);
};
