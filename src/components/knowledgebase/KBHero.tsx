import { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

export const KBHero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
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
      ref={sectionRef} 
      className="min-h-[50vh] flex items-center pt-24 pb-16 bg-dark opacity-0 transition-opacity duration-1000"
    >
      <div className="section-container">
        <div className="flex flex-col items-start">
          <div className="mb-8">
            <div className="chip bg-muted text-accent mb-5">EXPLORA Y <span className="text-accent-light">COLABORA</span></div>
            <div className="chip bg-muted text-primary mb-5 ml-0 md:ml-8">APRENDE E <span className="text-primary-dark">INNOVA</span></div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display tracking-tight text-white mb-8 uppercase w-full">
            <div className="text-reveal-container">
              <span className="text-reveal delay-50">C</span>
              <span className="text-reveal delay-100">O</span>
              <span className="text-reveal delay-150">N</span>
              <span className="text-reveal delay-200">S</span>
              <span className="text-reveal delay-250">U</span>
              <span className="text-reveal delay-300">L</span>
              <span className="text-reveal delay-350">T</span>
              <span className="text-reveal delay-400">I</span>
              <span className="text-reveal delay-450">N</span>
              <span className="text-reveal delay-500">G</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-100">K</span>
              <span className="text-reveal delay-150">N</span>
              <span className="text-reveal delay-200">O</span>
              <span className="text-reveal delay-250">W</span>
              <span className="text-reveal delay-300">L</span>
              <span className="text-reveal delay-350">E</span>
              <span className="text-reveal delay-400">D</span>
              <span className="text-reveal delay-450">G</span>
              <span className="text-reveal delay-500">E</span>
            </div>
            <div className="text-reveal-container mt-1">
              <span className="text-reveal delay-150">B</span>
              <span className="text-reveal delay-200">A</span>
              <span className="text-reveal delay-250">S</span>
              <span className="text-reveal delay-300">E</span>
            </div>
          </h1>
          
          <div className="mb-12">
            <a href="#updates" className="text-accent hover:text-accent-light font-medium transition-colors duration-300 flex items-center group">
              <span>Descubre los últimos recursos y actualizaciones</span>
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
