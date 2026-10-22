export type Experiencia = {
  cargo: string
  empresa: string
  inicio: string
  fim: string
  descricao: string
}

export type Formacao = {
  curso: string
  instituicao: string
  inicio: string
  fim: string
}

export type Curriculo = {
  id: string
  nome: string
  cargo: string
  resumo: string
  email: string
  telefone: string
  cpf: string
  nascimento: string
  endereco: string
  cidade: string
  estado: string
  linkedin: string
  habilidades: string
  foto: string
  experiencias: Experiencia[]
  formacoes: Formacao[]
  criadoEm: string
}

export type CurriculoFormData = Omit<Curriculo, "id" | "criadoEm">

export const STORAGE_KEY = "curriculo-facil:curriculos"

export const curriculosIniciais: Curriculo[] = [
  {
    id: "mariana-costa",
    nome: "Mariana Costa",
    cargo: "Product Designer",
    resumo:
      "Designer de produto com foco em experiências digitais simples, acessíveis e orientadas a pessoas.",
    email: "mariana.costa@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    nascimento: "14/03/1995",
    endereco: "Rua das Flores, 120",
    cidade: "São Paulo",
    estado: "SP",
    linkedin: "linkedin.com/in/marianacosta",
    habilidades: "Figma, UX research, prototipação, design system",
    foto: "",
    experiencias: [
      {
        cargo: "Product Designer",
        empresa: "Estúdio Horizonte",
        inicio: "01/2022",
        fim: "Atual",
        descricao:
          "Criação de fluxos, protótipos e interfaces para produtos digitais.",
      },
    ],
    formacoes: [
      {
        curso: "Design Digital",
        instituicao: "Universidade de São Paulo",
        inicio: "01/2015",
        fim: "12/2018",
      },
    ],
    criadoEm: "2025-04-10",
  },
  {
    id: "lucas-ferreira",
    nome: "Lucas Ferreira",
    cargo: "Desenvolvedor Front-end",
    resumo:
      "Desenvolvedor front-end que transforma ideias em interfaces rápidas, responsivas e fáceis de usar.",
    email: "lucas.ferreira@email.com",
    telefone: "(21) 97654-3210",
    cpf: "987.654.321-00",
    nascimento: "22/08/1992",
    endereco: "Avenida Central, 45",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    linkedin: "linkedin.com/in/lucasferreira",
    habilidades: "React, TypeScript, acessibilidade, CSS",
    foto: "",
    experiencias: [
      {
        cargo: "Desenvolvedor Front-end",
        empresa: "Nuvem Tecnologia",
        inicio: "06/2021",
        fim: "Atual",
        descricao:
          "Desenvolvimento de aplicações web com React e TypeScript.",
      },
    ],
    formacoes: [
      {
        curso: "Sistemas de Informação",
        instituicao: "Universidade Federal do Rio de Janeiro",
        inicio: "01/2011",
        fim: "12/2015",
      },
    ],
    criadoEm: "2025-05-02",
  },
  {
    id: "ana-souza",
    nome: "Ana Souza",
    cargo: "Analista de Marketing",
    resumo:
      "Profissional de marketing apaixonada por conteúdo, estratégia de marca e resultados.",
    email: "ana.souza@email.com",
    telefone: "(31) 96543-2109",
    cpf: "456.789.123-00",
    nascimento: "05/11/1997",
    endereco: "Rua dos Ipês, 88",
    cidade: "Belo Horizonte",
    estado: "MG",
    linkedin: "linkedin.com/in/anasouza",
    habilidades: "SEO, conteúdo, mídias sociais, análise de dados",
    foto: "",
    experiencias: [
      {
        cargo: "Analista de Marketing",
        empresa: "Casa Amora",
        inicio: "03/2022",
        fim: "Atual",
        descricao:
          "Planejamento de campanhas e produção de conteúdo digital.",
      },
    ],
    formacoes: [
      {
        curso: "Publicidade e Propaganda",
        instituicao: "Pontifícia Universidade Católica de Minas Gerais",
        inicio: "01/2015",
        fim: "12/2019",
      },
    ],
    criadoEm: "2025-06-18",
  },
]

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null
}

export function isCurriculo(value: unknown): value is Curriculo {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.nome === "string" &&
    typeof value.cargo === "string" &&
    typeof value.resumo === "string" &&
    typeof value.email === "string" &&
    typeof value.telefone === "string" &&
    typeof value.cpf === "string" &&
    typeof value.nascimento === "string" &&
    typeof value.endereco === "string" &&
    typeof value.cidade === "string" &&
    typeof value.estado === "string" &&
    typeof value.linkedin === "string" &&
    typeof value.habilidades === "string" &&
    typeof value.foto === "string" &&
    Array.isArray(value.experiencias) &&
    Array.isArray(value.formacoes) &&
    typeof value.criadoEm === "string"
  )
}
