import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'default' | 'lg' | 'sm';
  asChild?: boolean;
}

/**
 * Botão customizado seguindo o Manual da Marca
 * 
 * Primary: CTAs principais - gradiente Ocre→Rosa (EXCLUSIVO para conversão)
 * Secondary: Borda Verde Eucalipto
 * Ghost: Borda fina, ações secundárias
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'default', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center
      font-sans font-bold
      transition-all duration-300 ease-out
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
      disabled:pointer-events-none disabled:opacity-50
      cursor-pointer
    `;

    const variants = {
      primary: `
        bg-gradient-to-br from-ocre-dourado to-rosa-argila
        text-white
        uppercase tracking-wide
        rounded-full
        shadow-cta
        hover:shadow-cta-hover hover:-translate-y-0.5
        active:scale-[0.98]
      `,
      secondary: `
        bg-transparent
        text-verde-eucalipto
        border-2 border-verde-eucalipto
        rounded-full
        hover:bg-verde-eucalipto hover:text-white
      `,
      ghost: `
        bg-transparent
        text-verde-eucalipto
        border border-verde-eucalipto
        rounded-lg
        hover:bg-verde-eucalipto-10
      `,
    };

    const sizes = {
      default: 'px-8 py-4 text-base',
      lg: 'px-12 py-5 text-lg',
      sm: 'px-6 py-3 text-sm',
    };

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
