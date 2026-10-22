import Link from "next/link"
import { ArrowRight, FilePlus2, Search, ShieldCheck, Sparkles } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const beneficios = [
  {
    icon: FilePlus2,
    titulo: "Cadastre com facilidade",
    descricao: "Reúna dados pessoais, experiências e formações em um único lugar.",
  },
  {
    icon: Search,
    titulo: "Encontre em segundos",
    descricao: "Pesquise currículos por nome ou cargo com filtro em tempo real.",
  },
  {
    icon: ShieldCheck,
    titulo: "Tudo organizado",
    descricao: "Acesse informações completas e mantenha seus registros no navegador.",
  },
]

export default function Home() {
  return (
    <div>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-900">
              <Sparkles size={14} /> Gestão de currículos sem complicação
            </div>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-stone-950 sm:text-5xl lg:text-6xl">
              Pessoas incríveis, <span className="text-emerald-800">bem organizadas.</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-stone-600 sm:text-lg">
              Uma forma simples de cadastrar, consultar e manter os currículos da sua equipe em um só lugar.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/curriculos/cadastrar" className={buttonVariants({ size: "lg", className: "h-11 rounded-lg bg-emerald-800 px-5 text-white hover:bg-emerald-900" })}>
                Cadastrar currículo <ArrowRight size={17} />
              </Link>
              <Link href="/curriculos/visualizar" className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 rounded-lg px-5" })}>
                Explorar currículos
              </Link>
            </div>
            <p className="mt-5 text-xs text-stone-500">Seus dados ficam salvos localmente neste navegador.</p>
          </div>
          <Card className="overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 p-0 shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-stone-500">Visão geral</p>
                  <h2 className="mt-1 text-2xl font-bold text-stone-900">Banco de talentos</h2>
                </div>
                <span className="rounded-xl bg-emerald-100 p-3 text-emerald-900"><FilePlus2 size={22} /></span>
              </div>
              <div className="mt-8 space-y-3">
                {[
                  ["MC", "Mariana Costa", "Product Designer", "bg-rose-100 text-rose-800"],
                  ["LF", "Lucas Ferreira", "Desenvolvedor Front-end", "bg-sky-100 text-sky-800"],
                  ["AS", "Ana Souza", "Analista de Marketing", "bg-amber-100 text-amber-800"],
                ].map(([iniciais, nome, cargo, cor]) => (
                  <div key={nome} className="flex items-center gap-3 rounded-xl border border-stone-200 bg-white p-3.5">
                    <span className={`flex size-10 items-center justify-center rounded-full text-xs font-bold ${cor}`}>{iniciais}</span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-stone-900">{nome}</p>
                      <p className="truncate text-xs text-stone-500">{cargo}</p>
                    </div>
                    <ArrowRight size={16} className="text-stone-400" />
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-stone-200 pt-4 text-xs text-stone-500">
                <span className="size-2 rounded-full bg-emerald-600" /> Acesso rápido aos perfis cadastrados
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-emerald-800">Feito para simplificar</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-950">Tudo o que você precisa, sem excessos.</h2>
          <p className="mt-3 leading-7 text-stone-600">Uma experiência direta para organizar informações profissionais e encontrar os perfis certos.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {beneficios.map(({ icon: Icon, titulo, descricao }) => (
            <Card key={titulo} className="rounded-2xl border-stone-200 shadow-none">
              <CardContent className="p-6">
                <span className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800"><Icon size={21} /></span>
                <h3 className="mt-5 text-lg font-semibold text-stone-900">{titulo}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{descricao}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
