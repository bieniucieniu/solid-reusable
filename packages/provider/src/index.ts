import type { Accessor, Component, JSX } from "solid-js"

/**
 * Headless UI provider contract.
 * Zag is the default implementation (`@solid-reusable/provider-zag`).
 * Future: Kobalte / Ark / custom adapters implement the same surface.
 */
export type HeadlessProviderId = "zag" | "kobalte" | "custom"

export interface HeadlessProviderMeta {
  id: HeadlessProviderId
  name: string
}

/** Shared shape every Zag-backed factory returns. */
export type CompoundParts<T extends Record<string, Component<any>>> = T & {
  /** Provider that backs this compound tree. */
  provider: HeadlessProviderMeta
}

export type PropGetter = (props?: Record<string, unknown>) => JSX.HTMLAttributes<any>

export interface ZagMachineApi {
  [key: string]: unknown
}

export interface CreateZagRootResult {
  api: Accessor<ZagMachineApi>
}

export interface HeadlessProvider {
  meta: HeadlessProviderMeta
}
