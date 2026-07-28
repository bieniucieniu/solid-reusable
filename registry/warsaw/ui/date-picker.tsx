import * as zag from "@zag-js/date-picker"
import { mergeProps, normalizeProps, useMachine } from "@zag-js/solid"
import {
  Show,
  createMemo,
  createUniqueId,
  splitProps,
  type JSX,
  type Component,
} from "solid-js"
import { Dynamic } from "solid-js/web"

type PartProps = {
  as?: Component<Record<string, unknown>> | keyof JSX.IntrinsicElements
  children?: JSX.Element
} & Record<string, unknown>

export type CreateDatePickerOptions = Record<string, unknown>

/**
 * Zag date-picker compound. Call inside a Solid component setup (uses useMachine).
 *
 * @see https://zagjs.com/components/solid/date-picker
 *
 * ```tsx
 * import { createDatePicker } from "@components/ui/date-picker"
 *
 * const datePicker = createDatePicker({ openDelay: 200 })
 * return (
 *   <datePicker.Root>
 *     ...
 *   </datePicker.Root>
 * )
 * ```
 */
export function createDatePicker(options: CreateDatePickerOptions = {}) {
  const service = useMachine(zag.machine, {
    id: createUniqueId(),
    ...options,
  })
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    ClearTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getClearTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "clearTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Content(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...mergeProps(api().getContentProps(), rest)}
            >
              {local.children}
            </Dynamic>
          </div>
        </Show>
      )
    },

    Control(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getControlProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "control" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Input(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getInputProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "input" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Label(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getLabelProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "label" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    MonthSelect(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getMonthSelectProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "monthSelect" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    NextTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getNextTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "nextTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    PresetTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getPresetTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "presetTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    PrevTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getPrevTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "prevTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    RangeText(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getRangeTextProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "rangeText" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Root(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getRootProps
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...(getProps ? mergeProps(getProps(), rest) : rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Table(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "table" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableBody(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableBodyProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableBody" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableCell(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableCellProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableCell" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableCellTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableCellTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableCellTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableHead(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableHeadProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableHead" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableHeader(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableHeaderProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableHeader" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    TableRow(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTableRowProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "tableRow" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    Trigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "trigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    View(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getViewProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "view" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ViewControl(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getViewControlProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "viewControl" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    ViewTrigger(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getViewTriggerProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "viewTrigger" }, rest)}
        >
          {local.children}
        </Dynamic>
      )
    },

    YearSelect(props: PartProps) {
      const [local, rest] = splitProps(props, ["as", "children"])
      const getProps = api().getYearSelectProps as ((p?: Record<string, unknown>) => Record<string, unknown>) | undefined
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...mergeProps(getProps ? getProps(rest) : { "data-part": "yearSelect" }, rest)}
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
