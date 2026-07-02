# IDM Pelo Brasil — Turmas

Hub com todas as turmas presenciais programadas do IDM Pelo Brasil (NPA), pensado para ser o link da bio do Instagram. Lista cidade, data, endereço e horários de cada turma e linka para a landing page de inscrição correspondente.

## Rodando localmente

```sh
npm install
npm run dev
```

Servidor em `http://localhost:8090`.

## Adicionando uma nova turma

Edite `src/data/turmas.ts` e adicione um novo item ao array `turmas`. Nenhuma outra alteração é necessária — a página lê a lista dinamicamente.

Cada landing page de inscrição individual (`idmpelobrasil-XX-cidade`) continua sendo um projeto separado; este hub apenas referencia a URL pública de cada uma via `linkInscricao`.

Stack: Vite + React + TypeScript + Tailwind + shadcn/ui.
