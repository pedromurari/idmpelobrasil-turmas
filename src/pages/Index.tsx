import { MapPin, Calendar, Clock, CheckCircle2, Instagram, Youtube, Facebook } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { WaitlistForm } from "@/components/WaitlistForm";
import { turmas } from "@/data/turmas";
import logo from "@/assets/despertamente-simbolo-branco.png";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="geometric-numbers" aria-hidden="true">
        <div className="number-float">1</div>
        <div className="number-float">2</div>
        <div className="number-float">3</div>
        <div className="number-float">4</div>
        <div className="number-float">5</div>
        <div className="number-float">6</div>
        <div className="number-float">7</div>
        <div className="number-float">8</div>
        <div className="number-float">9</div>
      </div>

      <section className="relative z-10 px-[15px] py-10 md:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <img alt="Instituto DespertaMente" className="hub-logo" src={logo} />

          <h1 className="hero-headline">
            <span className="headline-line">IDM Pelo Brasil</span>
            <span className="headline-line highlight">
              Turmas Disponiveis
            </span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mt-2">
            Experiencias presenciais de autoconhecimento pelo Brasil —
            Numerologia, PNL e Psicanalise. Escolha a cidade e a data mais
            proxima de voce.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-[15px] pb-10">
        <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
          {turmas.map((turma) => (
            <a
              key={turma.id}
              href={turma.linkInscricao}
              target="_blank"
              rel="noopener noreferrer"
              className="section-container hover-lift block text-left no-underline"
            >
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground bg-card/80 border border-border rounded-full px-2.5 py-1">
                    {turma.programa.sigla} {turma.numero} &middot;{" "}
                    {turma.programa.nome} &middot; {turma.programa.formato}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mt-2">
                    {turma.cidade} - {turma.estado}
                  </h2>
                </div>
                <Badge
                  className={
                    turma.status === "abertas"
                      ? "bg-primary text-primary-foreground shrink-0"
                      : "bg-muted text-muted-foreground shrink-0"
                  }
                >
                  {turma.status === "abertas" ? "Vagas abertas" : "Esgotada"}
                </Badge>
              </div>

              <div className="space-y-2 text-muted-foreground mb-4">
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary shrink-0" />
                  {turma.data} ({turma.diaSemana})
                </p>
                <p className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {turma.endereco}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {turma.turnos.map((turno) => (
                  <span
                    key={turno.label}
                    className="flex items-center gap-1 text-sm bg-card/80 border border-border rounded-full px-3 py-1"
                  >
                    <Clock className="h-3.5 w-3.5 text-primary" />
                    {turno.label}: {turno.horario}
                    {turno.esgotada && (
                      <span className="text-destructive font-semibold ml-1">
                        (esgotada)
                      </span>
                    )}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <p className="price-shine text-xl font-bold">
                  A partir de {turma.preco}
                </p>
                <span className="text-primary font-semibold text-sm">
                  Garantir minha vaga &rarr;
                </span>
              </div>
            </a>
          ))}

          <div className="section-container flex flex-col items-center justify-center text-center gap-2 border-dashed">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <p className="font-semibold text-foreground">
              Novas cidades em breve
            </p>
            <p className="text-muted-foreground text-sm">
              Siga o Instituto DespertaMente no Instagram para ser avisado
              assim que uma turma abrir na sua regiao.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-[15px] pb-16">
        <div className="max-w-4xl mx-auto">
          <WaitlistForm />
        </div>
      </section>

      <footer className="relative z-10 px-[15px] pb-10 text-center">
        <div className="max-w-4xl mx-auto border-t border-border pt-6">
          <p className="text-muted-foreground text-sm mb-4">
            Instituto DespertaMente - Rodrygo Murari
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a
              href="https://www.instagram.com/institutodespertamente/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
            >
              <Instagram className="h-4 w-4" />
              @institutodespertamente
            </a>
            <a
              href="https://www.youtube.com/@institutodespertamente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
            >
              <Youtube className="h-4 w-4" />
              YouTube &middot; +7 mil inscritos
            </a>
            <a
              href="https://www.facebook.com/institutodespertamente"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-semibold text-sm"
            >
              <Facebook className="h-4 w-4" />
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
