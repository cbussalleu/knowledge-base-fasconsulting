<div className="flex flex-col space-y-6 pt-10">
  <a 
    href="#services" 
    className="nav-link py-2"
    onClick={() => setIsMenuOpen(false)}
  >
    Soluciones
  </a>
  <a 
    href="#about" 
    className="nav-link py-2"
    onClick={() => setIsMenuOpen(false)}
  >
    Casos
  </a>
  <a 
    href="#work" 
    className="nav-link py-2"
    onClick={() => setIsMenuOpen(false)}
  >
    Recursos
  </a>
  <a 
    href="/knowledge-base" 
    className="nav-link py-2 flex items-center"
    onClick={() => setIsMenuOpen(false)}
  >
    <span className="mr-2 text-accent">•</span>
    Knowledge Base
  </a>
  <a 
    href="#contact" 
    className="button-primary inline-block text-center w-full"
    onClick={() => setIsMenuOpen(false)}
  >
    <span>Colabora con nosotros</span>
  </a>
</div>
