import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import ModalCrearProducto from "../components/ModalCrearProducto";
import ModalEditarProducto from "../components/ModalEditarProducto";
import { UrlBase, Url } from "../api/api";




const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [pagina, setPagina] = useState(1);
    const productosPorPagina = 5;
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editarVisible, setEditarVisible] = useState(false);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);



    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const res = await axios.get(`${UrlBase}/products/admin`);
            //   const res = await axios.get("http://localhost:5000/api/products/admin");
            setProductos(res.data);
        } catch (err) {
            console.error("Error cargando productos:", err);
        }
    };

    const cambiarEstado = async (id, publicado) => {
        try {
            await axios.patch(`${UrlBase}/products/${id}/publish`, { published: publicado });
            //   await axios.patch(`http://localhost:5000/api/products/${id}/publish`, { published: publicado });
            obtenerProductos();
        } catch (err) {
            console.error("Error actualizando estado:", err);
        }
    };

    const eliminarProducto = async (id) => {
        if (!confirm("¿Seguro que deseas eliminar este producto?")) return;
        try {
            await axios.delete(`${UrlBase}/products/${id}`);
            //   await axios.delete(`http://localhost:5000/api/products/${id}`);
            obtenerProductos();
        } catch (err) {
            console.error("Error eliminando producto:", err);
        }
    };

    // Paginación
    const inicio = (pagina - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    const productosPaginados = productos.slice(inicio, fin);
    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">🛍️ Gestión de Productos</h2>
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setMostrarModal(true)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ➕ Agregar producto
                </button>
            </div>


            <div className="grid gap-4">
                {productosPaginados.map(prod => (
                    <div key={prod._id} className="border rounded p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                        <div className="flex-1">
                            <h3 className="text-lg font-semibold">{prod.name}</h3>
                            <p className="text-sm text-gray-500">{prod.description}</p>
                            <p className="text-sm text-gray-600 font-medium">💲 {prod.price}</p>
                            <span className={`inline-block px-2 py-1 mt-2 text-xs rounded-full font-semibold ${prod.published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                }`}>
                                {prod.published ? "Publicado" : "No publicado"}
                            </span>
                        </div>

                        <div className="mt-4 md:mt-0 flex gap-2">
                            <button
                                onClick={() => cambiarEstado(prod._id, !prod.published)}
                                className="px-3 py-1 text-sm rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                {prod.published ? "Ocultar" : "Publicar"}
                            </button>
                            <button
                                onClick={() => eliminarProducto(prod._id)}
                                className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={() => {
                                    setProductoSeleccionado(prod);
                                    setEditarVisible(true);
                                }}
                                className="px-3 py-1 text-sm rounded bg-yellow-500 text-white hover:bg-yellow-600"
                            >
                                Editar
                            </button>

                        </div>
                    </div>
                ))}
            </div>

            {/* Controles de paginación */}
            {totalPaginas > 1 && (
                <div className="flex justify-center mt-6 gap-2">
                    {Array.from({ length: totalPaginas }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPagina(i + 1)}
                            className={`px-3 py-1 rounded ${pagina === i + 1 ? "bg-green-600 text-white" : "bg-gray-200"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            )}

            <ModalCrearProducto
                visible={mostrarModal}
                onClose={() => setMostrarModal(false)}
                onCreated={(nuevo) => {
                    setProductos([nuevo, ...productos]);
                }}
            />

            <ModalEditarProducto
                visible={editarVisible}
                onClose={() => setEditarVisible(false)}
                producto={productoSeleccionado}
                onUpdated={() => obtenerProductos()}
            />


        </AdminLayout>


    );
};

export default AdminProductos;
