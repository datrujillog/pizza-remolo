import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("todos");
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get("https://9gfhrk4h-5000.use2.devtunnels.ms/api/products")
            // axios.get("http://localhost:5000/api/products")
            .then(res => {
                setProducts(res.data);
                setFiltered(res.data);
            })
            .catch(console.error);
    }, []);

    const handleFilter = (category) => {
        setSelectedCategory(category);

        if (category === "todos") {
            setFiltered(products);
        } else {
            setFiltered(products.filter(p => p.category === category));
        }

        // Hacer scroll automático al menú
        const menu = document.getElementById("category-menu");
        if (menu) {
            window.scrollTo({
                top: menu.offsetTop - 10,
                behavior: "smooth"
            });
        }
    };

    const categories = ["todos", "pizza", "empanada", "bebida", "postre"];
    const labels = {
        todos: "🍽️ Todos",
        pizza: "🍕 Pizzas",
        empanada: "🥟 Empanadas",
        bebida: "🥤 Bebidas",
        postre: "🍨 Postres"
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Menú</h1>

            {/* Menú sticky */}
            <div
                id="category-menu"
                className="sticky top-0 z-10 bg-white py-3 overflow-x-auto scrollbar-hide"
            >
                <div className="flex gap-3 px-2 w-max min-w-full">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleFilter(cat)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold shadow-md transition-all duration-150 whitespace-nowrap ${selectedCategory === cat
                                    ? "bg-green-600 text-white scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-xl">{labels[cat].slice(0, 2)}</span>
                            <span>{labels[cat].slice(2)}</span>
                        </button>
                    ))}
                </div>
            </div>


            {/* Lista de productos con animación */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedCategory}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {filtered.map(prod => (
                        <div key={prod._id} className="border p-4 rounded shadow bg-white">
                            <img src={prod.imageUrl} alt={prod.name} className="w-full h-40 object-cover rounded" />
                            <h2 className="text-lg font-bold mt-2">{prod.name}</h2>
                            <p className="text-sm text-gray-600">{prod.description}</p>
                            <p className="font-semibold mt-1">${prod.price}</p>
                            <button
                                onClick={() => addToCart(prod)}
                                className="bg-blue-600 text-white mt-2 px-4 py-2 rounded w-full"
                            >
                                Agregar
                            </button>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Home;
