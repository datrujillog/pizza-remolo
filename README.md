# pizza-remolo

🧾 Resumen del Proyecto - Pizzería Don Remolo

Objetivo:
Crear un menú online para que los clientes armen su pedido, vean el total y lo envíen por WhatsApp.

Puntos clave:

No requiere registro de usuario.

Categorías: Pizzas, Empanadas, Bebidas, Postres.

Carrito de compras simple con cantidades.

Checkout que genera un mensaje de WhatsApp con el pedido.

Solo se acepta efectivo y el delivery es propio.

💡 Arquitectura propuesta
🧠 Backend (Node.js + Express)
Base de datos: PostgreSQL (con Prisma como ORM).

API RESTful con endpoints como:

GET /menu → Listado completo de productos por categoría.

POST /pedido → Recibe el carrito y genera el texto del pedido.

Categorías: pizzas, empanadas, bebidas y postres (usando tus imágenes como assets).

Control de errores y validaciones mínimas.

🎨 Frontend (React + Vite)
Página principal: Listado de comidas (filtros por categoría).

Carrito: mostrar los productos añadidos.

Confirmación: botón que redirige al link de WhatsApp con el pedido listo.

Estilos con TailwindCSS (rápido, limpio y fácil de escalar).

Manejo de estado con Context API (o Redux si se quiere escalar más adelante).

📦 Ejemplo de estructura de carpetas

backend/
├── src/
│   ├── controllers/
│   ├── routes/
│   ├── prisma/
│   └── app.ts
└── package.json

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   └── App.tsx
└── vite.config.ts

📱 Ejemplo del mensaje de WhatsApp generado

Hola, quiero hacer un pedido:
🍕 Pizza Jamón y Morrón x1
🥟 Empanada de Carne x2
🥟 Empanada de Atún x1
🍫 Bombones surtidos x1
🥤 Cerveza Brahma x2
💰 Total: $56.000
Por favor confirmar. Pago en efectivo y envío a domicilio.

(El link se genera con encodeURIComponent() para que quede como parte de un link como <https://wa.me/NUMERO?text=>...)
