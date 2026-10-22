"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"
import {
  ArrowRight,
  BriefcaseBusiness,
  CircleX,
  FilePlus2,
  Search,
  Users,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurriculos } from "@/hooks/use-curriculos"

export function CurriculosLista() {
  const { curriculos, carregando } = useCurriculos()
  const [busca, setBusca] = useState("")

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR")
    if (!termo) return curriculos
    return curriculos.filter((curriculo) =>
      `${curriculo.nome} ${curriculo.cargo}`
        .toLocaleLowerCase("pt-BR")
        .includes(termo),
    )
  }, [busca, curriculos])

  return (
    <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-terracotta-800">
            Banco de talentos
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-stone-950">
            Currículos
          </h1>
          <p className="mt-2 text-sm text-stone-600">
            Consulte e organize os perfis profissionais cadastrados.
          </p>
        </div>
        <Link href="/curriculos/cadastrar" className={buttonVariants({ className: "h-10 rounded-lg bg-terracotta-800 text-white hover:bg-terracotta-900" })}>
          <FilePlus2 size={17} /> Novo currículo
        </Link>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:max-w-md">
          <Search
            size={17}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
          />
          <Input
            aria-label="Buscar por nome ou cargo"
            aria-describedby="search-description"
            placeholder="Buscar por nome ou cargo..."
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            className="h-11 rounded-xl border-stone-200 bg-white pl-10 pr-10"
          />
          <span id="search-description" className="sr-only">
            A lista é filtrada em tempo real pelo nome ou cargo.
          </span>
          {busca && (
            <button
              type="button"
              aria-label="Limpar busca"
              onClick={() => setBusca("")}
              className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-md text-stone-500 hover:bg-stone-100 hover:text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
            >
              <CircleX size={16} />
            </button>
          )}
        </div>
        {!carregando && (
          <Badge
            variant="secondary"
            className="h-8 w-fit rounded-full px-3 text-xs"
          >
            {filtrados.length} {filtrados.length === 1 ? "perfil" : "perfis"}
          </Badge>
        )}
      </div>

      {carregando ? (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 6 }, (_, index) => (
            <Card key={index} className="rounded-2xl">
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <Skeleton className="size-12 rounded-full" />
                  <div className="min-w-0 flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <Skeleton className="h-9 w-28" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : filtrados.length ? (
        <div className="mt-6 space-y-3">
          {filtrados.map((curriculo) => (
            <Card
              key={curriculo.id}
              className="rounded-2xl border-stone-200 shadow-none transition-shadow hover:shadow-md"
            >
              <CardContent className="grid gap-4 p-4 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_auto] sm:items-center sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  {curriculo.foto ? (
                    <Image
                      src={curriculo.foto}
                      alt={`Foto de ${curriculo.nome}`}
                      width={48}
                      height={48}
                      unoptimized
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-terracotta-100 text-sm font-bold text-terracotta-900"
                    >
                      {curriculo.nome
                        .split(" ")
                        .slice(0, 2)
                        .map((parte) => parte[0])
                        .join("")
                        .toLocaleUpperCase("pt-BR")}
                    </span>
                  )}
                  <div className="min-w-0 flex-1 pt-0.5">
                    <h2 className="truncate font-semibold text-stone-900">
                      {curriculo.nome}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 truncate text-sm text-stone-600">
                      <BriefcaseBusiness size={14} />
                      {curriculo.cargo}
                    </p>
                  </div>
                </div>
                <p className="line-clamp-2 text-sm leading-6 text-stone-600">
                  {curriculo.resumo}
                </p>
                <Link
                  href={`/curriculos/visualizar/${curriculo.id}`}
                  className="inline-flex h-9 w-fit items-center gap-2 rounded-lg border border-stone-200 px-3 text-sm font-medium text-stone-700 transition-colors hover:border-terracotta-700 hover:bg-terracotta-50 hover:text-terracotta-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
                >
                  Ver currículo <ArrowRight size={15} />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="mt-8 rounded-2xl border-dashed border-stone-300 shadow-none">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-terracotta-50 text-terracotta-800">
              {busca ? <Search size={24} /> : <Users size={24} />}
            </span>
            <h2 className="mt-4 text-lg font-semibold text-stone-900">
              {busca
                ? "Nenhum resultado encontrado"
                : "Seu banco de talentos está vazio"}
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-stone-600">
              {busca
                ? "Tente buscar por outro nome ou cargo."
                : "Cadastre o primeiro perfil para começar a organizar os currículos."}
            </p>
            {!busca && (
              <Link href="/curriculos/cadastrar" className={buttonVariants({ className: "mt-5 rounded-lg bg-terracotta-800 text-white hover:bg-terracotta-900" })}>
                <FilePlus2 size={17} /> Criar meu primeiro currículo
              </Link>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  )
}
