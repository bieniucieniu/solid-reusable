import * as zag from "@zag-js/date-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, createUniqueId, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"

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
export function createDatePicker(options?: ZagMachineProps<zag.Machine>) {
  const service = useMachine(zag.machine, options)
  const api = createMemo(() => zag.connect(service, normalizeProps))

  return {
    Root(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRootProps()} {...rest} />
    },
    Label(props: DynamicAsProps<"label", zag.LabelProps>) {
      const [local, rest] = splitProps(props, ["as", "index"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps({ index: local.index })}
          {...rest}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getControlProps()} {...rest} />
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic component={local.as ?? "div"} {...api().getContentProps()} {...rest} />
          </div>
        </Show>
      )
    },
    RangeText(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRangeTextProps()} {...rest} />
    },
    Table(props: DynamicAsProps<"table", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "table"}
          {...api().getTableProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    TableHead(props: DynamicAsProps<"thead", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "thead"}
          {...api().getTableHeadProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    TableHeader(props: DynamicAsProps<"th", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "th"}
          {...api().getTableHeaderProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    TableBody(props: DynamicAsProps<"tbody", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "tbody"}
          {...api().getTableBodyProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    TableRow(props: DynamicAsProps<"tr", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "tr"}
          {...api().getTableRowProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    WeekNumberHeaderCell(props: DynamicAsProps<"div", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getWeekNumberHeaderCellProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
        />
      )
    },
    WeekNumberCell(props: DynamicAsProps<"div", zag.WeekNumberCellProps>) {
      const [local, rest] = splitProps(props, ["as", "weekIndex", "week"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getWeekNumberCellProps({
            weekIndex: local.weekIndex,
            week: local.week,
          })}
          {...rest}
        />
      )
    },
    DayTableCell(props: DynamicAsProps<"div", zag.DayTableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "visibleRange"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getDayTableCellProps({
            value: local.value,
            disabled: local.disabled,
            visibleRange: local.visibleRange,
          })}
          {...rest}
        />
      )
    },
    DayTableCellTrigger(props: DynamicAsProps<"button", zag.DayTableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "value", "disabled", "visibleRange"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getDayTableCellTriggerProps({
            value: local.value,
            disabled: local.disabled,
            visibleRange: local.visibleRange,
          })}
          {...rest}
        />
      )
    },
    MonthTableCell(props: DynamicAsProps<"div", zag.TableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "disabled", "value", "columns"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getMonthTableCellProps({
            disabled: local.disabled,
            value: local.value,
            columns: local.columns,
          })}
          {...rest}
        />
      )
    },
    MonthTableCellTrigger(props: DynamicAsProps<"button", zag.TableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "disabled", "value", "columns"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getMonthTableCellTriggerProps({
            disabled: local.disabled,
            value: local.value,
            columns: local.columns,
          })}
          {...rest}
        />
      )
    },
    YearTableCell(props: DynamicAsProps<"div", zag.TableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "disabled", "value", "columns"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getYearTableCellProps({
            disabled: local.disabled,
            value: local.value,
            columns: local.columns,
          })}
          {...rest}
        />
      )
    },
    YearTableCellTrigger(props: DynamicAsProps<"button", zag.TableCellProps>) {
      const [local, rest] = splitProps(props, ["as", "disabled", "value", "columns"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getYearTableCellTriggerProps({
            disabled: local.disabled,
            value: local.value,
            columns: local.columns,
          })}
          {...rest}
        />
      )
    },
    NextTrigger(props: DynamicAsProps<"button", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps({ view: local.view })}
          {...rest}
        />
      )
    },
    PrevTrigger(props: DynamicAsProps<"button", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps({ view: local.view })}
          {...rest}
        />
      )
    },
    ClearTrigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return (
        <Dynamic component={local.as ?? "button"} {...api().getClearTriggerProps()} {...rest} />
      )
    },
    Trigger(props: DynamicAsProps<"button", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "button"} {...api().getTriggerProps()} {...rest} />
    },
    PresetTrigger(props: DynamicAsProps<"button", zag.PresetTriggerProps>) {
      const [local, rest] = splitProps(props, ["as", "value"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPresetTriggerProps({ value: local.value })}
          {...rest}
        />
      )
    },
    View(props: DynamicAsProps<"div", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewProps({ view: local.view })}
          {...rest}
        />
      )
    },
    ViewTrigger(props: DynamicAsProps<"button", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getViewTriggerProps({ view: local.view })}
          {...rest}
        />
      )
    },
    ViewControl(props: DynamicAsProps<"div", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewControlProps({ view: local.view })}
          {...rest}
        />
      )
    },
    Input(props: DynamicAsProps<"input", zag.InputProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "fixOnBlur"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({
            index: local.index,
            fixOnBlur: local.fixOnBlur,
          })}
          {...rest}
        />
      )
    },
    MonthSelect(props: DynamicAsProps<"select", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "select"} {...api().getMonthSelectProps()} {...rest} />
    },
    YearSelect(props: DynamicAsProps<"select", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "select"} {...api().getYearSelectProps()} {...rest} />
    },

    /** Connected Zag API (accessor). */
    get api() {
      return api()
    },
  }
}

export type DatePickerCompound = ReturnType<typeof createDatePicker>
