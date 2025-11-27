const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Lab Info */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-sm font-light tracking-[0.15em] uppercase">THE</span>
              <span className="font-caslon font-normal text-2xl italic normal-case tracking-normal">Polissi</span>
              <span className="text-sm font-light tracking-[0.15em] uppercase">LAB</span>
            </h3>
            <p className="text-muted-foreground mb-4">
              Advancing molecular science through innovative research and collaboration.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-right">
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><a href="#research" className="text-muted-foreground hover:text-accent smooth-transition">Research</a></li>
              <li><a href="#publications" className="text-muted-foreground hover:text-accent smooth-transition">Publications</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-accent smooth-transition">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground flex items-center justify-center gap-2">
            <span className="text-sm tracking-[0.1em] uppercase">© {currentYear} THE</span>
            <span className="font-caslon font-normal text-lg italic normal-case tracking-normal">Polissi</span>
            <span className="text-sm tracking-[0.1em] uppercase">LAB. ALL RIGHTS RESERVED.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;