import { axiosInstance } from "../helper/axios-config";

const getUser = () => {
       const prueba = axiosInstance.get("/users", {
              headers: {
                     "Content-Type": "application/json",
              },
       });
       console.log(prueba);
       return prueba;
};

const createUser = (userData) => axiosInstance.post("/users", userData);

const updateUser = (id, userData) => axiosInstance.put(`/users/${id}`, userData);

export { getUser, createUser, updateUser };
