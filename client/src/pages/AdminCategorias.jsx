import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";

const AdminCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [nuevaCategoria, setNuevaCategoria] = useState("");

    useEffect(() => {
        cargarCategorias();
    }, []);

    const cargarCategorias = async () => {
        try {
            const res = await axios.get("https://9gfhrk4h-5000.use2.devtunnels.ms/api/categories");
            setCategorias(res.data);
        } catch (err) {
            console.error("Error cargando categorías:", err);
        }
    };

    const crearCategoria = async () => {
        if (!nuevaCategoria.trim()) return;
        try {
            await axios.post("https://9gfhrk4h-5000.use2.devtunnels.ms/api/categories", {
                // await axios.post("http://localhost:5000/api/categories", {
                name: nuevaCategoria,
                visible: true
            });
            setNuevaCategoria("");
            cargarCategorias();
        } catch (err) {
            console.error("Error creando categoría:", err);
        }
    };

    const toggleVisibilidad = async (id, estadoActual) => {
        try {
            await axios.patch(`https://9gfhrk4h-5000.use2.devtunnels.ms/api/categories/${id}`, {
                // await axios.patch(`http://localhost:5000/api/categories/${id}`, {
                visible: !estadoActual
            });
            cargarCategorias();
        } catch (err) {
            console.error("Error cambiando visibilidad:", err);
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">📂 Categorías</h2>

            {/* Crear nueva */}
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={nuevaCategoria}
                    onChange={(e) => setNuevaCategoria(e.target.value)}
                    placeholder="Nueva categoría"
                    className="border px-3 py-2 rounded w-full"
                />
                <button
                    onClick={crearCategoria}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    ➕ Crear
                </button>
            </div>

            {/* Lista */}
            <div className="grid gap-4">
                {categorias.map(cat => (
                    <div
                        key={cat._id}
                        className="border rounded p-4 flex justify-between items-center shadow-sm"
                    >
                        <div>
                            <p className="font-semibold">{cat.name}</p>
                            <p className="text-sm text-gray-500">
                                Estado:{" "}
                                <span
                                    className={`font-bold ${cat.visible ? "text-green-600" : "text-red-500"
                                        }`}
                                >
                                    {cat.visible ? "Visible" : "Oculta"}
                                </span>
                            </p>
                        </div>
                        <button
                            onClick={() => toggleVisibilidad(cat._id, cat.visible)}
                            className={`px-4 py-2 rounded text-white ${cat.visible ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {cat.visible ? "Ocultar" : "Mostrar"}
                        </button>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
};

export default AdminCategorias;
