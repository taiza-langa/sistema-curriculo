import { CurriculoDetalhe } from "@/components/curriculo-detalhe"

export default async function CurriculoDetalhePage({
  params,
}: PageProps<"/curriculos/visualizar/[id]">) {
  const { id } = await params
  return <CurriculoDetalhe id={id} />
}
