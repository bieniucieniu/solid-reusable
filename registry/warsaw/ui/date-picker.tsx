import * as zag from "@zag-js/date-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type ValidComponent,
} from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps } from "@/registry/warsaw/lib/dynamic-as"

export type CreateDatePickerOptions = Omit<zag.Props, "id">

/**
 * Zag date-picker compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/date-picker
 *
 * ```tsx
 * import { createDatePicker } from "@components/ui/date-picker"
 *
 * const datePicker = createDatePicker({})
 * return (
 *   <datePicker.Root>
 *     ...
 *   </datePicker.Root>
 * )
 * ```
 */
export function createDatePicker(options: CreateDatePickerOptions = {} as CreateDatePickerOptions) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getClearTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Input<Comp extends ValidComponent = "input">(
      props: DynamicAsProps<Comp, zag.InputProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index","fixOnBlur"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({ index: local.index, fixOnBlur: local.fixOnBlur })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label<Comp extends ValidComponent = "label">(
      props: DynamicAsProps<Comp, zag.LabelProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","index"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps({ index: local.index })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    MonthSelect(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMonthSelectProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    NextTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps({ view: local.view })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    PresetTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.PresetTriggerProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPresetTriggerProps({ value: local.value })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    PrevTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps({ view: local.view })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    RangeText(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRangeTextProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Table<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TableProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view","columns","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableProps({ view: local.view, columns: local.columns, id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableBody<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TableProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view","columns","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableBodyProps({ view: local.view, columns: local.columns, id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableCell(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableCellProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableCellTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTableCellTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableHead<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TableProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view","columns","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableHeadProps({ view: local.view, columns: local.columns, id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableHeader<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TableProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view","columns","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableHeaderProps({ view: local.view, columns: local.columns, id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableRow<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.TableProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view","columns","id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getTableRowProps({ view: local.view, columns: local.columns, id: local.id })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    View<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewProps({ view: local.view })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ViewControl<Comp extends ValidComponent = "div">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewControlProps({ view: local.view })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    ViewTrigger<Comp extends ValidComponent = "button">(
      props: DynamicAsProps<Comp, zag.ViewProps>,
    ) {
      const [local, rest] = splitProps(props, ["as","children","view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getViewTriggerProps({ view: local.view })}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    YearSelect(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getYearSelectProps()}
          {...rest}
        >
          {local.children}
        </Dynamic>
      )
    },

    /** Connected Zag API (accessor). */
    api,
  }
}

export type DatePickerCompound = ReturnType<typeof createDatePicker>
