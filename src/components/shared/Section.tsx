import * as React from "react";
import { cn } from "@/lib/utils";
interface SectionProps {
  children: React.ReactNode;
  id?: string;
  background?: 'white' | 'cinza' | 'verde';
  className?: string;
  containerClassName?: string;
  style?: React.CSSProperties;
}

/**
 * Wrapper de seção seguindo o Manual da Marca
 * 
 * Backgrounds disponíveis:
 * - white: fundo branco
 * - cinza: fundo Cinza Nuvem (#F4F4F4)
 * - verde: fundo Verde Eucalipto com texto branco
 */
const Section = React.forwardRef<HTMLElement, SectionProps>(({
  children,
  id,
  background = "white",
  className,
  containerClassName,
  style
}, ref) => {
  const backgrounds: Record<NonNullable<SectionProps["background"]>, string> = {
    white: "bg-background text-foreground",
    cinza: "bg-cinza-nuvem text-foreground",
    verde: "bg-verde-eucalipto text-white"
  };
  return <section ref={ref} id={id} style={style} className={cn("w-full", backgrounds[background], className)}>
        <div className={cn("container-main my-0 py-[30px]", containerClassName)}>{children}</div>
      </section>;
});
Section.displayName = "Section";
export { Section };
export type { SectionProps };