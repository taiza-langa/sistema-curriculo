"use client"

import { useCallback, useSyncExternalStore } from "react"
import { toast } from "sonner"
import {
  curriculosIniciais,
  Curriculo,
  CurriculoFormData,
  isCurriculo,
  STORAGE_KEY,
} from "@/lib/curriculos"

type StoreSnapshot = {
  curriculos: Curriculo[]
  carregando: boolean
}

let snapshot: StoreSnapshot = { curriculos: [], carregando: true }
const serverSnapshot: StoreSnapshot = { curriculos: [], carregando: true }
let inicializado = false
const listeners = new Set<() => void>()

function publicar(curriculos: Curriculo[], carregando = false) {
  snapshot = { curriculos, carregando }
  listeners.forEach((listener) => listener())
}

function carregarSalvos() {
  if (inicializado) return
  inicializado = true

  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (saved === null) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculosIniciais))
      publicar(curriculosIniciais)
      return
    }

    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed) || !parsed.every(isCurriculo)) {
      throw new Error("Formato de currículos inválido.")
    }
    publicar(parsed)
  } catch (error) {
    console.error("Não foi possível carregar os currículos salvos.", error)
    toast.error("Não foi possível carregar os currículos salvos.", {
      description:
        error instanceof Error ? error.message : "Tente recarregar a página.",
    })
    publicar([])
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  carregarSalvos()
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return snapshot
}

function getServerSnapshot(): StoreSnapshot {
  return serverSnapshot
}

function persistir(curriculos: Curriculo[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculos))
    publicar(curriculos)
  } catch (error) {
    console.error("Não foi possível salvar os currículos.", error)
    toast.error(
      "Não foi possível salvar. Verifique o espaço disponível no navegador.",
    )
    throw error
  }
}

export function useCurriculos() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const adicionar = useCallback((dados: CurriculoFormData) => {
    const novo: Curriculo = {
      ...dados,
      id: crypto.randomUUID(),
      criadoEm: new Date().toISOString().slice(0, 10),
    }
    persistir([novo, ...snapshot.curriculos])
    return novo
  }, [])

  const remover = useCallback((id: string) => {
    persistir(snapshot.curriculos.filter((curriculo) => curriculo.id !== id))
  }, [])

  return { ...state, adicionar, remover }
}
