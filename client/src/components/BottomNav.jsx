import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
    const location = useLocation();
    const current = location.pathname;

    const navItems = [
        { label: "Inicio", icon: "🏠", path: "/" },
        { label: "Menú", icon: "🍽️", path: "/" },
        { label: "Carrito", icon: "🛒", path: "/carrito" },
        { label: "Más", icon: "⚙️", path: "/opciones" }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-20 bg-white border-t shadow-inner flex justify-around items-center h-16 md:hidden">
            {navItems.map((item) => (
                <Link
                    key={item.path}
                    to={item.path}
                    className={`flex flex-col items-center text-sm ${current === item.path ? "text-green-600 font-semibold" : "text-gray-500"
                        }`}
                >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                </Link>
            ))}
        </nav>
    );
};

export default BottomNav;
