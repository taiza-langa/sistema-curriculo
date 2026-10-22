"use client"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Trash2,
  UserRound,
} from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurriculos } from "@/hooks/use-curriculos"

function Iniciais({ nome }: { nome: string }) {
  return (
    <span className="flex size-20 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-900">
      {nome
        .split(" ")
        .slice(0, 2)
        .map((parte) => parte[0])
        .join("")
        .toLocaleUpperCase("pt-BR")}
    </span>
  )
}

function CarregandoDetalhe() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8">
      <Skeleton className="h-5 w-40" />
      <Card className="mt-6 rounded-2xl">
        <CardContent className="space-y-5 p-6 sm:p-8">
          <div className="flex gap-5">
            <Skeleton className="size-20 rounded-full" />
            <div className="flex-1 space-y-3">
              <Skeleton className="h-7 w-64 max-w-full" />
              <Skeleton className="h-5 w-48 max-w-full" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>
          </div>
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </CardContent>
      </Card>
    </section>
  )
}

export function CurriculoDetalhe({ id }: { id: string }) {
  const { curriculos, carregando, remover } = useCurriculos()
  const router = useRouter()
  const [excluindo, setExcluindo] = useState(false)
  const curriculo = curriculos.find((item) => item.id === id)

  const excluir = async () => {
    if (!curriculo || excluindo) return
    const Swal = (await import("sweetalert2")).default
    const resultado = await Swal.fire({
      title: "Excluir este currículo?",
      text: `O perfil de ${curriculo.nome} será removido deste navegador.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#047857",
      cancelButtonColor: "#57534e",
      reverseButtons: true,
    })
    if (!resultado.isConfirmed) return

    setExcluindo(true)
    try {
      remover(curriculo.id)
      toast.success("Currículo excluído com sucesso.", {
        description: `${curriculo.nome} foi removido do banco de talentos.`,
      })
      router.push("/curriculos/visualizar")
    } catch (error) {
      toast.error("Não foi possível excluir o currículo.", {
        description: error instanceof Error ? error.message : "Tente novamente.",
      })
    } finally {
      setExcluindo(false)
    }
  }

  if (carregando) return <CarregandoDetalhe />

  if (!curriculo) {
    return (
      <section className="mx-auto max-w-4xl px-5 py-16 text-center sm:px-8">
        <h1 className="text-2xl font-bold text-stone-900">
          Currículo não encontrado
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          Este perfil pode ter sido removido ou não existe neste navegador.
        </p>
        <Link href="/curriculos/visualizar" className={buttonVariants({ className: "mt-6 rounded-lg bg-emerald-800 text-white hover:bg-emerald-900" })}>
          <ArrowLeft size={16} /> Voltar à listagem
        </Link>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <Link
        href="/curriculos/visualizar"
        className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
      >
        <ArrowLeft size={16} /> Voltar aos currículos
      </Link>
      <Card className="mt-5 overflow-hidden rounded-2xl border-stone-200 shadow-none">
        <div className="bg-emerald-900 px-6 py-8 text-white sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {curriculo.foto ? (
              <Image
                src={curriculo.foto}
                alt={`Foto de ${curriculo.nome}`}
                width={80}
                height={80}
                unoptimized
                className="size-20 shrink-0 rounded-full object-cover ring-4 ring-white/20"
              />
            ) : (
              <Iniciais nome={curriculo.nome} />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-emerald-100">
                Currículo profissional
              </p>
              <h1 className="mt-1 break-words text-3xl font-bold tracking-tight">
                {curriculo.nome}
              </h1>
              <p className="mt-1 text-base text-emerald-50">{curriculo.cargo}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={excluindo}
              onClick={excluir}
              className="shrink-0 rounded-lg border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <Trash2 size={16} /> {excluindo ? "Excluindo..." : "Excluir"}
            </Button>
          </div>
        </div>

        <CardContent className="space-y-8 p-5 sm:p-8">
          <section>
            <h2 className="flex items-center gap-2 font-semibold text-stone-900">
              <UserRound size={18} className="text-emerald-800" /> Sobre
            </h2>
            <p className="mt-3 text-sm leading-7 text-stone-600">
              {curriculo.resumo}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {curriculo.habilidades
                .split(",")
                .map((habilidade) => habilidade.trim())
                .filter(Boolean)
                .map((habilidade, index) => (
                  <Badge
                    key={`${habilidade}-${index}`}
                    variant="secondary"
                    className="rounded-full px-3 py-1 text-xs"
                  >
                    {habilidade}
                  </Badge>
                ))}
            </div>
          </section>

          <section className="border-t border-stone-200 pt-6">
            <h2 className="flex items-center gap-2 font-semibold text-stone-900">
              <MapPin size={18} className="text-emerald-800" /> Contato e dados
              pessoais
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <a
                href={`mailto:${curriculo.email}`}
                className="flex items-center gap-2 break-all text-sm text-stone-600 hover:text-emerald-800"
              >
                <Mail size={16} className="shrink-0 text-stone-400" />
                {curriculo.email}
              </a>
              <a
                href={`tel:${curriculo.telefone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 text-sm text-stone-600 hover:text-emerald-800"
              >
                <Phone size={16} className="shrink-0 text-stone-400" />
                {curriculo.telefone}
              </a>
              <p className="flex items-center gap-2 text-sm text-stone-600">
                <MapPin size={16} className="shrink-0 text-stone-400" />
                {curriculo.endereco}, {curriculo.cidade} - {curriculo.estado}
              </p>
              <p className="flex items-center gap-2 text-sm text-stone-600">
                <CalendarDays size={16} className="shrink-0 text-stone-400" />
                Nascimento: {curriculo.nascimento}
              </p>
              <p className="text-sm text-stone-600">CPF: {curriculo.cpf}</p>
              {curriculo.linkedin && (
                <a
                  href={`https://${curriculo.linkedin.replace(/^https?:\/\//, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 break-all text-sm text-emerald-800 hover:underline"
                >
                  <ExternalLink size={15} />
                  {curriculo.linkedin}
                </a>
              )}
            </div>
          </section>

          <section className="border-t border-stone-200 pt-6">
            <h2 className="flex items-center gap-2 font-semibold text-stone-900">
              <BriefcaseBusiness size={18} className="text-emerald-800" />{" "}
              Experiência profissional
            </h2>
            {curriculo.experiencias.length ? (
              <div className="mt-4 space-y-4">
                {curriculo.experiencias.map((experiencia, index) => (
                  <div
                    key={`${experiencia.empresa}-${index}`}
                    className="border-l-2 border-emerald-200 pl-4"
                  >
                    <h3 className="font-medium text-stone-900">
                      {experiencia.cargo}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-600">
                      {experiencia.empresa}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {experiencia.inicio} — {experiencia.fim}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {experiencia.descricao}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-stone-500">
                Nenhuma experiência informada.
              </p>
            )}
          </section>

          <section className="border-t border-stone-200 pt-6">
            <h2 className="flex items-center gap-2 font-semibold text-stone-900">
              <GraduationCap size={19} className="text-emerald-800" /> Formação
              acadêmica
            </h2>
            {curriculo.formacoes.length ? (
              <div className="mt-4 space-y-4">
                {curriculo.formacoes.map((formacao, index) => (
                  <div
                    key={`${formacao.instituicao}-${index}`}
                    className="border-l-2 border-emerald-200 pl-4"
                  >
                    <h3 className="font-medium text-stone-900">
                      {formacao.curso}
                    </h3>
                    <p className="mt-0.5 text-sm text-stone-600">
                      {formacao.instituicao}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {formacao.inicio} — {formacao.fim}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-stone-500">
                Nenhuma formação informada.
              </p>
            )}
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
