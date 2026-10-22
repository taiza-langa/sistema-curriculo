import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingDetalheCurriculo() {
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
            </div>
          </div>
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    </section>
  )
}
