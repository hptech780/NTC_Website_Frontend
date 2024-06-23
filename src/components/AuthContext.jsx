// src/AuthContext.js
import React, { createContext, useContext, useState,useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
 const [isAdmin,setAdmin]= useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
         
        }
    }, []);

    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };
    const [username, setUserName] = useState(null);
 
  

    function login(username, password) {
      
       if (username==="admin"&& password==='admin') {
       setAdmin(true);
          setUserName(username)
        
         
         
          return true;
 
       } else {
          logout()
          return false;
       }
    }
   
 
    function logout(){
   
       setAuthenticated(false)
    
    }
 
   

    return (
        <AuthContext.Provider value={{ isAdmin, user,setUser: updateUser,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
