import { axiosInstance } from "../helper/axios-config";

const getUser = () => {
       const prueba = axiosInstance.get("/users", {
              headers: {
                     "Content-Type": "application/json",
              },
       });
       console.log(prueba)
       return prueba;
} 

export {
       getUser
}