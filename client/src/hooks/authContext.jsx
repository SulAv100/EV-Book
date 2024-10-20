import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState("");
  const [userDetail, setUserDetail] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [userContact, setUserContact] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [fetchAllData, setFetchAllData] = useState([]);

  // Fetch user data
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
        console.log("An error occurred");
        return;
      }

      console.log(data); // Log fetched data for debugging
      setUserDetail(data);
      setUserData(data.firstName);
      setUserContact(data.phoneNumber); // Set userContact
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch admin data
  const getAdminData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/adminData", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        return;
      }
      setIsAdmin(true);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch travel data
  const fetchTravel = async (formData) => {
    console.log(formData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/getTravelData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("An unexpected error occurred");
        return;
      }
      console.log(data);
      setFetchData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchAllTravel = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/admin/setTravel",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (!response.ok) {
        console.log("An unexpected error occurred");
        return;
      }
      console.log(data);
      setFetchAllData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        getUserData,
        userData,
        setIsAdmin,
        userContact,
        userDetail,
        getAdminData,
        fetchAllData,
        fetchAllTravel,
        isAdmin,
        fetchTravel,
        fetchData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth is outside the provider");
  }
  return authContextValue;
};
