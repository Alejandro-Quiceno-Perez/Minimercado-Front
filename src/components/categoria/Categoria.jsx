import React, { useEffect, useState } from 'react'
import { getCategoria, createCategoria, updateCategoria } from '../../services/categoriaService'; // Asegúrate de que este servicio esté definido

const Categoria = () => {
    const [categorias, setCategorias] = useState([]);
    const [nuevasCategorias, setNuevasCategorias] = useState({
        nombre: '',
        descripcion: ''
    });

    const listaCategorias = async () => {
        try {
            const { data } = await getCategoria();
            setCategorias(data);
        } catch (error) {
            console.error('Error al obtener categorias:', error);
        }
    }

    const handleChange = (e) => {
        setNuevasCategorias({
            ...nuevasCategorias,
            [e.target.name]: e.target.value
        })
    }

    const handleAgregarCategoria = async () => {
        try {
            await createCategoria(nuevasCategorias);
            await listaCategorias();
            setNuevasCategorias({ nombre: '', descripcion: '' });
        } catch (error) {
            console.error('Error al crear categoria:', error);
        }
    }

    const handleCategoriaChange = (id, campo, valor) => {
        setCategorias((prev) =>
            prev.map((cat) =>
                cat.id === id ? { ...cat, [campo]: valor } : cat
            )
        );
    }

    const handleActualizarCategoria = async (categoria) => {
        try {
            await updateCategoria(categoria.id, categoria);
            await listaCategorias();
        } catch (error) {
            console.error('Error al actualizar categoria:', error);
        }
    }

    useEffect(() => {
        listaCategorias();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Lista de Categorías</h2>
            <div className="card mb-4">
                <div className="card-header">Agregar Categoria</div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre"
                                value={nuevasCategorias.nombre}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="col-md-4">
                            <input
                                type="text"
                                name="descripcion"
                                className="form-control"
                                placeholder="Descripcion"
                                value={nuevasCategorias.descripcion}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <button
                            className="btn btn-primary"
                            onClick={handleAgregarCategoria}
                        >
                            Agregar Categoria
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Direccion</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.map((categoria) => (
                            <tr key={categoria.id}>
                                <td>{categoria.id}</td>
                                <td>
                                    <input
                                        className="form-control form-control-sm"
                                        value={categoria.nombre}
                                        onChange={(e) =>
                                            handleCategoriaChange(categoria.id, 'nombre', e.target.value)
                                        }
                                    />
                                </td>
                                
                                <td>
                                    <input
                                        className="form-control form-control-sm"
                                        value={categoria.descripcion}
                                        onChange={(e) =>
                                            handleCategoriaChange(categoria.id, 'descripcion', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleActualizarCategoria(categoria)}
                                    >
                                        Actualizar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Categoria
