import { useEffect, useRef, useState } from 'react';
import { FileText, Eye, Download, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from '@/lib/utils';

interface TopResource {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  date: string;
  author: string;
  viewCount: number;
  downloadCount: number;
}

const topResources: TopResource[] = [
  {
    id: "res-1",
    title: "Guía de Implementación de Voice of Customer",
    category: "Metodología",
    categoryColor: "bg-accent/10 text-accent border-accent/20",
    date: "Feb 2025",
    author: "María Rodríguez",
    viewCount: 243,
    downloadCount: 128
  },
  {
    id: "res-2",
    title: "Toolkit de Customer Journey Mapping",
    category: "Plantilla",
    categoryColor: "bg-primary/10 text-primary border-primary/20",
    date: "Ene 2025",
    author: "Carlos Mendoza",
    viewCount: 189,
    downloadCount: 156
  },
  {
    id: "res-3",
    title: "Caso de Éxito: Rediseño CX Banco XYZ",
    category: "Caso",
    categoryColor: "bg-purple-light/10 text-purple-light border-purple-light/20",
    date: "Mar 2025",
    author: "Laura González",
    viewCount: 176,
    downloadCount: 87
  },
  {
    id: "res-4",
    title: "Framework de Workshops para Discovery",
    category: "Metodología",
    categoryColor: "bg-accent/10 text-accent border-accent/20",
    date: "Feb 2025",
    author: "Javier Torres",
    viewCount: 165,
    downloadCount: 103
  },
  {
    id: "res-5",
    title: "Deck Comercial: Soluciones Data-Driven CX",
    category: "Comercial",
    categoryColor: "bg-green-500/10 text-green-500 border-green-500/20",
    date: "Mar 2025",
    author: "Ana Martínez",
    viewCount: 142,
    downloadCount: 94
  }
];

// Sort by view count
const mostViewed = [...topResources].sort((a, b) => b.viewCount - a.viewCount);

// Sort by download count
const mostDownloaded = [...topResources].sort((a, b) => b.downloadCount - a.downloadCount);

export const KBTopResourcesSection = () => {
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

  const ResourceList = ({ resources, icon, countLabel }: { 
    resources: TopResource[],
    icon: React.ReactNode,
    countLabel: string
  }) => (
    <div className="space-y-4">
      {resources.map((resource, index) => (
        <div 
          key={resource.id}
          className="highlight-box bg-gradient-to-br from-dark to-secondary/40 group cursor-pointer"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 text-white">
              {index + 1}
            </div>
            
            <div className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <div className={`text-xs font-mono rounded-full border px-2 py-0.5 ${resource.categoryColor}`}>
                  {resource.category}
                </div>
                <div className="flex items-center text-white/60 text-xs">
                  {icon}
                  <span className="ml-1">{countLabel === 'vistas' ? resource.viewCount : resource.downloadCount} {countLabel}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-white mb-2 group-hover:text-accent transition-colors">
                {resource.title}
              </h3>
              
              <div className="flex items-center justify-between text-xs text-white/60">
                <span>Actualizado: {resource.date}</span>
                <span>Autor: {resource.author}</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="text-accent text-xs flex items-center group-hover:text-accent-light">
              <span>Ver documento</span>
              <ExternalLink className="ml-1 h-3 w-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="key-figures"
      ref={sectionRef} 
      className={cn(
        "py-24 bg-dark transition-opacity duration-1000",
        isVisible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display text-white uppercase">
            TOP 5 RECURSOS
          </h2>
          <div className="mt-8 w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="most-viewed" className="w-full">
            <TabsList className="w-full mb-8 bg-white/5 p-1 border border-white/10">
              <TabsTrigger 
                value="most-viewed" 
                className="w-1/2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                <Eye className="mr-2 h-4 w-4" />
                Más vistos
              </TabsTrigger>
              <TabsTrigger 
                value="most-downloaded" 
                className="w-1/2 data-[state=active]:bg-white/10 data-[state=active]:text-white"
              >
                <Download className="mr-2 h-4 w-4" />
                Más descargados
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="most-viewed" className="focus-visible:outline-none">
              <ResourceList resources={mostViewed} icon={<Eye className="h-3 w-3" />} countLabel="vistas" />
            </TabsContent>
            
            <TabsContent value="most-downloaded" className="focus-visible:outline-none">
              <ResourceList resources={mostDownloaded} icon={<Download className="h-3 w-3" />} countLabel="descargas" />
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              Los datos de vistas y descargas son actualizados diariamente desde Google Drive Workplace.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
