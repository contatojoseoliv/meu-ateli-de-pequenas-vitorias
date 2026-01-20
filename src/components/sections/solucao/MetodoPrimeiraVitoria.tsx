import { Check, Heart, Sparkles, Target, TrendingUp } from "lucide-react";

type Pilar = {
  numero: string;
  titulo: string;
  texto: string;
  // Lucide components can be tricky to type across tooling; keep it flexible.
  icon: any;
};

const pilares: Pilar[] = [
  {
    numero: "1",
    titulo: "Pequeno e alcançável",
    texto:
      "Não é projeto de meses. É 7 dias, 15 min/dia. Algo que você TERMINA.",
    icon: Target,
  },
  {
    numero: "2",
    titulo: "Guiado passo a passo",
    texto:
      "Nunca fica perdida. Vídeos em câmera lenta, ângulos múltiplos. Você sempre sabe o próximo passo.",
    icon: Sparkles,
  },
  {
    numero: "3",
    titulo: "Emocionalmente seguro",
    texto:
      "Erro é normal (todo mundo erra). Tem suporte integral. Sem autocrítica brutal.",
    icon: Heart,
  },
  {
    numero: "4",
    titulo: "Progressivo",
    texto:
      "Vitória 1, 2, 3... Cada dia é uma conquista. Confiança cresce. Identidade muda.",
    icon: TrendingUp,
  },
];

const MetodoPrimeiraVitoria = () => {
  return (
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-rosa-argila-10 border-y border-white/10 mb-20 animate-fade-in">
      <div className="max-w-5xl mx-auto px-6 md:px-8 py-12 md:py-14">
        {/* Headline */}
        <header className="text-center mb-10">
          <p className="text-white/85 text-sm md:text-base font-semibold tracking-wide">
            Por Isso Criamos o
          </p>
          <h3 className="font-serif text-2xl md:text-4xl text-white mt-2 leading-tight">
            <span className="text-white">Primeira Vitória em Amigurumi©</span>
          </h3>
        </header>

        {/* Subtexto + 3 benefícios */}
        <div className="max-w-3xl mx-auto">
          <p className="text-white/90 text-lg md:text-xl text-center leading-relaxed">
            Uma plataforma onde você constrói, passo a passo, do zero absoluto ao
            seu primeiro amigurumi completo — em 7 dias — para:
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Gerar Atenção Plena", desc: "(sua mente para)" },
              { title: "Criar descarga emocional", desc: "(algo só seu)" },
              {
                title: "Reconectar corpo-mente",
                desc: "(sai das telas e cria na prática)",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl bg-white/10 border border-white/15 px-5 py-4"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                    <Check
                      className="w-5 h-5 text-white"
                      aria-hidden={true}
                    />
                  </div>
                  <div className="text-white leading-snug">
                    <span className="font-semibold">{item.title}</span>{" "}
                    <span className="text-white/80">{item.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Divisor */}
        <div className="my-10 border-t border-white/10" />

        {/* Pilares */}
        <section aria-label="Pilares científicos" className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-white/90 text-lg md:text-xl font-semibold">
              Baseado em 4 pilares científicos que garantem que você termina:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pilares.map((pilar, index) => {
              const Icon = pilar.icon;
              return (
                <article
                  key={pilar.numero}
                  className="rounded-2xl bg-white/8 border border-white/10 p-6 md:p-7 hover-lift animate-fade-in"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                      <Icon
                        className="w-5 h-5 text-white"
                        aria-hidden={true}
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-white/75 mb-1">
                        PILAR {pilar.numero}
                      </p>
                      <h4 className="font-serif text-xl text-white leading-snug">
                        {pilar.titulo}
                      </h4>
                    </div>
                  </div>

                  <p className="text-white/85 text-body leading-relaxed">
                    {pilar.texto}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export { MetodoPrimeiraVitoria };
