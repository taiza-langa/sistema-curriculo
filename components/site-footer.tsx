import Link from "next/link"
import { FileText } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-7 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold text-stone-700">
          <FileText size={16} className="text-emerald-800" /> currículo.fácil
        </Link>
        <p>© 2026 currículo.fácil. Projeto acadêmico.</p>
        <Link href="/curriculos/visualizar" className="hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">Ver currículos</Link>
      </div>
    </footer>
  )
}
