import { useState, useEffect } from "react";
import axios from "axios";

const ModalCrearProducto = ({ visible, onClose, onCreated }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        imageUrl: "",
        categoryId: ""
    });

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const res = await axios.get("https://9gfhrk4h-5000.use2.devtunnels.ms/api/categories");
                // const res = await axios.get("http://localhost:5000/api/categories");
                setCategorias(res.data.filter(cat => cat.visible));
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
            alert("Nombre, precio y categoría son obligatorios.");
            return;
        }

        try {
            await axios.post("https://9gfhrk4h-5000.use2.devtunnels.ms/api/products/create", {
                ...form,
                published: false
            });

            onCreated();
            onClose();
        } catch (err) {
            console.error("Error creando producto:", err);
            alert("Error al crear producto.");
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">➕ Nuevo Producto</h3>

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

                    {/* Selector de categoría */}
                    <select
                        name="categoryId"
                        value={form.categoryId}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((cat) => (
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
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                        Guardar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalCrearProducto;
