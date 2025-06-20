import React, { useState, useEffect } from 'react';
import { getProducto, createProducto, updateProducto } from '../../services/productoService';
import { getProveedor } from '../../services/proveedorService';
import { getCategoria } from '../../services/categoriaService';

const Product = () => {
    const [productos, setProductos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        cantidadStock: '',
        categoriaId: '',
        proveedorId: ''
    });

    const fetchData = async () => {
        try {
            const [catRes, provRes, prodRes] = await Promise.all([
                getCategoria(),
                getProveedor(),
                getProducto()
            ]);
            setCategorias(catRes.data);
            setProveedores(provRes.data);
            setProductos(prodRes.data);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevoProducto({ ...nuevoProducto, [name]: value });
    };

    const handleAgregar = async () => {
        try {
            const payload = {
                nombre: nuevoProducto.nombre,
                descripcion: nuevoProducto.descripcion,
                precio: parseFloat(nuevoProducto.precio),
                cantidadStock: parseInt(nuevoProducto.cantidadStock),
                categoria: { id: parseInt(nuevoProducto.categoriaId) },
                proveedor: { id: parseInt(nuevoProducto.proveedorId) }
            };
            await createProducto(payload);
            await fetchData();
            setNuevoProducto({
                nombre: '',
                descripcion: '',
                precio: '',
                cantidadStock: '',
                categoriaId: '',
                proveedorId: ''
            });
        } catch (error) {
            console.error('Error al crear producto:', error);
        }
    };

    const handleProductoChange = (id, campo, valor) => {
        setProductos((prev) =>
            prev.map((prod) =>
                prod.id === id ? { ...prod, [campo]: valor } : prod
            )
        );
    };

    const handleActualizar = async (producto) => {
        try {
            const payload = {
                ...producto,
                categoria: { id: producto.categoria?.id || producto.categoria },
                proveedor: { id: producto.proveedor?.id || producto.proveedor }
            };
            await updateProducto(producto.id, payload);
            await fetchData();
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Gestión de Productos</h2>

            <div className="card mb-4">
                <div className="card-header">Agregar Producto</div>
                <div className="card-body">
                    <div className="row g-3">
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="nombre"
                                className="form-control"
                                placeholder="Nombre"
                                value={nuevoProducto.nombre}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <input
                                type="text"
                                name="descripcion"
                                className="form-control"
                                placeholder="Descripción"
                                value={nuevoProducto.descripcion}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                name="precio"
                                className="form-control"
                                placeholder="Precio"
                                value={nuevoProducto.precio}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-2">
                            <input
                                type="number"
                                name="cantidadStock"
                                className="form-control"
                                placeholder="Cantidad"
                                value={nuevoProducto.cantidadStock}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <select
                                name="categoriaId"
                                className="form-select"
                                value={nuevoProducto.categoriaId}
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccione Categoría</option>
                                {categorias.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-3">
                            <select
                                name="proveedorId"
                                className="form-select"
                                value={nuevoProducto.proveedorId}
                                onChange={handleInputChange}
                            >
                                <option value="">Seleccione Proveedor</option>
                                {proveedores.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="text-end mt-3">
                        <button className="btn btn-primary" onClick={handleAgregar}>
                            Agregar Producto
                        </button>
                    </div>
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-hover align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Categoría</th>
                            <th>Proveedor</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((p) => (
                            <tr key={p.id}>
                                <td>
                                    <input
                                        className="form-control form-control-sm"
                                        value={p.nombre}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'nombre', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        className="form-control form-control-sm"
                                        value={p.descripcion}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'descripcion', e.target.value)
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={p.precio}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'precio', parseFloat(e.target.value))
                                        }
                                    />
                                </td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        value={p.cantidadStock}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'cantidadStock', parseInt(e.target.value))
                                        }
                                    />
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={p.categoria?.id || ''}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'categoria', { id: parseInt(e.target.value) })
                                        }
                                    >
                                        <option value="">Seleccione Categoría</option>
                                        {categorias.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        className="form-select form-select-sm"
                                        value={p.proveedor?.id || ''}
                                        onChange={(e) =>
                                            handleProductoChange(p.id, 'proveedor', { id: parseInt(e.target.value) })
                                        }
                                    >
                                        <option value="">Seleccione Proveedor</option>
                                        {proveedores.map((pr) => (
                                            <option key={pr.id} value={pr.id}>
                                                {pr.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleActualizar(p)}
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
    );
};

export default Product;
