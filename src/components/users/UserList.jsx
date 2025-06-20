import React, { useEffect, useState } from 'react';
import { getUser, createUser, updateUser } from '../../services/userService';

const UserList = () => {
       const [users, setUsers] = useState([]);
       const [newUser, setNewUser] = useState({
              username: '',
              lastName: '',
              role: '',
              phone: '',
              email: '',
              address: ''
       });

       const listaUsuarios = async () => {
              try {
                     const { data } = await getUser();
                     setUsers(data);
              } catch (error) {
                     console.error('Error al obtener usuarios:', error);
              }
       };

       const handleChange = (e) => {
              setNewUser({
                     ...newUser,
                     [e.target.name]: e.target.value
              });
       };

       const handleAddUser = async () => {
              try {
                     await createUser(newUser);
                     await listaUsuarios();
                     setNewUser({ username: '', lastName: '', role: '', phone: '', email: '', address: '' });
              } catch (error) {
                     console.error('Error al crear usuario:', error);
              }
       };

       const handleUserChange = (id, field, value) => {
              setUsers(users.map(user =>
                     user.id === id ? { ...user, [field]: value } : user
              ));
       };

       const handleUpdateUser = async (user) => {
              try {
                     await updateUser(user.id, user);
                     await listaUsuarios();
              } catch (error) {
                     console.error('Error al actualizar usuario:', error);
              }
       };

       useEffect(() => {
              listaUsuarios();
       }, []);

       return (
              <div className="container mt-4">
                     <h2 className="mb-4">Usuarios Minimercado</h2>

                     <div className="card mb-4">
                            <div className="card-header">Agregar Usuario</div>
                            <div className="card-body">
                                   <div className="row g-3">
                                          {['username', 'lastName', 'role', 'phone', 'email', 'address'].map(field => (
                                                 <div className="col-md-4" key={field}>
                                                        <input
                                                               type={field === 'email' ? 'email' : 'text'}
                                                               name={field}
                                                               className="form-control"
                                                               placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                               value={newUser[field]}
                                                               onChange={handleChange}
                                                        />
                                                 </div>
                                          ))}
                                   </div>
                                   <div className="text-end mt-3">
                                          <button className="btn btn-primary" onClick={handleAddUser}>Agregar Usuario</button>
                                   </div>
                            </div>
                     </div>

                     <div className="table-responsive">
                            <table className="table table-bordered table-hover align-middle">
                                   <thead className="table-dark">
                                          <tr>
                                                 <th>Nombre</th>
                                                 <th>Apellido</th>
                                                 <th>Rol</th>
                                                 <th>Teléfono</th>
                                                 <th>Email</th>
                                                 <th>Dirección</th>
                                                 <th>Acciones</th>
                                          </tr>
                                   </thead>
                                   <tbody>
                                          {users.map(user => (
                                                 <tr key={user.id}>
                                                        {['username', 'lastName', 'role', 'phone', 'email', 'address'].map(field => (
                                                               <td key={field}>
                                                                      <input
                                                                             className="form-control form-control-sm"
                                                                             value={user[field] || ''}
                                                                             onChange={(e) => handleUserChange(user.id, field, e.target.value)}
                                                                      />
                                                               </td>
                                                        ))}
                                                        <td>
                                                               <button className="btn btn-success btn-sm" onClick={() => handleUpdateUser(user)}>
                                                                      Actualizar
                                                               </button>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>
              </div>
       );
};

export default UserList;
