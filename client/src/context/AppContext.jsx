  import { createContext, useState , useEffect} from "react";
  import axios from 'axios';
  import { toast } from 'react-toastify';



  axios.defaults.withCredentials = true;

  export const AppContext  = createContext();

  export const AppContextProvider = (props)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const [isLoggedin, setIsLoggedin] = useState(false);
      const [userData, setUserData] = useState(null);
    
      axios.defaults.withCredentials = true;
      

      const getAuthState = async ()=>{
          try {
              const { data } = await axios.get(backendUrl + "/api/auth/is-auth");

              if(data.success){
                  setIsLoggedin(true)
                  getUserData()
              }
          } catch (error) {
              toast.error
          }

      }

      useEffect(() => {
          getAuthState();
        }, []);

      const getUserData = async () => {
        try {
          const { data } = await axios.get(backendUrl + "/api/user/data");
    
          if(data.success){
            setUserData(data.userData);
            setIsLoggedin(true);
          } else {
            toast.error('getUserData fail');
          }
        } catch (error) {
          toast.error("Failed to fetch user data");
        }
      };
    
      useEffect(() => {
        getUserData();
      }, []);
    
      const value = {
        backendUrl,
        isLoggedin, setIsLoggedin,
        userData, setUserData,
        getUserData
      };
    
      return (
        <AppContext.Provider value={value}>
          {props.children}
        </AppContext.Provider>
      );
    };