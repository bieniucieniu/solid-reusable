import {
  createContext,
  createMemo,
  createUniqueId,
  splitProps,
  useContext,
  type Accessor,
  type Component,
  type JSX,
  type ParentProps,
} from "solid-js"
import { normalizeProps, useMachine, mergeProps as mergeZagProps } from "@zag-js/solid"
import { zagProviderMeta } from "./meta"
import type { CompoundParts } from "@solid-reusable/provider"

type AnyRecord = Record<string, unknown>

export interface MachineModule {
  /** Zag machine definition (pass to `useMachine`). */
  machine: unknown
  connect: (service: unknown, normalize: typeof normalizeProps) => AnyRecord
}

export interface CreateMachineCompoundOptions {
  /** Zag scope name, e.g. "tooltip". */
  scope: string
  /** Anatomy part names (camelCase). */
  parts: readonly string[]
  /**
   * When set, Root renders a DOM node and spreads get{RootPart}Props.
   * When omitted, Root is context-only (Fragment) — preferred for overlay comps.
   */
  rootPart?: string
  defaultMachineProps?: AnyRecord
}

function toPascal(part: string): string {
  return part
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("")
}

function getterName(part: string): string {
  return `get${toPascal(part)}Props`
}

/**
 * `createX()` factory for Zag-backed compounds.
 * Non-Zag comps (Button, Badge, …) must NOT use this — export plain components instead.
 */
export function createMachineCompound<TMachine extends MachineModule>(
  machineMod: TMachine,
  options: CreateMachineCompoundOptions,
) {
  type Api = ReturnType<TMachine["connect"]>
  type Ctx = { api: Accessor<Api> }

  return function createInstance(machineProps: AnyRecord = {}) {
    const Context = createContext<Ctx>()

    const Root: Component<ParentProps<AnyRecord>> = (props) => {
      const [local, rest] = splitProps(props, ["children", "class", "classList"])
      const service = useMachine(machineMod.machine as never, {
        id: createUniqueId(),
        ...options.defaultMachineProps,
        ...machineProps,
        ...rest,
      })
      const api = createMemo(() => machineMod.connect(service, normalizeProps) as Api)
      const value: Ctx = { api }

      if (options.rootPart) {
        const getter = api()[getterName(options.rootPart)] as
          | ((p?: AnyRecord) => JSX.HTMLAttributes<HTMLElement>)
          | undefined
        const rootProps = getter ? getter() : {}
        return (
          <Context.Provider value={value}>
            <div
              {...rootProps}
              class={local.class as string | undefined}
              data-scope={options.scope}
              data-part={options.rootPart}
            >
              {local.children}
            </div>
          </Context.Provider>
        )
      }

      return <Context.Provider value={value}>{local.children}</Context.Provider>
    }

    function useApi() {
      const ctx = useContext(Context)
      if (!ctx) {
        throw new Error(
          `[${options.scope}] part used outside Root. const x = create${toPascal(options.scope)}(); wrap with <x.Root>.`,
        )
      }
      return ctx.api
    }

    const parts = {} as Record<string, Component<AnyRecord>>

    for (const part of options.parts) {
      if (options.rootPart && part === options.rootPart) continue

      const Comp: Component<ParentProps<AnyRecord>> = (props) => {
        const api = useApi()
        const [local, rest] = splitProps(props, ["children"])
        const getter = api()[getterName(part)] as
          | ((p?: AnyRecord) => JSX.HTMLAttributes<HTMLElement>)
          | undefined
        const zagProps = getter ? getter(rest) : { "data-part": part }
        const merged = mergeZagProps(zagProps, rest)

        const asButton =
          part === "trigger" ||
          part === "closeTrigger" ||
          part === "item" ||
          part === "prevTrigger" ||
          part === "nextTrigger" ||
          part.endsWith("Trigger")

        if (asButton) {
          return (
            <button type="button" {...merged} data-scope={options.scope}>
              {local.children}
            </button>
          )
        }

        return (
          <div {...merged} data-scope={options.scope}>
            {local.children}
          </div>
        )
      }

      parts[toPascal(part)] = Comp
    }

    return {
      Root,
      ...parts,
      provider: zagProviderMeta,
      useApi,
    } as CompoundParts<typeof parts & { Root: typeof Root }> & { useApi: typeof useApi }
  }
}
