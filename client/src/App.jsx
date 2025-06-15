// import { useState } from 'react'

import './App.css'
import './index.css'

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { CartProvider } from "./context/CartContext";

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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrito" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App
