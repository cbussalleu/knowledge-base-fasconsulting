import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirigir a Knowledge Base después de cargar
    navigate('/knowledge-base');
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark text-white">
      <div className="text-center">
        <h1 className="text-4xl font-display mb-4">FAS Consulting</h1>
        <p className="mb-8">Redirigiendo al Knowledge Base...</p>
      </div>
    </div>
  );
};

export default Index;
