import React, { useEffect, useState } from 'react'
import { getUser } from '../../services/userService'

const UserList = () => {
       const [users, setUsers] = useState([]);

       const listaUsuarios = async () => {
              try {
                     const { data } = await getUser();
                     console.log(data);
                     setUsers(data);
              } catch (error) {
                     if (error.response) {
                            // El servidor respondió con un código de estado fuera del rango 2xx
                            console.error('Error en la respuesta del servidor:', error.response.data);
                     } else if (error.request) {
                            // La solicitud fue hecha pero no se recibió respuesta
                            console.error('No se recibió respuesta del servidor:', error.request);
                     } else {
                            // Algo sucedió al configurar la solicitud
                            console.error('Error al configurar la solicitud:', error.message);
                     }
              }
       }

       useEffect(() => {
              listaUsuarios();
       }, []);

       return (
              <div>
                     <h2>Usuarios Minimercado</h2>
                     <table border="1" cellPadding="10">
                            <thead>
                                   <tr>
                                          <th>Nombre</th>
                                          <th>Apellido</th>
                                          <th>Rol</th>
                                          <th>Teléfono</th>
                                          <th>Email</th>
                                          <th>Dirección</th>
                                   </tr>
                            </thead>
                            <tbody>
                                   {
                                          users.map(user => (
                                                 <tr key={user.id}>
                                                        <td>{user.username}</td>
                                                        <td>{user.lastName}</td>
                                                        <td>{user.role || "Sin Rol"}</td>
                                                        <td>{user.phone}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.address}</td>
                                                 </tr>
                                          ))
                                   }
                            </tbody>
                     </table>
              </div>
       )
}

export default UserList
