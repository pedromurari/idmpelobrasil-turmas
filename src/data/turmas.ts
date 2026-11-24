export type TurmaTurno = {
  label: string;
  horario: string;
  esgotada: boolean;
};

export type Programa = {
  sigla: string;
  nome: string;
  formato: string;
};

// Programas que rodam sob o guarda-chuva do IDM Pelo Brasil.
// Hoje so ha turmas de NPA cadastradas, mas o hub ja suporta PNL/PSI quando existirem.
export const PROGRAMAS: Record<string, Programa> = {
  npa: {
    sigla: "NPA",
    nome: "Numerologia Pitagórica",
    formato: "Presencial - 4h",
  },
  pnl: {
    sigla: "PNL",
    nome: "Programação Neurolinguística",
    formato: "Presencial - 4h",
  },
  psi: {
    sigla: "PSI",
    nome: "Psicanálise Integrativa",
    formato: "Presencial - 8h",
  },
};

export type Turma = {
  id: string;
  programa: Programa;
  cidade: string;
  estado: string;
  numero: string;
  data: string;
  diaSemana: string;
  endereco: string;
  preco: string;
  turnos: TurmaTurno[];
  linkInscricao: string;
  status: "abertas" | "esgotada" | "em-breve";
};

// Atualize esta lista sempre que uma nova turma do IDM Pelo Brasil for programada.
// linkInscricao aponta pra página da turma no CRM (www.idmpelobrasil.com.br/npa/<slug>),
// a mesma que o site institucional usa. Dados batem com npa_eventos.
export const turmas: Turma[] = [
  {
    id: "npa-24-sao-paulo",
    programa: PROGRAMAS.npa,
    cidade: "São Paulo",
    estado: "SP",
    numero: "#24",
    data: "05/12",
    diaSemana: "sábado",
    endereco: "Rua Oscar Freire, 2617 cj 408 - Pinheiros, São Paulo - SP",
    preco: "R$ 29",
    turnos: [
      { label: "Manhã", horario: "09h às 13h", esgotada: false },
      { label: "Tarde", horario: "14h às 18h", esgotada: false },
    ],
    linkInscricao: "https://www.idmpelobrasil.com.br/npa/sao-paulo",
    status: "abertas",
  },
  {
    id: "npa-25-santos",
    programa: PROGRAMAS.npa,
    cidade: "Santos",
    estado: "SP",
    numero: "#25",
    data: "12/12",
    diaSemana: "sábado",
    endereco: "Av. Anna Costa, 61 - Gonzaga, Santos - SP",
    preco: "R$ 29",
    turnos: [
      { label: "Manhã", horario: "09h às 13h", esgotada: false },
      { label: "Tarde", horario: "14h às 18h", esgotada: false },
    ],
    linkInscricao: "https://www.idmpelobrasil.com.br/npa/santos",
    status: "abertas",
  },
];
