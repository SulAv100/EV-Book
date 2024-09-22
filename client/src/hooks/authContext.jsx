import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const getUserData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("An error has occured");
        return;
      }
      setUserData(data.firstName);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAdminData = async()=>{
    try{
      const response = await fetch("http://localhost:3000/api/auth/adminData",{
        method:'GET',
        credentials:'include'
      });

      const data = await response.json();
      if(!response.ok){
        console.log("An error as occured");
        return;
      }
      setIsAdmin(true);
      console.log(data);


    }
    catch(error){
      console.error(error);
    }
  }

  return (
    <AuthContext.Provider value={{getUserData,userData, setIsAdmin, getAdminData, isAdmin}}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth is outside the provider");
  }
  return authContextValue;
};
