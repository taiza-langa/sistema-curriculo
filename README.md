# currículo.fácil

Aplicação web acadêmica para cadastrar, organizar e consultar currículos. O projeto usa Next.js App Router, Tailwind CSS e componentes shadcn/ui, com dados de demonstração persistidos no `localStorage`.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação e execução

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run lint` | Executa o ESLint |
| `npx tsc --noEmit` | Verifica os tipos TypeScript |
| `npm run build` | Gera a build de produção |
| `npm run start` | Inicia a build de produção |

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Landing page e apresentação dos benefícios |
| `/curriculos/visualizar` | Lista, busca e filtra currículos |
| `/curriculos/visualizar/[id]` | Detalhes e opção para excluir um currículo |
| `/curriculos/cadastrar` | Formulário de cadastro |

As rotas antigas `/sistema/paginas/curriculos`, `/sistema/paginas/curriculos/novo` e `/sistema/paginas/curriculos/[id]` redirecionam para os caminhos amigáveis.

## Funcionalidades

- Cadastro com React Hook Form e validação Yup.
- Máscaras de CPF, telefone e datas com React IMask.
- Inclusão e remoção de várias experiências e formações com `useFieldArray`.
- Busca em tempo real por nome ou cargo.
- Upload demonstrativo de imagem: prévia e conteúdo ficam salvos como dados locais no navegador; limite de 300 KB por imagem.
- Alertas de sucesso e validação com Sonner, confirmação de exclusão com SweetAlert2.
- Estado vazio, skeletons de carregamento e interface responsiva.
- Currículos de demonstração são carregados na primeira visita. Os registros ficam no `localStorage` do navegador com a chave `curriculo-facil:curriculos`.

> Este projeto é uma etapa de interface com persistência local. Os dados e imagens não são enviados para um servidor e não são compartilhados entre navegadores ou dispositivos. Para reiniciar os dados de demonstração, remova a chave `curriculo-facil:curriculos` do armazenamento local do navegador.

## Tecnologias

- Next.js App Router e React
- Tailwind CSS e shadcn/ui
- React Hook Form, Yup e React IMask
- Sonner, SweetAlert2, Lucide React e React Icons
- Next Image

## Deploy

O projeto pode ser importado na [Vercel](https://vercel.com/new) conectado ao repositório GitHub. A configuração padrão detecta Next.js; use `npm run build` para validar a compilação antes do deploy.
