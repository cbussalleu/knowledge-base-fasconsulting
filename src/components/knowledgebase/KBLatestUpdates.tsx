import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Calendar, ArrowRight, Bell, X } from 'lucide-react';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from '@/lib/utils';

type CurrentVersionStatus = 'Publicado' | 'Corrección de errores' | 'Modificado';
type NextVersionStatus = 'Sin iniciar' | 'En proceso' | 'Solicitando feedback';

interface CurrentVersionItem {
  id: string;
  date: string;
  title: string;
  status: CurrentVersionStatus;
  description: string;
}

interface NextVersionItem {
  id: string;
  title: string;
  status: NextVersionStatus;
  description: string;
  estimatedDate: string;
}

const currentVersionUpdates: CurrentVersionItem[] = [
  {
    id: "update-1",
    date: "Mar-15",
    title: "Centralización de recursos para proyectos de Consulting",
    status: "Publicado",
    description: "Nueva sección con plantillas, guías y casos de referencia para proyectos de consultoría organizados por vertical y tipo de solución."
  },
  {
    id: "update-2",
    date: "Mar-10",
    title: "Actualización de metodología de Customer Journey Mapping",
    status: "Modificado",
    description: "Se ha actualizado la metodología de CJM con nuevas plantillas, ejemplos y una guía paso a paso para facilitar su implementación en cualquier proyecto."
  },
  {
    id: "update-3",
    date: "Mar-5",
    title: "Toolkit de CX Assessment para proyectos rápidos",
    status: "Corrección de errores",
    description: "Solucionados errores en los enlaces y referencias del toolkit estandarizado para evaluaciones rápidas de CX."
  },
  {
    id: "update-4",
    date: "Feb-28",
    title: "Nueva base de datos de métricas CX por industria",
    status: "Publicado",
    description: "Hemos incorporado una base de datos de benchmarks CX por industria para ayudar a contextualizar los resultados de proyectos y establecer objetivos realistas."
  },
  {
    id: "update-5",
    date: "Feb-22",
    title: "Actualización de plantillas para propuestas comerciales",
    status: "Modificado",
    description: "Las plantillas para propuestas comerciales han sido renovadas con nuevos formatos, ejemplos de alcance y estimaciones por tipo de proyecto."
  }
];

const nextVersionUpdates: NextVersionItem[] = [
  {
    id: "next-1",
    title: "Reestructuración global del Knowledge Base",
    status: "En proceso",
    description: "Reorganización completa de la arquitectura de información para mejorar la navegación y descubrimiento de contenidos por verticales, industrias y tipos de solución.",
    estimatedDate: "Abr 2025"
  },
  {
    id: "next-2",
    title: "Nueva plantilla unificada de casos de éxito",
    status: "Solicitando feedback",
    description: "Plantilla estandarizada para documentar casos de éxito con métricas, aprendizajes clave y elementos visuales reutilizables.",
    estimatedDate: "Abr 2025"
  },
  {
    id: "next-3",
    title: "Biblioteca de recursos y tutoriales en vídeo",
    status: "Sin iniciar",
    description: "Creación de una sección dedicada a contenido en formato vídeo para explicar metodologías y herramientas de Consulting.",
    estimatedDate: "May 2025"
  },
  {
    id: "next-4",
    title: "Sistema de recomendación inteligente de recursos",
    status: "Sin iniciar",
    description: "Implementación de un sistema basado en IA que recomienda recursos según tu rol, proyectos anteriores y patrones de uso.",
    estimatedDate: "Jun 2025"
  },
  {
    id: "next-5",
    title: "Integración con Slack para notificaciones",
    status: "En proceso",
    description: "Desarrollo de un bot de Slack que notifica sobre nuevos recursos y actualizaciones relevantes para tu equipo.",
    estimatedDate: "May 2025"
  }
];

const getCurrentVersionStatusColor = (status: CurrentVersionStatus) => {
  switch(status) {
    case "Publicado":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "Modificado":
      return "bg-accent/10 text-accent border-accent/20";
    case "Corrección de errores":
      return "bg-primary/10 text-primary border-primary/20";
    default:
      return "bg-accent/10 text-accent border-accent/20";
  }
};

const getNextVersionStatusColor = (status: NextVersionStatus) => {
  switch(status) {
    case "Sin iniciar":
      return "bg-gray-400/10 text-gray-400 border-gray-400/20";
    case "En proceso":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    case "Solicitando feedback":
      return "bg-purple-400/10 text-purple-400 border-purple-400/20";
    default:
      return "bg-accent/10 text-accent border-accent/20";
  }
};

