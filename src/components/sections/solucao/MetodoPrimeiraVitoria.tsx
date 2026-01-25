import { Heart, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/shared/Button";
type Pilar = {
  numero: string;
  titulo: string;
  texto: string;
  // Lucide components can be tricky to type across tooling; keep it flexible.
  icon: any;
};
const pilares: Pilar[] = [{
  numero: "1",
  titulo: "Pequeno e alcançável",
  texto: "Não é projeto de meses. É 7 dias, 15 min/dia. Algo que você TERMINA.",
  icon: Target
}, {
  numero: "2",
  titulo: "Guiado passo a passo",
  texto: "Nunca fica perdida. Vídeos em câmera lenta, ângulos múltiplos. Você sempre sabe o próximo passo.",
  icon: Sparkles
}, {
  numero: "3",
  titulo: "Emocionalmente seguro",
  texto: "Erro é normal (todo mundo erra). Tem suporte integral. Sem autocrítica brutal.",
  icon: Heart
}, {
  numero: "4",
  titulo: "Progressivo",
  texto: "Vitória 1, 2, 3... Cada dia é uma conquista. Confiança cresce. Identidade muda.",
  icon: TrendingUp
}];
const MetodoPrimeiraVitoria = () => {
  const handleIrParaOferta = () => {
    const el = document.getElementById("oferta");
    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
      return;
    }
    window.location.hash = "#oferta";
  };

  return <div className="animate-fade-in">
      {/* Headline (mesma linguagem da seção: Por Que Você Está Ansiosa...) */}
      <div className="text-center max-w-2xl mx-auto mb-8 md:mb-10">
        <p className="text-grafite-suave/80 text-sm md:text-base font-semibold tracking-wide">
          Por Isso Criamos o
        </p>

        <h2 className="font-serif md:text-h2 text-grafite-suave mb-0 mt-2 text-2xl">
          Primeira Vitória em Amigurumi©
        </h2>
      </div>

      {/* Subtexto + área de imagem */}
      <div className="max-w-3xl mx-auto">
        <p className="text-grafite-suave/80 text-base md:text-lg text-center leading-relaxed">
          Um Mapa Completo (com aulas, receitas, materiais e suporte) onde você é guiado,
          passo a passo, do zero absoluto ao seu primeiro amigurumi completo — em 7 dias.
        </p>

        {/* Placeholder de imagem (compacto) */}
        <div className="mt-6 mx-auto max-w-3xl rounded-2xl border border-border bg-background shadow-suave overflow-hidden">
          <div className="aspect-[16/9] grid place-items-center px-6 text-center">
            <div>
              <p className="text-sm md:text-base text-muted-foreground">
                Área para imagem (ex.: print do mapa / aula / amigurumi pronto)
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                (você pode trocar depois)
              </p>
            </div>
          </div>
        </div>

        {/* CTA abaixo da imagem */}
        <div className="mt-5 flex justify-center">
          <Button variant="primary" size="lg" onClick={handleIrParaOferta} aria-label="Ir para a Oferta">
            Quero começar agora
          </Button>
        </div>
      </div>

      {/* Divisor */}
      <div className="my-10 border-t border-border" />

      {/* Pilares */}
      <section aria-label="Pilares científicos" className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-grafite-suave text-base md:text-lg font-semibold">
            Baseado em 4 pilares científicos que garantem que você termina:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pilares.map((pilar, index) => {
          const Icon = pilar.icon;
          return <article key={pilar.numero} className="rounded-2xl bg-background border border-border p-6 md:p-7 shadow-suave hover-lift animate-fade-in" style={{
            animationDelay: `${index * 0.08}s`
          }}>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-secondary/20 border border-border flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" aria-hidden={true} strokeWidth={1.8} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground mb-1">
                      PILAR {pilar.numero}
                    </p>
                    <h4 className="font-serif text-xl text-grafite-suave leading-snug">
                      {pilar.titulo}
                    </h4>
                  </div>
                </div>

                <p className="text-grafite-suave/80 text-body leading-relaxed">{pilar.texto}</p>
              </article>;
        })}
        </div>
      </section>

      {/* Fechamento emocional (mais compacto e alinhado com a sessão) */}
      <section aria-label="Fechamento emocional" className="max-w-3xl mx-auto text-center mt-12 md:mt-14 animate-fade-in">
        <p className="text-base text-grafite-suave leading-relaxed md:text-base font-normal">
          Quando você segura seu primeiro amigurumi feito por você, do começo ao fim, algo muda.
          <br />
          Não é só habilidade — é sensação.
        </p>

        <div className="mt-6 rounded-2xl border border-border bg-background px-6 py-4 shadow-suave">
          <p className="font-serif text-lg md:text-xl text-grafite-suave leading-snug">
            Você começou. Você fez. <span className="text-rosa-argila">Você terminou.</span>
          </p>
        </div>

        <p className="mt-6 text-base text-grafite-suave leading-relaxed md:text-base font-normal">
          E, pela primeira vez em muito tempo, sente calma, orgulho e alívio.
        </p>

        {/* CTA final da sessão */}
        <div className="mt-6 flex justify-center">
          <Button variant="primary" size="lg" onClick={handleIrParaOferta} aria-label="Ir para a Oferta">
            Quero começar agora
          </Button>
        </div>
      </section>
    </div>;
};
export { MetodoPrimeiraVitoria };