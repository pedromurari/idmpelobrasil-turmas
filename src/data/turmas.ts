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
// linkInscricao segue o padrao de dominio "[cidade].idmpelobrasil.com.br" (confirmar antes de publicar).
export const turmas: Turma[] = [
  {
    id: "rio-22",
    programa: PROGRAMAS.npa,
    cidade: "Rio de Janeiro",
    estado: "RJ",
    numero: "#22",
    data: "10 de Outubro",
    diaSemana: "Sabado",
    endereco: "Rua Correa Dutra, 149 - Flamengo, Rio de Janeiro - RJ",
    preco: "R$26",
    turnos: [
      { label: "Manha", horario: "09h as 13h", esgotada: false },
      { label: "Tarde", horario: "14h as 18h", esgotada: true },
    ],
    linkInscricao: "https://nparj.idmpelobrasil.com.br",
    status: "abertas",
  },
];
