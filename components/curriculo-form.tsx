"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { yupResolver } from "@hookform/resolvers/yup"
import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  ImagePlus,
  Plus,
  Trash2,
  UserRound,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import {
  Controller,
  useFieldArray,
  useForm,
  useWatch,
  type FieldErrors,
} from "react-hook-form"
import { IMaskInput } from "react-imask"
import { toast } from "sonner"
import * as yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useCurriculos } from "@/hooks/use-curriculos"
import type { CurriculoFormData } from "@/lib/curriculos"

const experienciaSchema = yup.object({
  cargo: yup
    .string()
    .trim()
    .min(2, "O cargo da experiência deve ter pelo menos 2 caracteres.")
    .required("Informe o cargo da experiência."),
  empresa: yup
    .string()
    .trim()
    .min(2, "O nome da empresa deve ter pelo menos 2 caracteres.")
    .required("Informe a empresa."),
  inicio: yup
    .string()
    .matches(/^\d{2}\/\d{4}$/, "Use o formato MM/AAAA para o início.")
    .test("mes-inicio", "Informe um mês válido entre 01 e 12.", (value) => {
      if (!value || !/^\d{2}\/\d{4}$/.test(value)) return true
      const mes = Number(value.slice(0, 2))
      return mes >= 1 && mes <= 12
    })
    .required("Informe o mês e ano de início."),
  fim: yup
    .string()
    .trim()
    .required("Informe o mês e ano de término ou escreva Atual.")
    .test(
      "periodo-fim",
      "Use o formato MM/AAAA ou escreva Atual.",
      (value) => !value || value.toLowerCase() === "atual" || /^\d{2}\/\d{4}$/.test(value),
    )
    .test("mes-fim", "Informe um mês válido entre 01 e 12.", (value) => {
      if (!value || value.toLowerCase() === "atual" || !/^\d{2}\/\d{4}$/.test(value)) return true
      const mes = Number(value.slice(0, 2))
      return mes >= 1 && mes <= 12
    }),
  descricao: yup
    .string()
    .trim()
    .min(10, "A descrição da experiência deve ter pelo menos 10 caracteres.")
    .required("Descreva as atividades realizadas."),
})

const formacaoSchema = yup.object({
  curso: yup
    .string()
    .trim()
    .min(2, "O curso deve ter pelo menos 2 caracteres.")
    .required("Informe o curso."),
  instituicao: yup
    .string()
    .trim()
    .min(2, "O nome da instituição deve ter pelo menos 2 caracteres.")
    .required("Informe a instituição."),
  inicio: yup
    .string()
    .matches(/^\d{2}\/\d{4}$/, "Use o formato MM/AAAA para o início.")
    .test("mes-inicio", "Informe um mês válido entre 01 e 12.", (value) => {
      if (!value || !/^\d{2}\/\d{4}$/.test(value)) return true
      const mes = Number(value.slice(0, 2))
      return mes >= 1 && mes <= 12
    })
    .required("Informe o mês e ano de início."),
  fim: yup
    .string()
    .matches(/^\d{2}\/\d{4}$/, "Use o formato MM/AAAA para o término.")
    .test("mes-fim", "Informe um mês válido entre 01 e 12.", (value) => {
      if (!value || !/^\d{2}\/\d{4}$/.test(value)) return true
      const mes = Number(value.slice(0, 2))
      return mes >= 1 && mes <= 12
    })
    .required("Informe o mês e ano de término."),
})

