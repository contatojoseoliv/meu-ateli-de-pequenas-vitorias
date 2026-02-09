import * as React from "react";
import { Facebook, Heart, Instagram, Mail, Youtube } from "lucide-react";

/**
 * Rodapé do App (minimal)
 * - Full width
 * - Sem coluna de links
 * - Mais curto
 */
export function AppFooterMinimal() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  return (
    <footer className="mt-8 bg-verde-eucalipto text-white py-6">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Marca */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-lg">
              Meu Ateliê de <span className="font-handwritten text-2xl text-rosa-argila">Pequenas Vitórias</span>
            </h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed mt-1">
              Transformando ansiedade em calma,
              <br />
              um pontinho de cada vez.
            </p>
          </div>

          {/* Redes + contato */}
          <div className="text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <a
              href="mailto:contato@meuatelie.com"
              className="inline-flex items-center justify-center md:justify-end gap-2 mt-3 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Mail size={16} />
              contato@meuatelie.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-5 pt-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs sm:text-sm text-white/60">
            <p>© {currentYear} Meu Ateliê de Pequenas Vitórias. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com <Heart size={14} className="text-rosa-argila fill-rosa-argila" /> para você
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
