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
import { cn } from "@/lib/utils";

type UpdateStatus = 'Nuevo' | 'Actualizado' | 'En progreso';

interface UpdateItem {
  id: string;
  date: string;
  title: string;
  status: UpdateStatus;
  description: string;
}

const updates: UpdateItem[] = [
  {
    id: "update-1",
    date: "Mar-15",
    title: "Centralización de recursos para proyectos de Consulting",
    status: "Nuevo",
    description: "Nueva sección con plantillas, guías y casos de referencia para proyectos de consultoría organizados por vertical y tipo de solución."
  },
  {
    id: "update-2",
    date: "Mar-10",
    title: "Actualización de metodología de Customer Journey Mapping",
    status: "Actualizado",
    description: "Se ha actualizado la metodología de CJM con nuevas plantillas, ejemplos y una guía paso a paso para facilitar su implementación en cualquier proyecto."
  },
  {
    id: "update-3",
    date: "Mar-5",
    title: "Toolkit de CX Assessment para proyectos rápidos",
    status: "En progreso",
    description: "Estamos desarrollando un toolkit estandarizado para evaluaciones rápidas de CX que permitirá generar diagnósticos en menos de 2 semanas. Incluirá plantillas, guiones y metodología."
  },
  {
    id: "update-4",
    date: "Feb-28",
    title: "Nueva base de datos de métricas CX por industria",
    status: "Nuevo",
    description: "Hemos incorporado una base de datos de benchmarks CX por industria para ayudar a contextualizar los resultados de proyectos y establecer objetivos realistas."
  },
  {
    id: "update-5",
    date: "Feb-22",
    title: "Actualización de plantillas para propuestas comerciales",
    status: "Actualizado",
    description: "Las plantillas para propuestas comerciales han sido renovadas con nuevos formatos, ejemplos de alcance y estimaciones por tipo de proyecto."
  }
];

const getStatusColor = (status: UpdateStatus) => {
  switch(status) {
    case "Nuevo":
      return "bg-accent/10 text-accent border-accent/20";
    case "Actualizado":
      return "bg-primary/10 text-primary border-primary/20";
    case "En progreso":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    default:
      return "bg-accent/10 text-accent border-accent/20";
  }
};

export const KBLatestUpdates = () => {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [subscribeDialogOpen, setSubscribeDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<UpdateItem | null>(null);
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

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id) 
        : [...prev, id]
    );
  };

  const handleSubscribe = (item: UpdateItem) => {
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
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            FAS Consulting KB v1.3
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {updates.map((item) => (
            <Collapsible 
              key={item.id}
              open={openItems.includes(item.id)}
              onOpenChange={() => toggleItem(item.id)}
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
                    getStatusColor(item.status)
                  )}>
                    {item.status}
                  </Badge>
                </div>
                <div className="ml-4">
                  {openItems.includes(item.id) ? (
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
            <p className="text-white/60 text-sm mb-4">{currentItem?.description}</p>
            
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
