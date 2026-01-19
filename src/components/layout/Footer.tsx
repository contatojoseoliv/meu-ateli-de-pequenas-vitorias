import * as React from "react";
import { Instagram, Facebook, Youtube, Mail, Heart } from "lucide-react";

/**
 * Footer seguindo o Manual da Marca
 * 
 * - Fundo Verde Eucalipto com texto branco
 * - Grid 3 colunas (desktop) → 1 coluna (mobile)
 * - Logo branco + tagline
 * - Links: Política, Termos, Contato
 * - Ícones de redes sociais
 * - Copyright © 2025
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  const legalLinks = [
    { label: 'Política de Privacidade', href: '/politica-privacidade' },
    { label: 'Termos de Uso', href: '/termos-uso' },
    { label: 'Contato', href: '/contato' },
  ];

  return (
    <footer className="bg-verde-eucalipto text-white py-16">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo + Tagline */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl mb-3">
              Meu Ateliê de <span className="font-handwritten text-2xl text-rosa-argila">Pequenas Vitórias</span>
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Transformando ansiedade em calma,<br />
              um pontinho de cada vez.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-rosa-argila">
              Links Úteis
            </h4>
            <nav className="flex flex-col space-y-2">
              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-rosa-argila">
              Siga-nos
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <a
              href="mailto:contato@meuatelie.com"
              className="inline-flex items-center gap-2 mt-4 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Mail size={16} />
              contato@meuatelie.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {currentYear} Meu Ateliê de Pequenas Vitórias. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com <Heart size={14} className="text-rosa-argila fill-rosa-argila" /> para você
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export { Footer };
