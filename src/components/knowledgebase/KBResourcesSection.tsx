import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Resource {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  textColor: string;
  count: number;
}

const resources: Resource[] = [
  {
    id: "cases",
    title: "Casos",
    description: "Accede a toda la documentación de casos de éxito",
    icon: "📊",
    color: "from-primary/20 to-primary/5",
    textColor: "text-primary",
    count: 34
  },
  {
    id: "decks",
    title: "Decks de Solución",
    description: "Presentaciones y resúmenes de soluciones para uso comercial",
    icon: "🎯",
    color: "from-accent/20 to-accent/5",
    textColor: "text-accent",
    count: 28
  },
  {
    id: "articles",
    title: "Artículos",
    description: "Publicaciones y estudios de CX que hemos publicado",
    icon: "📝",
    color: "from-purple-light/20 to-purple-light/5",
    textColor: "text-purple-light",
    count: 19
  },
  {
    id: "toolkit",
    title: "Toolkit Metodológico",
    description: "Procesos y marcos de trabajo que usamos según la necesidad del proyecto",
    icon: "🛠️",
    color: "from-coral-light/20 to-coral-light/5",
    textColor: "text-coral-light",
    count: 15
  },
  {
    id: "templates",
    title: "Plantillas",
    description: "Plantillas reutilizables para diferentes tipos de entregables y documentación",
    icon: "📋",
    color: "from-green-500/20 to-green-500/5",
    textColor: "text-green-500",
    count: 42
  },
  {
    id: "trainings",
    title: "Formación Interna",
    description: "Materiales de capacitación y desarrollo profesional para el equipo",
    icon: "🎓",
    color: "from-yellow-500/20 to-yellow-500/5", 
    textColor: "text-yellow-500",
    count: 23
  }
];

export const KBResourcesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      id="resources"
      ref={sectionRef} 
      className={cn(
        "py-24 bg-dark transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            CENTRO DE RECURSOS DE CONSULTING
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <div 
              key={resource.id}
              className="highlight-box bg-gradient-to-br from-dark to-secondary/40 group cursor-pointer h-full"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${resource.color} text-2xl`}>
                  {resource.icon}
                </div>
                <div className={`${resource.textColor} text-sm font-mono rounded-full border border-white/10 px-3 py-1 bg-dark/50`}>
                  {resource.count} docs
                </div>
              </div>
              
              <h3 className={`text-xl font-display mb-3 ${resource.textColor}`}>{resource.title}</h3>
              <p className="text-white/70 mb-6">{resource.description}</p>
              
              <div className="mt-auto pt-4 flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={resource.textColor}>Explorar</span>
                <ArrowRight className={`ml-2 ${resource.textColor} group-hover:translate-x-1 transition-transform`} size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
