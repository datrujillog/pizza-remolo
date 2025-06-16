import { Link } from "react-router-dom";

const AdminLayout = ({ children }) => {
    // const [mostrarModal, setMostrarModal] = useState(false);



    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-60 bg-gray-100 p-4 shadow-md">
                <h2 className="text-xl font-bold mb-6 text-center text-green-700">🍕 Don Remolo</h2>
                <nav className="flex flex-col gap-3">
                    <Link to="/admin" className="text-gray-800 hover:text-green-600">📋 Pedidos</Link>
                    <Link to="/admin/categorias" className="text-gray-800 hover:text-green-600">📋 Categorias</Link>
                    <Link to="/admin/productos" className="text-gray-800 hover:text-green-600">🛍️ Productos</Link>
                    <Link to="/admin/config" className="text-gray-800 hover:text-green-600">⚙️ Configuración</Link>
                </nav>
            </aside>

            {/* Contenido */}
            <main className="flex-1 bg-white p-6">
                {children}
            </main>


        </div>
    );
};

export default AdminLayout;
