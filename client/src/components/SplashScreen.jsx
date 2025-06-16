import { useEffect, useState } from "react";

const SplashScreen = () => {
    const [hide, setHide] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHide(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    if (hide) return null;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-red-600 animate-fade-in-out splash-bg">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-red-500 shadow-lg animate-bounce">
                <img src="/logo.jpg" alt="Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-3xl font-bold mt-4 tracking-wide animate-pulse">
                PIZZA DON REMOLO
            </h1>
        </div>
    );
};

export default SplashScreen;
