import * as React from "react";
import { Facebook, Heart, Instagram, Mail, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Rodapé do App (versão alinhada ao rodapé da página de vendas)
 * - Mesmo fundo/“clima” visual (Verde Eucalipto)
 * - Mesmos elementos principais (links + redes + e-mail + assinatura)
 * - Links internos do app na ordem: Página inicial → Perfil → Suporte
 */
export function AppFooterMinimal() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Youtube, href: "#", label: "YouTube" },
  ];

  const legalLinks = [
    { label: "Política de Privacidade", href: "/politica-privacidade" },
    { label: "Termos de Uso", href: "/termos-uso" },
    { label: "Contato", href: "/contato" },
  ];

  return (
    <footer className="mt-10 bg-verde-eucalipto text-white py-14">
      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Marca */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-xl mb-3">
              Meu Ateliê de <span className="font-handwritten text-2xl text-rosa-argila">Pequenas Vitórias</span>
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Transformando ansiedade em calma,
              <br />
              um pontinho de cada vez.
            </p>
          </div>

          {/* Links */}
          <div className="text-center">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-rosa-argila">Links</h4>

            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white/80 hover:text-white transition-colors text-sm">
                Página inicial
              </Link>
              <Link to="/app/perfil" className="text-white/80 hover:text-white transition-colors text-sm">
                Perfil
              </Link>
              <Link to="/app/suporte" className="text-white/80 hover:text-white transition-colors text-sm">
                Suporte
              </Link>

              <div className="pt-3" />

              {legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Redes + contato */}
          <div className="text-center md:text-right">
            <h4 className="font-sans font-semibold text-sm uppercase tracking-wider mb-4 text-rosa-argila">Siga-nos</h4>

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
              className="inline-flex items-center justify-center md:justify-end gap-2 mt-4 text-white/80 hover:text-white transition-colors text-sm"
            >
              <Mail size={16} />
              contato@meuatelie.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mt-10 pt-7">
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
}
