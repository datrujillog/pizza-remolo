import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Home = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    const handleAdd = (prod) => {
        console.log("Agregando al carrito:", prod);
        addToCart(prod);
    };

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(res => {
                console.log("Productoss:", res.data);
                setProducts(res.data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map(prod => (
                <div key={prod._id} className="border p-4 rounded shadow">
                    <img src={prod.imageUrl} alt={prod.name} className="w-full h-40 object-cover rounded" />
                    <h2 className="text-lg font-bold">{prod.name}</h2>
                    <p>{prod.description}</p>
                    <p className="font-semibold">${prod.price}</p>
                    <button
                        onClick={() => handleAdd(prod)}
                        className="bg-blue-600 text-white mt-2 px-4 py-2 rounded"
                    >
                        Agregar
                    </button>
                    {/* <button onClick={() => handleAdd(prod)}>Agregar</button> */}

                </div>
            ))}
        </div>
    );
};

export default Home;
