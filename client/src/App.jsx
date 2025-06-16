// import { useState } from 'react'

import './App.css'
import './index.css'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";
import BottomNav from "./components/BottomNav";

// function App() {
//   return (
//     <CartProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/carrito" element={<Cart />} />
//         </Routes>
//       </BrowserRouter>
//     </CartProvider>
//   );
// }

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <nav className="p-4 bg-gray-100 flex justify-between">
          <Link to="/" className="text-blue-700 font-semibold hover:underline">
            🍕 Menú
          </Link>
          <Link to="/carrito" className="text-blue-700 font-semibold hover:underline">
            🛒 Carrito
          </Link>
        </nav>
        <BottomNav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Cart />} />
          {/* Ruta de ejemplo para "más opciones" */}
          <Route path="/opciones" element={<div className="p-4">⚙️ Opciones futuras</div>} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </CartProvider>
  );
}

export default App
