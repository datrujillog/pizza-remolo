import { useCart } from "../context/CartContext";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { UrlBase, Url } from "../api/api";


const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const [customerName, setCustomerName] = useState("");
    const [address, setAddress] = useState("");
    const [note, setNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState(null);

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleSubmit = async () => {
        if (!address.trim()) {
            alert("Por favor ingresa la dirección de entrega.");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                items: cart.map(item => ({
                    productId: item._id,
                    quantity: item.quantity
                })),
                customerName,
                address,
                note,
                total
            };

            // const res = await axios.post("http://localhost:5000/api/orders", orderData);
            const res = await axios.post(`${UrlBase}/api/orders`, orderData);

            if (res.data && res.data.whatsappUrl) {
                console.log("✅ Enlace generado:", res.data.whatsappUrl);
                setWhatsappUrl(res.data.whatsappUrl);
                localStorage.setItem("lastOrderId", res.data.orderId); // ✅ Guardamos el ID del pedido reciente
                clearCart();
            } else {
                console.error("❌ No se recibió whatsappUrl del backend.");
                alert("No se pudo generar el enlace de WhatsApp.");
            }
        } catch (err) {
            console.error("❌ Error al enviar pedido:", err);
            alert("Ocurrió un error al enviar el pedido.");
        } finally {
            setLoading(false);
        }
    };

    console.log("📲 whatsappUrl:", whatsappUrl);

    useEffect(() => {
        if (whatsappUrl) {
            window.open(whatsappUrl, "_blank");
        }
    }, [whatsappUrl]);

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">🛒 Carrito de Compras</h1>

            {cart.length === 0 ? (
                <div className="text-center">
                    <p>Tu carrito está vacío.</p>
                    <Link to="/" className="text-blue-600 underline">Volver al menú</Link>
                </div>
            ) : (
                <>
                    <ul className="divide-y">
                        {cart.map(item => (
                            <li key={item._id} className="flex justify-between py-2">
                                <div>
                                    <p className="font-semibold">{item.name} x{item.quantity}</p>
                                    <p className="text-sm text-gray-600">${item.price}</p>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Quitar
                                </button>
                            </li>
                        ))}
                    </ul>

                    <p className="mt-4 font-bold">Total: ${total}</p>

                    <div className="space-y-2 mt-4">
                        <input
                            type="text"
                            placeholder="Tu nombre (opcional)"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <input
                            type="text"
                            placeholder="Dirección de entrega"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                            required
                        />
                        <textarea
                            placeholder="Nota adicional (opcional)"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="w-full border rounded px-3 py-2"
                        />
                        <button
                            onClick={handleSubmit}
                            className="bg-green-600 text-white px-4 py-2 rounded w-full"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar pedido por WhatsApp"}
                        </button>
                    </div>

                    {/* {whatsappUrl && (
                        <div className="mt-4 text-center">
                            <p className="text-green-600 font-semibold">¡Pedido listo!</p>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Abrir WhatsApp
                            </a>
                        </div>
                    )} */}

                    {typeof whatsappUrl === "string" && whatsappUrl.trim().length > 0 && (
                        <div className="mt-4 text-center">
                            <p className="text-green-600 font-semibold">¡Pedido listo!</p>
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white bg-green-600 px-4 py-2 rounded mt-2 inline-block"
                            >
                                Abrir WhatsApp manualmente
                            </a>
                        </div>


                    )}



                </>
            )}
        </div>
    );
};

export default Cart;
