import { createDatePicker } from "@solid-reusable/ui"
import { Calendar, ChevronLeft, ChevronRight } from "lucide-solid"
import { Index } from "solid-js"

export default function DatePickerDemo() {
  const picker = createDatePicker({ selectionMode: "single" })
  return (
    <picker.Root class="max-w-xs">
      <picker.Label>Date</picker.Label>
      <picker.Control>
        <picker.Input index={0} />
        <picker.Trigger>
          <Calendar />
        </picker.Trigger>
      </picker.Control>
      <picker.Content>
        <picker.View view="day">
          <picker.ViewControl>
            <picker.PrevTrigger>
              <ChevronLeft />
            </picker.PrevTrigger>
            <picker.ViewTrigger>
              <picker.RangeText />
            </picker.ViewTrigger>
            <picker.NextTrigger>
              <ChevronRight />
            </picker.NextTrigger>
          </picker.ViewControl>
          <picker.Table>
            <picker.TableHead>
              <picker.TableRow>
                <Index each={picker.api.weekDays}>
                  {(d) => <picker.TableHeader>{d().short}</picker.TableHeader>}
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
                          <picker.DayTableCellTrigger value={day()} class="size-8 p-0 text-sm">
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
