import React, { useEffect, useState } from "react";

const ModalOpciones = ({ visible, onClose }) => {
    const [lastOrderId, setLastOrderId] = useState(null);

    useEffect(() => {
        const orderId = localStorage.getItem("lastOrderId");
        if (orderId) setLastOrderId(orderId);
    }, []);

    if (!visible) return null;

    const whatsappNumber = "573225741944"; // 👈 tu número real
    const mensajeBase = "Hola, necesito ayuda con mi pedido.";
    const mensajeConPedido = lastOrderId
        ? `Hola, necesito ayuda con mi pedido. Mi número de pedido es: ${lastOrderId}`
        : mensajeBase;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensajeConPedido)}`;

    return (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white w-11/12 max-w-md p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4 text-center">⚙️ Opciones</h2>
                <ul className="space-y-3 text-gray-700">
                    <li>
                        <p className="font-semibold">📞 Contacto:</p>
                        <p className="text-sm">+57 300 123 4567</p>
                    </li>
                    <li>
                        <p className="font-semibold">📧 Soporte:</p>
                        <p className="text-sm">soporte@donremolo.com</p>
                    </li>
                    <li>
                        <p className="font-semibold">📜 Términos y condiciones</p>
                        <p className="text-sm">Servicio solo disponible en Medellín. Pago contra entrega.</p>
                    </li>
                </ul>

                <a
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 w-full inline-block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
                >
                    💬 Escribir por WhatsApp
                </a>

                {lastOrderId && (
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        Incluyendo el número de tu último pedido: <strong>{lastOrderId}</strong>
                    </p>
                )}

                <button
                    onClick={onClose}
                    className="mt-3 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ModalOpciones;
