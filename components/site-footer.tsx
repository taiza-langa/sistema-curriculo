import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-sm text-stone-500 sm:flex-row sm:px-8">
        <p>© 2026 currículos · Projeto acadêmico</p>
        <Link
          href="/curriculos/visualizar"
          className="transition-colors hover:text-terracotta-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta-700"
        >
          Ver currículos
        </Link>
      </div>
    </footer>
  )
}
