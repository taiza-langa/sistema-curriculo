"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Menu, X } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Início" },
  { href: "/curriculos/visualizar", label: "Currículos" },
  { href: "/curriculos/cadastrar", label: "Cadastrar currículo" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [menuAberto, setMenuAberto] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-800 text-white">
            <FileText size={19} />
          </span>
          <span className="text-base font-bold tracking-tight text-stone-900">currículo<span className="text-emerald-800">.fácil</span></span>
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const ativo = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} aria-current={ativo ? "page" : undefined} className={cn("rounded-lg px-4 py-2 text-sm font-medium transition-colors hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700", ativo ? "bg-emerald-50 text-emerald-900" : "text-stone-600")}>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <button type="button" className="flex size-10 items-center justify-center rounded-lg text-stone-700 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 md:hidden" aria-label={menuAberto ? "Fechar menu" : "Abrir menu"} aria-expanded={menuAberto} aria-controls="mobile-navigation" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuAberto && (
        <nav id="mobile-navigation" aria-label="Navegação móvel" className="border-t border-stone-100 px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => {
              const ativo = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return <Link key={link.href} href={link.href} aria-current={ativo ? "page" : undefined} onClick={() => setMenuAberto(false)} className={cn("rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700", ativo ? "bg-emerald-50 text-emerald-900" : "text-stone-600")}>{link.label}</Link>
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
