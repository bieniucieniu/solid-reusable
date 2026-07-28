import { createDatePicker } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function DatePickerDemo() {
  const picker = createDatePicker({ selectionMode: "single" })
  return (
    <picker.Root class="grid max-w-xs gap-2">
      <picker.Label class="text-sm font-medium">Date</picker.Label>
      <picker.Control class="flex gap-1.5">
        <picker.Input index={0} class="demo-input flex-1" />
        <picker.Trigger class="demo-btn px-2">📅</picker.Trigger>
      </picker.Control>
      <picker.Content class="demo-popover">
        <picker.View view="day">
          <picker.ViewControl class="mb-2 flex items-center justify-between">
            <picker.PrevTrigger class="demo-btn px-2">‹</picker.PrevTrigger>
            <picker.ViewTrigger class="text-sm font-medium">
              <picker.RangeText />
            </picker.ViewTrigger>
            <picker.NextTrigger class="demo-btn px-2">›</picker.NextTrigger>
          </picker.ViewControl>
          <picker.Table class="w-full text-center text-sm">
            <picker.TableHead>
              <picker.TableRow>
                <Index each={picker.api.weekDays}>
                  {(d) => (
                    <picker.TableHeader class="text-mute p-1 text-xs">{d().short}</picker.TableHeader>
                  )}
                </Index>
              </picker.TableRow>
            </picker.TableHead>
            <picker.TableBody>
              <Index each={picker.api.weeks}>
                {(week) => (
                  <picker.TableRow>
                    <Index each={week()}>
                      {(day) => (
                        <picker.DayTableCell value={day()}>
                          <picker.DayTableCellTrigger
                            value={day()}
                            class="demo-btn size-8 border-0 p-0"
                          >
                            {day().day}
                          </picker.DayTableCellTrigger>
                        </picker.DayTableCell>
                      )}
                    </Index>
                  </picker.TableRow>
                )}
              </Index>
            </picker.TableBody>
          </picker.Table>
        </picker.View>
      </picker.Content>
    </picker.Root>
  )
}
