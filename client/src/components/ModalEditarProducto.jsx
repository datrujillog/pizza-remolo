import { useEffect, useState } from "react";
import axios from "axios";

const ModalEditarProducto = ({ visible, onClose, producto, onUpdated }) => {
    const [form, setForm] = useState({ ...producto });
    const [categorias, setCategorias] = useState([]);

    const UrlBase = "https://9gfhrk4h-5000.use2.devtunnels.ms";
    const UrlLocal = "http://localhost:5000";

    useEffect(() => {
        setForm({ ...producto });
    }, [producto]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const res = await axios.get(`${UrlBase}/api/categories/visible`);
                // const res = await axios.get("http://localhost:5000/api/categories/visible");
                setCategorias(res.data);
            } catch (err) {
                console.error("Error cargando categorías:", err);
            }
        };
        cargarCategorias();
    }, []);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.price || !form.categoryId) {
            alert("Faltan campos obligatorios.");
            return;
        }

        try {
            await axios.patch(`${UrlBase}/api/products/${producto._id}`, {
                // await axios.patch(`http://localhost:5000/api/products/${producto._id}`, {
                ...form
            });

            onUpdated();
            onClose();
        } catch (err) {
            console.error("Error al actualizar producto:", err);
            alert("Error al guardar cambios.");
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">✏️ Editar Producto</h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={form.description}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={form.price}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL de imagen"
                        value={form.imageUrl}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />

                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map(cat => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEditarProducto;
