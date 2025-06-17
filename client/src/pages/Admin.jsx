import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../layouts/AdminLayout";
import { UrlBase, Url } from "../api/api";

const Admin = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const estados = ["recibido", "en preparacion", "listo", "entregado"];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await axios.get(`${UrlBase}/orders`);
            //   const res = await axios.get("http://localhost:5000/api/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error al cargar pedidos", err);
        } finally {
            setLoading(false);
        }
    };

    const handleEstadoChange = async (id, newEstado) => {
        try {
            await axios.patch(`${UrlBase}/orders/${id}/status`, { status: newEstado });
            //   await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status: newEstado });
            fetchOrders();
        } catch (err) {
            console.error("Error al actualizar estado", err);
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">📋 Panel de Pedidos</h2>

            {loading ? (
                <p>Cargando pedidos...</p>
            ) : (
                orders.map(order => (
                    <div key={order._id} className="border rounded-lg p-4 mb-4 shadow">
                        <p className="font-semibold">🧑 Cliente: {order.customerName || "No especificado"}</p>
                        <p>📍 Dirección: {order.address}</p>
                        <p>📝 Nota: {order.note || "Ninguna"}</p>
                        <p>🕒 Fecha: {new Date(order.createdAt).toLocaleString()}</p>

                        <ul className="mt-2 text-sm list-disc list-inside">
                            {order.items.map(item => (
                                <li key={item.productId._id}>
                                    {item.productId.name} x{item.quantity}
                                </li>
                            ))}
                        </ul>

                        <p className="font-semibold mt-2">💰 Total: ${order.total}</p>

                        <div className="mt-3">
                            <label className="mr-2 font-semibold">Estado:</label>
                            <select
                                value={order.status}
                                onChange={e => handleEstadoChange(order._id, e.target.value)}
                                className={`border px-3 py-1 rounded font-medium ${order.status === "recibido"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "en preparación"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "listo"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-gray-200 text-gray-800"
                                    }`}
                            >
                                {estados.map(e => (
                                    <option key={e} value={e}>{e}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                ))
            )}
        </AdminLayout>
    );
};

export default Admin;
