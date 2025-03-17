// src/pages/Index.tsx
import { Navigate } from 'react-router-dom';

const Index = () => {
  // Opción 1: Redirigir directamente a Knowledge Base
  return <Navigate to="/knowledge-base" replace />;
  
  // O alternativamente, muestra una página simple:
  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-dark text-white">
  //     <div className="text-center">
  //       <h1 className="text-4xl font-display mb-4">FAS Consulting</h1>
  //       <p className="mb-8">Bienvenido al portal de recursos</p>
  //       <a href="/knowledge-base" className="button-primary">
  //         Acceder al Knowledge Base
  //       </a>
  //     </div>
  //   </div>
  // );
};

export default Index;
