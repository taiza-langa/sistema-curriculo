import Link from "next/link"
import { FilePlus2, Search, ShieldCheck } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"

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
    <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
      <section>
        <p className="text-sm font-medium text-terracotta-800">
          Gestão simples de currículos
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-stone-950 sm:text-5xl">
          Pessoas e oportunidades, em um só lugar.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
          Cadastre, consulte e organize currículos de forma prática. Seus dados
          ficam salvos neste navegador.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/curriculos/cadastrar"
            className={buttonVariants({
              className:
                "h-10 rounded-md bg-terracotta-800 px-4 text-white hover:bg-terracotta-900",
            })}
          >
            <FilePlus2 size={16} /> Cadastrar currículo
          </Link>
          <Link
            href="/curriculos/visualizar"
            className={buttonVariants({
              variant: "outline",
              className: "h-10 rounded-md px-4",
            })}
          >
            Ver currículos
          </Link>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-lg font-semibold text-stone-900">
          O que você pode fazer
        </h2>
        <ul className="mt-4 divide-y divide-stone-200 border-y border-stone-200">
          {beneficios.map(({ icon: Icon, titulo, descricao }) => (
            <li key={titulo} className="flex gap-4 py-4">
              <Icon
                size={19}
                aria-hidden="true"
                className="mt-0.5 shrink-0 text-terracotta-800"
              />
              <div>
                <h3 className="text-sm font-semibold text-stone-900">
                  {titulo}
                </h3>
                <p className="mt-1 text-sm leading-6 text-stone-600">
                  {descricao}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
