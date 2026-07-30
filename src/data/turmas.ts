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
    nome: "Numerologia Pitagorica",
    formato: "Presencial - 4h",
  },
  pnl: {
    sigla: "PNL",
    nome: "Programacao Neurolinguistica",
    formato: "Presencial - 4h",
  },
  psi: {
    sigla: "PSI",
    nome: "Psicanalise Integrativa",
    formato: "Presencial - 4h",
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
// linkInscricao segue o padrao de dominio "[cidade].idmpelobrasil.com.br" (confirmar antes de publicar).
export const turmas: Turma[] = [
  {
    id: "campinas-17",
    programa: PROGRAMAS.npa,
    cidade: "Campinas",
    estado: "SP",
    numero: "#17",
    data: "01 de Agosto",
    diaSemana: "Sabado",
    endereco: "Coworking 949 - Rua General Osorio, 2239, Campinas - SP",
    preco: "R$20",
    turnos: [
      { label: "Manha", horario: "09h as 13h", esgotada: false },
      { label: "Tarde", horario: "14h as 18h", esgotada: false },
    ],
    linkInscricao: "https://campinas.idmpelobrasil.com.br",
    status: "abertas",
  },
  {
    id: "campinas-psi-01",
    programa: PROGRAMAS.psi,
    cidade: "Campinas",
    estado: "SP",
    numero: "#1",
    data: "05 de Setembro",
    diaSemana: "Sabado",
    endereco: "Coworking 949 - Rua General Osorio, 2239, Campinas - SP",
    preco: "R$37,90",
    turnos: [
      { label: "Imersao", horario: "09h as 17h", esgotada: false },
    ],
    // TODO: dominio ainda nao configurado - ajustar quando o deploy existir.
    linkInscricao: "https://psicampinas.idmpelobrasil.com.br",
    status: "em-breve",
  },
];