const schema: yup.ObjectSchema<CurriculoFormData> = yup.object({
  nome: yup
    .string()
    .trim()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .required("Informe o nome completo."),
  cargo: yup
    .string()
    .trim()
    .min(2, "O cargo deve ter pelo menos 2 caracteres.")
    .required("Informe o cargo desejado."),
  resumo: yup
    .string()
    .trim()
    .min(20, "O resumo deve ter pelo menos 20 caracteres.")
    .required("Escreva um resumo profissional."),
  email: yup
    .string()
    .trim()
    .email("Informe um e-mail válido.")
    .required("Informe o e-mail."),
  telefone: yup
    .string()
    .test(
      "telefone",
      "Informe um telefone com DDD e pelo menos 10 dígitos.",
      (value) => (value?.replace(/\D/g, "").length ?? 0) >= 10,
    )
    .required("Informe o telefone."),
  cpf: yup
    .string()
    .test(
      "cpf",
      "O CPF deve conter 11 dígitos.",
      (value) => (value?.replace(/\D/g, "").length ?? 0) === 11,
    )
    .required("Informe o CPF."),
  nascimento: yup
    .string()
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Informe a data no formato DD/MM/AAAA.")
    .test("data-real", "Informe uma data de nascimento válida.", (value) => {
      if (!value || !/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return true
      const [dia, mes, ano] = value.split("/").map(Number)
      const data = new Date(ano, mes - 1, dia)
      return (
        data.getFullYear() === ano &&
        data.getMonth() === mes - 1 &&
        data.getDate() === dia
      )
    })
    .required("Informe a data de nascimento."),
  endereco: yup
    .string()
    .trim()
    .min(5, "O endereço deve ter pelo menos 5 caracteres.")
    .required("Informe o endereço."),
  cidade: yup
    .string()
    .trim()
    .min(2, "A cidade deve ter pelo menos 2 caracteres.")
    .required("Informe a cidade."),
  estado: yup
    .string()
    .trim()
    .matches(/^[a-zA-Z]{2}$/, "Informe a sigla do estado com 2 letras.")
    .required("Informe o estado."),
  linkedin: yup.string().trim().defined(),
  habilidades: yup
    .string()
    .trim()
    .min(3, "Informe ao menos uma habilidade.")
    .required("Informe as habilidades."),
  foto: yup.string().defined(),
  experiencias: yup.array().of(experienciaSchema).defined(),
  formacoes: yup.array().of(formacaoSchema).defined(),
})

type FormValues = yup.InferType<typeof schema>
type CampoPrincipal = keyof Omit<CurriculoFormData, "experiencias" | "formacoes">

function encontrarMensagem(erro: unknown): string | undefined {
  if (typeof erro !== "object" || erro === null) return undefined
  if ("message" in erro && typeof erro.message === "string") return erro.message
  for (const valor of Object.values(erro)) {
    const mensagem = encontrarMensagem(valor)
    if (mensagem) return mensagem
  }
  return undefined
}

function Erro({ children }: { children?: string }) {
  return children ? (
    <p className="mt-1.5 text-xs font-medium text-red-700" role="alert">
      {children}
    </p>
  ) : null
}

function Campo({
  label,
  name,
  register,
  error,
  placeholder,
  type = "text",
}: {
  label: string
  name: CampoPrincipal
  register: ReturnType<typeof useForm<FormValues>>["register"]
  error?: string
  placeholder?: string
  type?: string
}) {
  return (
    <label className="block text-sm font-medium text-stone-700">
      {label}
      <Input
        type={type}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
        {...register(name)}
      />
      <Erro>{error}</Erro>
    </label>
  )
}

export function CurriculoForm() {
  const router = useRouter()
  const { adicionar } = useCurriculos()
  const [enviando, setEnviando] = useState(false)
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      cargo: "",
      resumo: "",
      email: "",
      telefone: "",
      cpf: "",
      nascimento: "",
      endereco: "",
      cidade: "",
      estado: "",
      linkedin: "",
      habilidades: "",
      foto: "",
      experiencias: [],
      formacoes: [],
    },
  })
  const experiencias = useFieldArray({ control: form.control, name: "experiencias" })
  const formacoes = useFieldArray({ control: form.control, name: "formacoes" })
  const foto = useWatch({ control: form.control, name: "foto" })
  const errors: FieldErrors<FormValues> = form.formState.errors
  const firstValidationMessage = encontrarMensagem(errors)
  const lastValidationMessage = useRef<string | undefined>(undefined)

  useEffect(() => {
    if (!firstValidationMessage) {
      lastValidationMessage.current = undefined
      return
    }
    if (firstValidationMessage === lastValidationMessage.current) return
    lastValidationMessage.current = firstValidationMessage
    toast.error("Revise o campo destacado.", {
      description: firstValidationMessage,
    })
  }, [firstValidationMessage])

  const salvar = form.handleSubmit(
    (values) => {
      setEnviando(true)
      try {
        const novo = adicionar(values)
        toast.success("Currículo cadastrado com sucesso!", {
          description: `${novo.nome} foi adicionado ao banco de talentos.`,
        })
        router.push(`/curriculos/visualizar/${novo.id}`)
      } catch (error) {
        toast.error("Não foi possível cadastrar o currículo.", {
          description:
            error instanceof Error ? error.message : "Tente novamente.",
        })
        setEnviando(false)
      }
    },
    (validationErrors) => {
      toast.error("Não foi possível salvar o currículo.", {
        description:
          encontrarMensagem(validationErrors) ??
          "Revise os campos destacados no formulário.",
      })
    },
  )

  const selecionarFoto = (file?: File) => {
    if (!file) return
    if (!file.type.startsWith("image/")) {
      toast.error("Escolha um arquivo de imagem.")
      return
    }
    if (file.size > 300 * 1024) {
      toast.error("A imagem deve ter no máximo 300 KB para ser salva no navegador.")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === "string") {
        form.setValue("foto", reader.result, {
          shouldValidate: true,
          shouldDirty: true,
        })
        toast.success("Imagem adicionada ao currículo.")
      } else {
        toast.error("Não foi possível carregar a imagem selecionada.")
      }
    }
    reader.onerror = () => toast.error("Não foi possível ler a imagem selecionada.")
    reader.readAsDataURL(file)
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/curriculos/visualizar"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-terracotta-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
      >
        <ArrowLeft size={16} /> Voltar aos currículos
      </Link>
      <div className="mt-5">
        <p className="text-sm font-semibold text-terracotta-800">Novo perfil</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-950">
          Cadastrar currículo
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Preencha as informações abaixo. Os campos marcados são obrigatórios.
        </p>
      </div>

      <form onSubmit={salvar} noValidate className="mt-8 space-y-5">
        <Card className="rounded-lg border-stone-200 shadow-none">
          <CardContent className="p-5 sm:p-7">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex size-8 items-center justify-center text-terracotta-800">
                <UserRound size={20} />
              </span>
              <div>
                <h2 className="font-semibold text-stone-900">
                  Informações pessoais
                </h2>
                <p className="text-xs text-stone-500">
                  Dados de contato e apresentação.
                </p>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap items-center gap-4">
              {foto ? (
                <Image
                  src={foto}
                  alt="Prévia da foto do currículo"
                  width={64}
                  height={64}
                  unoptimized
                  className="size-16 rounded-full object-cover"
                />
              ) : (
                <span className="flex size-16 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                  <ImagePlus size={22} />
                </span>
              )}
              <div>
                <label
                  htmlFor="foto"
                  className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 text-sm font-medium text-stone-700 hover:bg-stone-50 focus-within:ring-2 focus-within:ring-terracotta-700"
                >
                  <ImagePlus size={16} /> Enviar foto
                </label>
                <input
                  id="foto"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => selecionarFoto(event.target.files?.[0])}
                />
                <p className="mt-1 text-xs text-stone-500">
                  Upload demonstrativo · imagem até 300 KB
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Campo
                label="Nome completo *"
                name="nome"
                register={form.register}
                error={errors.nome?.message}
                placeholder="Ex.: Maria da Silva"
              />
              <Campo
                label="Cargo desejado *"
                name="cargo"
                register={form.register}
                error={errors.cargo?.message}
                placeholder="Ex.: Analista de dados"
              />
              <Campo
                label="E-mail *"
                name="email"
                register={form.register}
                error={errors.email?.message}
                placeholder="nome@email.com"
                type="email"
              />
              <label className="block text-sm font-medium text-stone-700">
                Telefone *
                <Controller
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <IMaskInput
                      mask="(00) 00000-0000"
                      value={field.value}
                      onAccept={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      aria-invalid={Boolean(errors.telefone)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-terracotta-700"
                    />
                  )}
                />
                <Erro>{errors.telefone?.message}</Erro>
              </label>
              <label className="block text-sm font-medium text-stone-700">
                CPF *
                <Controller
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <IMaskInput
                      mask="000.000.000-00"
                      value={field.value}
                      onAccept={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      aria-invalid={Boolean(errors.cpf)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-terracotta-700"
                    />
                  )}
                />
                <Erro>{errors.cpf?.message}</Erro>
              </label>
              <label className="block text-sm font-medium text-stone-700">
                Data de nascimento *
                <Controller
                  control={form.control}
                  name="nascimento"
                  render={({ field }) => (
                    <IMaskInput
                      mask="00/00/0000"
                      value={field.value}
                      onAccept={(value) => field.onChange(value)}
                      onBlur={field.onBlur}
                      inputRef={field.ref}
                      aria-invalid={Boolean(errors.nascimento)}
                      className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-terracotta-700"
                    />
                  )}
                />
                <Erro>{errors.nascimento?.message}</Erro>
              </label>
              <Campo
                label="Endereço *"
                name="endereco"
                register={form.register}
                error={errors.endereco?.message}
                placeholder="Rua, número e complemento"
              />
              <Campo
                label="Cidade *"
                name="cidade"
                register={form.register}
                error={errors.cidade?.message}
                placeholder="Sua cidade"
              />
              <Campo
                label="Estado (UF) *"
                name="estado"
                register={form.register}
                error={errors.estado?.message}
                placeholder="SP"
              />
              <Campo
                label="LinkedIn"
                name="linkedin"
                register={form.register}
                error={errors.linkedin?.message}
                placeholder="linkedin.com/in/seu-perfil"
              />
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-stone-700">
                  Resumo profissional *{" "}
                  <span className="font-normal text-stone-500">
                    (mínimo 20 caracteres)
                  </span>
                  <Textarea
                    placeholder="Conte um pouco sobre a experiência e os objetivos profissionais..."
                    aria-invalid={Boolean(errors.resumo)}
                    className="mt-1.5 min-h-28 rounded-lg border-stone-200 bg-white"
                    {...form.register("resumo")}
                  />
                  <Erro>{errors.resumo?.message}</Erro>
                </label>
              </div>
              <div className="sm:col-span-2">
                <Campo
                  label="Habilidades *"
                  name="habilidades"
                  register={form.register}
                  error={errors.habilidades?.message}
                  placeholder="Ex.: comunicação, Excel, liderança"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-stone-200 shadow-none">
          <CardContent className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center text-terracotta-800">
                  <BriefcaseBusiness size={20} />
                </span>
                <div>
                  <h2 className="font-semibold text-stone-900">
                    Experiência profissional
                  </h2>
                  <p className="text-xs text-stone-500">
                    Adicione uma ou mais experiências.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() =>
                  experiencias.append({
                    cargo: "",
                    empresa: "",
                    inicio: "",
                    fim: "",
                    descricao: "",
                  })
                }
              >
                <Plus size={16} /> Adicionar
              </Button>
            </div>
            {!experiencias.fields.length && (
              <p className="mt-5 rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-500">
                Nenhuma experiência adicionada. Este campo é opcional.
              </p>
            )}
            <div className="mt-4 space-y-3">
              {experiencias.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="border-t border-stone-200 py-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-stone-800">
                      Experiência {index + 1}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remover experiência ${index + 1}`}
                      onClick={() => experiencias.remove(index)}
                      className="flex size-9 items-center justify-center rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-stone-700">
                      Cargo *
                      <Input
                        aria-invalid={Boolean(errors.experiencias?.[index]?.cargo)}
                        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
                        {...form.register(`experiencias.${index}.cargo`)}
                      />
                      <Erro>{errors.experiencias?.[index]?.cargo?.message}</Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Empresa *
                      <Input
                        aria-invalid={Boolean(errors.experiencias?.[index]?.empresa)}
                        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
                        {...form.register(`experiencias.${index}.empresa`)}
                      />
                      <Erro>
                        {errors.experiencias?.[index]?.empresa?.message}
                      </Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Início (MM/AAAA) *
                      <Controller
                        control={form.control}
                        name={`experiencias.${index}.inicio`}
                        render={({ field }) => (
                          <IMaskInput
                            mask="00/0000"
                            value={field.value}
                            onAccept={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            aria-invalid={Boolean(errors.experiencias?.[index]?.inicio)}
                            className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
                          />
                        )}
                      />
                      <Erro>
                        {errors.experiencias?.[index]?.inicio?.message}
                      </Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Término (MM/AAAA ou Atual) *
                      <Input
                        placeholder="Atual"
                        aria-invalid={Boolean(errors.experiencias?.[index]?.fim)}
                        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
                        {...form.register(`experiencias.${index}.fim`)}
                      />
                      <Erro>{errors.experiencias?.[index]?.fim?.message}</Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700 sm:col-span-2">
                      Descrição das atividades *
                      <Textarea
                        aria-invalid={Boolean(errors.experiencias?.[index]?.descricao)}
                        className="mt-1.5 min-h-20 rounded-lg border-stone-200 bg-white"
                        {...form.register(`experiencias.${index}.descricao`)}
                      />
                      <Erro>
                        {errors.experiencias?.[index]?.descricao?.message}
                      </Erro>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg border-stone-200 shadow-none">
          <CardContent className="p-5 sm:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center text-terracotta-800">
                  <GraduationCap size={21} />
                </span>
                <div>
                  <h2 className="font-semibold text-stone-900">
                    Formação acadêmica
                  </h2>
                  <p className="text-xs text-stone-500">
                    Adicione uma ou mais formações.
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="rounded-lg"
                onClick={() =>
                  formacoes.append({
                    curso: "",
                    instituicao: "",
                    inicio: "",
                    fim: "",
                  })
                }
              >
                <Plus size={16} /> Adicionar
              </Button>
            </div>
            {!formacoes.fields.length && (
              <p className="mt-5 rounded-xl bg-stone-50 px-4 py-3 text-sm text-stone-500">
                Nenhuma formação adicionada. Este campo é opcional.
              </p>
            )}
            <div className="mt-4 space-y-3">
              {formacoes.fields.map((item, index) => (
                <div
                  key={item.id}
                  className="border-t border-stone-200 py-4"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-semibold text-stone-800">
                      Formação {index + 1}
                    </p>
                    <button
                      type="button"
                      aria-label={`Remover formação ${index + 1}`}
                      onClick={() => formacoes.remove(index)}
                      className="flex size-9 items-center justify-center rounded-lg text-stone-500 hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-medium text-stone-700">
                      Curso *
                      <Input
                        aria-invalid={Boolean(errors.formacoes?.[index]?.curso)}
                        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
                        {...form.register(`formacoes.${index}.curso`)}
                      />
                      <Erro>{errors.formacoes?.[index]?.curso?.message}</Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Instituição *
                      <Input
                        aria-invalid={Boolean(errors.formacoes?.[index]?.instituicao)}
                        className="mt-1.5 h-10 rounded-lg border-stone-200 bg-white"
                        {...form.register(`formacoes.${index}.instituicao`)}
                      />
                      <Erro>
                        {errors.formacoes?.[index]?.instituicao?.message}
                      </Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Início (MM/AAAA) *
                      <Controller
                        control={form.control}
                        name={`formacoes.${index}.inicio`}
                        render={({ field }) => (
                          <IMaskInput
                            mask="00/0000"
                            value={field.value}
                            onAccept={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            aria-invalid={Boolean(errors.formacoes?.[index]?.inicio)}
                            className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
                          />
                        )}
                      />
                      <Erro>{errors.formacoes?.[index]?.inicio?.message}</Erro>
                    </label>
                    <label className="block text-sm font-medium text-stone-700">
                      Término (MM/AAAA) *
                      <Controller
                        control={form.control}
                        name={`formacoes.${index}.fim`}
                        render={({ field }) => (
                          <IMaskInput
                            mask="00/0000"
                            value={field.value}
                            onAccept={(value) => field.onChange(value)}
                            onBlur={field.onBlur}
                            inputRef={field.ref}
                            aria-invalid={Boolean(errors.formacoes?.[index]?.fim)}
                            className="mt-1.5 h-10 w-full rounded-lg border border-stone-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
                          />
                        )}
                      />
                      <Erro>{errors.formacoes?.[index]?.fim?.message}</Erro>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-lg px-5"
            disabled={enviando}
            onClick={() => router.push("/curriculos/visualizar")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting || enviando}
            className="h-11 rounded-lg bg-terracotta-800 px-6 text-white hover:bg-terracotta-900"
          >
            {form.formState.isSubmitting || enviando
              ? "Salvando..."
              : "Salvar currículo"}
          </Button>
        </div>
      </form>
    </section>
  )
}
