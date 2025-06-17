import { useState, useEffect } from "react";
import axios from "axios";
import { UrlBase, Url } from "../api/api";


const ModalEditarCategoria = ({ visible, onClose, categoria, onUpdated }) => {
    const [form, setForm] = useState({ ...categoria });

    useEffect(() => {
        setForm({ ...categoria });
    }, [categoria]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            alert("El nombre es obligatorio.");
            return;
        }

        try {
            await axios.patch(`${UrlBase}/categories/${categoria._id}`, {
                name: form.name,
                visible: form.visible
            });

            onUpdated();
            onClose();
        } catch (err) {
            console.error("Error al actualizar categoría:", err);
            alert("Error al guardar cambios.");
        }
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
                <h3 className="text-xl font-bold mb-4 text-center">✏️ Editar Categoría</h3>

                <div className="space-y-3">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                    />
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="visible"
                            checked={form.visible}
                            onChange={handleChange}
                        />
                        Visible en la página principal
                    </label>
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

export default ModalEditarCategoria;