export const KBLatestUpdates = () => {
  const [openCurrentItems, setOpenCurrentItems] = useState<string[]>([]);
  const [openNextItems, setOpenNextItems] = useState<string[]>([]);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CurrentVersionItem | NextVersionItem | null>(null);
  const [email, setEmail] = useState("");
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

  const toggleCurrentItem = (id: string) => {
    setOpenCurrentItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const toggleNextItem = (id: string) => {
    setOpenNextItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleSubscribe = (item: CurrentVersionItem | NextVersionItem) => {
    setCurrentItem(item);
    setSubscribeDialogOpen(true);
  };

  const submitSubscription = () => {
    // This would be replaced with your actual subscription API call
    if (!email || !email.includes('@')) {
      toast({
        title: "Error",
        description: "Por favor, introduce un email válido",
        variant: "destructive"
      });
      return;
    }

    // Mock API call
    toast({
      title: "Suscripción exitosa",
      description: `Te notificaremos sobre actualizaciones para "${currentItem?.title}"`,
    });
    
    setSubscribeDialogOpen(false);
    setEmail("");
  };

  return (
    <section 
      id="updates"
      ref={sectionRef} 
      className={cn(
        "py-24 bg-dark transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="section-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            FAS Consulting KB v1.3
          </h2>
          <div className="mt-6 w-24 h-1 bg-accent mx-auto"></div>
          <p className="text-white/70 mt-8 max-w-3xl mx-auto">
            Bienvenido a la Knowledge Base de FAS Consulting. Esta plataforma centraliza todos los recursos, 
            metodologías y herramientas para nuestros equipos. Descubre las últimas actualizaciones 
            y próximas mejoras que estamos desarrollando para optimizar tu experiencia.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {/* Left Column - Current Version Updates */}
          <div>
            <h3 className="text-2xl font-display text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-green-500 mr-3"></span>
              Novedades de esta versión
            </h3>
            
            <div className="space-y-4">
              {currentVersionUpdates.map((item) => (
                <Collapsible 
                  key={item.id}
                  open={openCurrentItems.includes(item.id)}
                  onOpenChange={() => toggleCurrentItem(item.id)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                    <div className="flex items-center gap-6 w-full">
                      <div className="flex items-center justify-center min-w-16 text-white/60">
                        <Calendar size={14} className="mr-1" />
                        <span className="text-sm font-mono">{item.date}</span>
                      </div>
                      
                      <div className="flex-grow font-medium text-white">{item.title}</div>
                      
                      <Badge className={cn(
                        "ml-auto px-3 py-0.5 text-xs font-mono border",
                        getCurrentVersionStatusColor(item.status)
                      )}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="ml-4">
                      {openCurrentItems.includes(item.id) ? (
                        <ChevronUp size={18} className="text-white/60" />
                      ) : (
                        <ChevronDown size={18} className="text-white/60" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-1 text-white/80 animation-accordion-down">
                    <div className="pl-16 pr-4 border-l border-white/10 ml-8">
                      <p>{item.description}</p>
                      
                      <div className="mt-4 flex items-center gap-4">
                        <button 
                          onClick={() => handleSubscribe(item)}
                          className="text-accent text-sm flex items-center group hover:text-accent-light"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Suscribirse a actualizaciones</span>
                        </button>
                        
                        <button className="text-primary text-sm flex items-center group hover:text-primary-light">
                          <span>Ver detalles</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
          
          {/* Right Column - Next Version Updates */}
          <div>
            <h3 className="text-2xl font-display text-white mb-6 flex items-center">
              <span className="w-1 h-8 bg-yellow-500 mr-3"></span>
              Novedades para la siguiente actualización
            </h3>
            
            <div className="space-y-4">
              {nextVersionUpdates.map((item) => (
                <Collapsible 
                  key={item.id}
                  open={openNextItems.includes(item.id)}
                  onOpenChange={() => toggleNextItem(item.id)}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left">
                    <div className="flex items-center gap-6 w-full">
                      <div className="flex items-center justify-center min-w-16 text-white/60">
                        <Calendar size={14} className="mr-1" />
                        <span className="text-sm font-mono">{item.estimatedDate}</span>
                      </div>
                      
                      <div className="flex-grow font-medium text-white">{item.title}</div>
                      
                      <Badge className={cn(
                        "ml-auto px-3 py-0.5 text-xs font-mono border",
                        getNextVersionStatusColor(item.status)
                      )}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="ml-4">
                      {openNextItems.includes(item.id) ? (
                        <ChevronUp size={18} className="text-white/60" />
                      ) : (
                        <ChevronDown size={18} className="text-white/60" />
                      )}
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="px-4 pb-4 pt-1 text-white/80 animation-accordion-down">
                    <div className="pl-16 pr-4 border-l border-white/10 ml-8">
                      <p>{item.description}</p>
                      
                      <div className="mt-4 flex items-center gap-4">
                        <button 
                          onClick={() => handleSubscribe(item)}
                          className="text-accent text-sm flex items-center group hover:text-accent-light"
                        >
                          <Bell className="mr-2 h-4 w-4" />
                          <span>Suscribirse a actualizaciones</span>
                        </button>
                        
                        <button className="text-yellow-500 text-sm flex items-center group hover:text-yellow-400">
                          <span>Dar feedback</span>
                          <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                        </button>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subscribe Dialog */}
      <Dialog open={subscribeDialogOpen} onOpenChange={setSubscribeDialogOpen}>
        <DialogContent className="bg-dark border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-display">Suscribirse a actualizaciones</DialogTitle>
            <DialogDescription className="text-white/70">
              Recibirás notificaciones cuando haya nuevos contenidos o actualizaciones relacionadas con este tema.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h4 className="text-white font-medium mb-2">{currentItem?.title}</h4>
            <p className="text-white/60 text-sm mb-4">{'description' in (currentItem || {}) ? currentItem?.description : ''}</p>
            
            <div className="space-y-4 mt-4">
              <div>
                <label htmlFor="email" className="text-sm text-white/80 mb-2 block">
                  Email corporativo
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu.nombre@findasense.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSubscribeDialogOpen(false)}
                  className="border-white/10 text-white hover:bg-white/5"
                >
                  Cancelar
                </Button>
                <Button 
                  onClick={submitSubscription}
                  className="bg-accent hover:bg-accent-light text-white"
                >
                  Suscribirse
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};
