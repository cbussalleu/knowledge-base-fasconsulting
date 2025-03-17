import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-white/70 mb-4">Oops! Página no encontrada</p>
        <a href="/" className="text-accent hover:text-accent-light underline">
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;
