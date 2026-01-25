import { Brain, Hand, Heart, Sparkles, Target, TrendingUp } from "lucide-react";
import { Button } from "@/components/shared/Button";

import metodoTituloRef from "@/assets/metodo-titulo-ref.png";
import mapaIlustradoDobra from "@/assets/mapa-ilustrado-dobra.png";
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
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.hash = "#oferta";
  };

  const beneficios = [
    { title: "Atenção plena", desc: "(sua mente para)", icon: Brain },
    { title: "Descarga emocional", desc: "(algo só seu)", icon: Heart },
    { title: "Corpo-mente", desc: "(sai das telas e cria na prática)", icon: Hand },
  ];

  return <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-transparent mb-12 md:mb-14 animate-fade-in">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-14">
        {/* Headline */}
        <header className="text-center mb-10">
          <p className="text-foreground/80 text-sm md:text-base font-semibold tracking-wide">
            Por Isso Criamos o
          </p>
          <h3 className="font-serif text-2xl md:text-4xl text-foreground mt-2 leading-tight">
            <span className="text-foreground">Primeira Vitória em Amigurumi©</span>
          </h3>

          <div className="mt-6 flex justify-center">
            <img
              src={metodoTituloRef}
              alt="Título: Primeira Vitória em Amigurumi"
              loading="lazy"
              className="w-full max-w-3xl rounded-xl border border-border bg-background shadow-suave"
            />
          </div>
        </header>

        {/* Subtexto + benefícios (ícones) */}
        <div className="max-w-3xl mx-auto">
          <p className="text-muted-foreground text-lg md:text-xl text-center leading-relaxed">
            Um Mapa Completo (com aulas, receitas, materiais e suporte) onde você é guiado, passo a passo, do zero absoluto ao seu primeiro amigurumi completo — em 7 dias — para:
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {beneficios.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl bg-background border border-border p-6 shadow-suave hover-lift animate-fade-in"
                  style={{ animationDelay: `${idx * 0.06}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-secondary/20 border border-border flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" aria-hidden={true} strokeWidth={1.8} />
                    </div>
                    <div>
                      <p className="text-foreground font-semibold leading-snug">{item.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 rounded-2xl bg-background border border-border shadow-elevada overflow-hidden">
            <img
              src={mapaIlustradoDobra}
              alt="Mapa ilustrado do Método Primeira Vitória em Amigurumi"
              loading="lazy"
              className="w-full h-auto object-contain"
            />
          </div>

          <div className="mt-8 flex justify-center">
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
            <p className="text-foreground text-lg md:text-xl font-semibold">
              Baseado em 4 pilares científicos que garantem que você termina:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pilares.map((pilar, index) => {
            const Icon = pilar.icon;
            return <article key={pilar.numero} className="rounded-2xl bg-background/60 border border-border p-6 md:p-7 hover-lift animate-fade-in" style={{
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
                      <h4 className="font-serif text-xl text-foreground leading-snug">
                        {pilar.titulo}
                      </h4>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-body leading-relaxed">
                    {pilar.texto}
                  </p>
                </article>;
          })}
          </div>
        </section>
      </div>
    </div>;
};
export { MetodoPrimeiraVitoria };