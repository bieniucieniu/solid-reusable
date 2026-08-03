import * as zag from "@zag-js/date-picker"
import { normalizeProps, useMachine } from "@zag-js/solid"
import { createMemo, Show, splitProps } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { DynamicAsProps, ZagMachineProps } from "@/registry/warsaw/lib/dynamic-as"
import { cn } from "@/registry/warsaw/lib/utils"

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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getRootProps()}
          {...rest}
          class={cn(/* styled */ "flex flex-col gap-1.5", local.class)}
        />
      )
    },
    Label(props: DynamicAsProps<"label", zag.LabelProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "class"])
      return (
        <Dynamic
          component={local.as ?? "label"}
          {...api().getLabelProps({ index: local.index })}
          {...rest}
          class={cn(
            /* styled */ "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
            local.class
          )}
        />
      )
    },
    Control(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getControlProps()}
          {...rest}
          class={cn(/* styled */ "relative flex items-center", local.class)}
        />
      )
    },
    Content(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Show when={api().open}>
          <div {...api().getPositionerProps()}>
            <Dynamic
              component={local.as ?? "div"}
              {...api().getContentProps()}
              {...rest}
              class={cn(
                /* styled */ "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 w-auto p-3",
                local.class
              )}
            />
          </div>
        </Show>
      )
    },
    RangeText(props: DynamicAsProps<"div", {}>) {
      const [local, rest] = splitProps(props, ["as"])
      return <Dynamic component={local.as ?? "div"} {...api().getRangeTextProps()} {...rest} />
    },
    Table(props: DynamicAsProps<"table", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id", "class"])
      return (
        <Dynamic
          component={local.as ?? "table"}
          {...api().getTableProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
          class={cn(/* styled */ "w-full border-collapse space-y-1", local.class)}
        />
      )
    },
    TableHead(props: DynamicAsProps<"thead", zag.TableProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id", "class"])
      return (
        <Dynamic
          component={local.as ?? "thead"}
          {...api().getTableHeadProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
          class={cn(
            /* styled */ "w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground",
            local.class
          )}
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
      const [local, rest] = splitProps(props, ["as", "view", "columns", "id", "class"])
      return (
        <Dynamic
          component={local.as ?? "tr"}
          {...api().getTableRowProps({
            view: local.view,
            columns: local.columns,
            id: local.id,
          })}
          {...rest}
          class={cn(/* styled */ "mt-2 flex w-full", local.class)}
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
      const [local, rest] = splitProps(props, ["as", "view", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getNextTriggerProps({ view: local.view })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-7 p-0",
            local.class
          )}
        />
      )
    },
    PrevTrigger(props: DynamicAsProps<"button", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getPrevTriggerProps({ view: local.view })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 size-7 p-0",
            local.class
          )}
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
      const [local, rest] = splitProps(props, ["as", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getTriggerProps()}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 absolute right-1 size-7 p-0",
            local.class
          )}
        />
      )
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
      const [local, rest] = splitProps(props, ["as", "view", "class"])
      return (
        <Dynamic
          component={local.as ?? "button"}
          {...api().getViewTriggerProps({ view: local.view })}
          {...rest}
          class={cn(
            /* styled */ "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2 h-7 px-2",
            local.class
          )}
        />
      )
    },
    ViewControl(props: DynamicAsProps<"div", zag.ViewProps>) {
      const [local, rest] = splitProps(props, ["as", "view", "class"])
      return (
        <Dynamic
          component={local.as ?? "div"}
          {...api().getViewControlProps({ view: local.view })}
          {...rest}
          class={cn(/* styled */ "flex items-center justify-between gap-2 mb-2", local.class)}
        />
      )
    },
    Input(props: DynamicAsProps<"input", zag.InputProps>) {
      const [local, rest] = splitProps(props, ["as", "index", "fixOnBlur", "class"])
      return (
        <Dynamic
          component={local.as ?? "input"}
          {...api().getInputProps({
            index: local.index,
            fixOnBlur: local.fixOnBlur,
          })}
          {...rest}
          class={cn(
            /* styled */ "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground pr-10",
            local.class
          )}
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
