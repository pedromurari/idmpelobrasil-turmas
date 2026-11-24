import { useState, FormEvent } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Tabela dedicada no mesmo projeto Supabase das landing pages de turma
// (RLS: insert publico liberado, select restrito a authenticated).
const WAITLIST_TABLE = "lista_espera_cidades";

const formatWhatsapp = (raw: string) => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.replace(/(\d*)/, "($1");
  if (digits.length <= 7) return digits.replace(/(\d{2})(\d*)/, "($1) $2");
  return digits.replace(/(\d{2})(\d{5})(\d*)/, "($1) $2-$3");
};

export const WaitlistForm = () => {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [cidade, setCidade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const whatsappDigits = whatsapp.replace(/\D/g, "");
    if (!nome.trim() || whatsappDigits.length < 10 || !cidade.trim()) return;

    setIsLoading(true);

    if (SUPABASE_URL && SUPABASE_ANON_KEY) {
      try {
        await fetch(`${SUPABASE_URL}/rest/v1/${WAITLIST_TABLE}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({
            nome: nome.trim(),
            whatsapp: `55${whatsappDigits}`,
            email: email.trim() || null,
            cidade: cidade.trim(),
            origem: "hub-turmas",
          }),
        });
      } catch (err) {
        console.error("Erro ao enviar cadastro de espera:", err);
      }
    }

    setIsLoading(false);
    setEnviado(true);
  };

  if (enviado) {
    return (
      <div style={{ textAlign: "center" }}>
        <CheckCircle2 size={32} style={{ color: "var(--accent)", margin: "0 auto" }} />
        <h2 className="fds-h2" style={{ marginTop: 16 }}>Cadastro recebido.</h2>
        <p className="fds-body" style={{ marginTop: 12 }}>
          Assim que o IDM pelo Brasil chegar em {cidade}, a gente te avisa pelo WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="fds-eyebrow">Lista de espera</p>
      <h2 className="fds-h2" style={{ marginTop: 14 }}>
        Sua cidade ainda <span className="fds-accent">não tem turma</span>?
      </h2>
      <p className="fds-body" style={{ marginTop: 14 }}>
        Deixe seu contato e avisamos assim que o IDM pelo Brasil chegar aí.
      </p>

      <div style={{ marginTop: 32, display: "grid", gap: 18 }}>
        <div>
          <label htmlFor="nome" className="fds-label">Nome</label>
          <input id="nome" className="fds-input" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome" maxLength={80} required />
        </div>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
          <div>
            <label htmlFor="whatsapp" className="fds-label">WhatsApp</label>
            <input id="whatsapp" className="fds-input" value={whatsapp} onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))} placeholder="(11) 90000-0000" inputMode="tel" maxLength={15} required />
          </div>
          <div>
            <label htmlFor="cidade" className="fds-label">Cidade</label>
            <input id="cidade" className="fds-input" value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Sua cidade" maxLength={60} required />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="fds-label">E-mail</label>
          <input id="email" type="email" className="fds-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" maxLength={120} required />
        </div>
        <button type="submit" disabled={isLoading} className="fds-btn fds-btn--primary" style={{ marginTop: 6 }}>
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : "Quero ser avisado"}
        </button>
      </div>
    </form>
  );
};
