import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
      <div className="section-container flex flex-col items-center text-center gap-2 py-8">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <p className="font-semibold text-foreground">Cadastro recebido!</p>
        <p className="text-muted-foreground text-sm">
          Assim que o IDM Pelo Brasil chegar em {cidade}, avisamos voce por
          WhatsApp.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="section-container">
      <h2 className="text-xl md:text-2xl font-bold text-center text-foreground mb-1">
        Sua cidade ainda nao tem turma?
      </h2>
      <p className="text-center text-muted-foreground text-sm mb-6">
        Deixe seu contato e avisamos assim que o IDM Pelo Brasil chegar ai.
      </p>

      <div className="grid gap-4 max-w-md mx-auto">
        <div className="grid gap-1.5">
          <Label htmlFor="nome">Nome</Label>
          <Input
            id="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            maxLength={80}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="whatsapp">WhatsApp</Label>
          <Input
            id="whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            maxLength={15}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            maxLength={120}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="cidade">Cidade</Label>
          <Input
            id="cidade"
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            placeholder="Sua cidade"
            maxLength={60}
            required
          />
        </div>

        <Button type="submit" disabled={isLoading} className="mt-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Quero ser avisado"
          )}
        </Button>
      </div>
    </form>
  );
};
