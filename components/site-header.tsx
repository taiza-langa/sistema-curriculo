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
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700">
          <span className="flex size-8 items-center justify-center text-terracotta-800">
            <FileText size={19} />
          </span>
          <span className="text-base font-bold tracking-tight text-stone-900">currículos</span>
        </Link>
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const ativo = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
            return (
              <Link key={link.href} href={link.href} aria-current={ativo ? "page" : undefined} className={cn("px-3 py-2 text-sm font-medium transition-colors hover:text-terracotta-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700", ativo ? "text-terracotta-900 underline decoration-terracotta-700 underline-offset-8" : "text-stone-600")}>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <button type="button" className="flex size-10 items-center justify-center rounded-md text-stone-700 hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700 md:hidden" aria-label={menuAberto ? "Fechar menu" : "Abrir menu"} aria-expanded={menuAberto} aria-controls="mobile-navigation" onClick={() => setMenuAberto(!menuAberto)}>
          {menuAberto ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
      {menuAberto && (
        <nav id="mobile-navigation" aria-label="Navegação móvel" className="border-t border-stone-100 px-5 py-3 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {links.map((link) => {
              const ativo = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
              return <Link key={link.href} href={link.href} aria-current={ativo ? "page" : undefined} onClick={() => setMenuAberto(false)} className={cn("rounded-md px-3 py-2.5 text-sm font-medium hover:bg-stone-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700", ativo ? "text-terracotta-900" : "text-stone-600")}>{link.label}</Link>
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
