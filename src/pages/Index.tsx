import { ArrowRight, MapPin } from "lucide-react";
import { WaitlistForm } from "@/components/WaitlistForm";
import { turmas } from "@/data/turmas";
import logo from "@/assets/despertamente-simbolo-branco.png";
import "@/fds.css";

// Página no design system do site institucional (www.idmpsi.com.br).
const Index = () => {
  const temTurmas = turmas.length > 0;

  return (
    <div className="fds">
      {/* ── TOPO ─────────────────────────────────────── */}
      <header className="fds-deep" style={{ borderBottom: "1px solid var(--line)" }}>
        <div className="fds-wrap" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, paddingBlock: 16 }}>
          <a href="https://www.idmpsi.com.br" style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--ink)", textDecoration: "none" }}>
            <img src={logo} alt="" style={{ height: 34, width: "auto" }} />
            <span style={{ fontFamily: "var(--serif)", fontWeight: 600 }}>
              Instituto <span className="fds-accent">Despertamente</span>
            </span>
          </a>
          <a href="https://www.idmpsi.com.br/programas/idm-pelo-brasil" className="fds-small" style={{ color: "var(--ink-2)", textDecoration: "none" }}>
            Sobre o IDM pelo Brasil
          </a>
        </div>
      </header>

      {/* ── ABERTURA ─────────────────────────────────── */}
      <section className="fds-deep" style={{ paddingBlock: "clamp(56px, 9vw, 112px)" }}>
        <div className="fds-wrap">
          <p className="fds-eyebrow">IDM pelo Brasil · Turmas presenciais</p>
          <h1 className="fds-display" style={{ marginTop: 18, maxWidth: 900 }}>
            {temTurmas ? (
              <>Escolha a sua cidade <span className="fds-accent">e a sua turma</span>.</>
            ) : (
              <>Novas turmas <span className="fds-accent">em breve</span>.</>
            )}
          </h1>
          <p className="fds-lead" style={{ marginTop: 22, maxWidth: 620 }}>
            {temTurmas
              ? "Um dia presencial com Rodrygo Murari, com o seu mapa numerológico pronto e certificado na mão no fim. Duas turmas por cidade: manhã ou tarde."
              : "No momento não há turmas presenciais abertas. Deixe seu contato abaixo e avisamos assim que uma nova turma for programada."}
          </p>
          {temTurmas && (
            <a href="#turmas" className="fds-btn fds-btn--primary" style={{ width: "auto", marginTop: 32 }}>
              Ver as datas <ArrowRight size={16} />
            </a>
          )}
        </div>
      </section>

      {/* ── TURMAS ───────────────────────────────────── */}
      {temTurmas && (
        <section id="turmas" className="fds-section">
          <div className="fds-wrap">
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "end", justifyContent: "space-between", gap: 12 }}>
              <h2 className="fds-h2">Próximas cidades</h2>
              <p className="fds-small">Vagas limitadas pelo tamanho da sala. Quando lota, lotou.</p>
            </div>

            <div className="fds-grid-turmas" style={{ marginTop: 40 }}>
              {turmas.map((t, i) => (
                <article key={t.id} className={`fds-card ${i === 0 ? "fds-card--destaque" : ""}`} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                    <div>
                      <p className="fds-eyebrow">
                        {i === 0 ? "Próxima" : "Em seguida"} · {t.programa.sigla} {t.numero}
                      </p>
                      <h3 className="fds-h3" style={{ marginTop: 8 }}>{t.cidade}</h3>
                      <p className="fds-small" style={{ marginTop: 4 }}>{t.programa.nome}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontFamily: "var(--serif)", fontWeight: 600, fontSize: 34, lineHeight: 1, color: "var(--accent)" }}>{t.data}</p>
                      <p className="fds-small" style={{ marginTop: 4 }}>{t.diaSemana}</p>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20 }}>
                    <p className="fds-body" style={{ display: "flex", gap: 8, alignItems: "flex-start", color: "#d4d5d9" }}>
                      <MapPin size={16} style={{ marginTop: 4, flexShrink: 0, color: "var(--ink-3)" }} /> {t.endereco}
                    </p>
                    <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {t.turnos.map((turno) => (
                        <span key={turno.label} className="fds-tag" style={turno.esgotada ? { textDecoration: "line-through", color: "var(--ink-4)" } : undefined}>
                          {turno.label} · {turno.horario}{turno.esgotada ? " · esgotada" : ""}
                        </span>
                      ))}
                    </div>
                    <p className="fds-small" style={{ marginTop: 16 }}>
                      Com Rodrygo Murari · ingresso <span style={{ color: "var(--ink)", fontWeight: 600 }}>{t.preco}</span>
                    </p>
                  </div>

                  <a href={t.linkInscricao} className={`fds-btn ${i === 0 ? "fds-btn--primary" : "fds-btn--ghost"}`} style={{ marginTop: "auto" }}>
                    {t.status === "esgotada" ? "Turma esgotada" : "Garantir meu lugar"} <ArrowRight size={16} />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── LISTA DE ESPERA ──────────────────────────── */}
      <section className="fds-section fds-band">
        <div className="fds-narrow">
          <WaitlistForm />
        </div>
      </section>

      {/* ── RODAPÉ ───────────────────────────────────── */}
      <footer style={{ paddingBlock: 40 }}>
        <div className="fds-wrap" style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
          <p className="fds-small">Instituto Despertamente · Rodrygo Murari</p>
          <div className="fds-small" style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <a href="https://www.instagram.com/institutodespertamente/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-2)" }}>Instagram</a>
            <a href="https://www.youtube.com/@institutodespertamente" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-2)" }}>YouTube</a>
            <a href="https://www.facebook.com/institutodespertamente" target="_blank" rel="noopener noreferrer" style={{ color: "var(--ink-2)" }}>Facebook</a>
            <a href="https://www.idmpsi.com.br" style={{ color: "var(--ink-2)" }}>idmpsi.com.br</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
