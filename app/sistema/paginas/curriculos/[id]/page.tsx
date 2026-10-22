import { redirect } from "next/navigation"

export const instant = false

export default async function RotaLegadaDetalhes({
  params,
}: PageProps<"/sistema/paginas/curriculos/[id]">) {
  const { id } = await params
  if (id === "novo") redirect("/curriculos/cadastrar")
  redirect(`/curriculos/visualizar/${encodeURIComponent(id)}`)
}
