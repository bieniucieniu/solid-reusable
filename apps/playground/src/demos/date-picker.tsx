import { createDatePicker } from "@solid-reusable/ui"
import { Index } from "solid-js"

export default function DatePickerDemo() {
  const picker = createDatePicker({ selectionMode: "single" })
  return (
    <picker.Root style={{ display: "grid", gap: "0.5rem", "max-width": "18rem" }}>
      <picker.Label>Date</picker.Label>
      <picker.Control style={{ display: "flex", gap: "0.35rem" }}>
        <picker.Input index={0} />
        <picker.Trigger>📅</picker.Trigger>
      </picker.Control>
      <picker.Content
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          padding: "0.75rem",
          "border-radius": "0.5rem",
        }}
      >
        <picker.View view="day">
          <picker.ViewControl
            style={{
              display: "flex",
              "justify-content": "space-between",
              "margin-bottom": "0.5rem",
            }}
          >
            <picker.PrevTrigger>‹</picker.PrevTrigger>
            <picker.ViewTrigger>
              <picker.RangeText />
            </picker.ViewTrigger>
            <picker.NextTrigger>›</picker.NextTrigger>
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
                          <picker.DayTableCellTrigger value={day()}>
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
