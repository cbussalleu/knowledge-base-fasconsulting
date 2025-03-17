import { useEffect, useRef, useState } from 'react';
import { HelpCircle, Search, Upload, Users, PlusCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from '@/lib/utils';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Cómo puedo solicitar acceso a documentos protegidos?",
    answer: "Los documentos protegidos requieren permisos específicos. Contacta a tu líder de equipo o al administrador de la Knowledge Base a través de knowledge@findasense.com para solicitar acceso."
  },
  {
    question: "¿Puedo subir mis propios documentos a la Knowledge Base?",
    answer: "¡Sí! La colaboración es bienvenida. Haz clic en el botón 'Contribuir' en la parte superior de la página para enviar tu contenido. Pasará por un proceso rápido de revisión antes de ser publicado."
  },
  {
    question: "¿Cómo se organizan los documentos en la Knowledge Base?",
    answer: "Los documentos están categorizados por tipo (casos, metodologías, plantillas, etc.), práctica (Intelligence, Strategy, Content, etc.) y solución. Puedes utilizar los filtros en la barra de búsqueda para encontrar contenido específico."
  },
  {
    question: "¿Puedo usar estos recursos para proyectos con clientes?",
    answer: "Sí, ese es el propósito principal de la Knowledge Base. Sin embargo, asegúrate de revisar la etiqueta de clasificación del documento. Los marcados como 'Uso interno' no deben compartirse con clientes sin adaptación previa."
  }
];

const helpFeatures = [
  {
    id: "search",
    title: "Búsqueda Avanzada",
    description: "Utiliza la búsqueda para encontrar documentos por palabra clave, autor, categoría o fecha",
    icon: <Search className="h-6 w-6" />,
    color: "bg-accent/10 text-accent"
  },
  {
    id: "contribute",
    title: "Contribuye",
    description: "Comparte tu conocimiento y recursos con el resto del equipo",
    icon: <Upload className="h-6 w-6" />,
    color: "bg-primary/10 text-primary"
  },
  {
    id: "collaborate",
    title: "Colabora",
    description: "Comenta y sugiere mejoras en los documentos existentes",
    icon: <Users className="h-6 w-6" />,
    color: "bg-purple-light/10 text-purple-light"
  },
  {
    id: "request",
    title: "Solicita Contenido",
    description: "¿No encuentras lo que buscas? Solicita que se cree nuevo contenido",
    icon: <PlusCircle className="h-6 w-6" />,
    color: "bg-green-500/10 text-green-500"
  }
];

export const KBHelpSection = () => {
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
      id="help"
      ref={sectionRef} 
      className={cn(
        "py-24 bg-dark transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <HelpCircle className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            Centro de Ayuda
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Left side - Help features */}
          <div>
            <h3 className="text-2xl font-display text-white mb-6">Cómo Usar la Knowledge Base</h3>
            
            <div className="space-y-6">
              {helpFeatures.map((feature) => (
                <div key={feature.id} className="flex gap-4 group">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-lg font-medium group-hover:text-accent transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-white/70 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right side - FAQs */}
          <div>
            <h3 className="text-2xl font-display text-white mb-6">Preguntas Frecuentes</h3>
            
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="border-b border-white/10"
                >
                  <AccordionTrigger className="text-white hover:text-accent">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-white/70">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="text-white font-medium mb-2">¿Necesitas más ayuda?</h4>
              <p className="text-white/70 text-sm">
                Contacta al equipo de Knowledge Base en{' '}
                <a href="mailto:knowledge@findasense.com" className="text-accent hover:text-accent-light">
                  knowledge@findasense.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
