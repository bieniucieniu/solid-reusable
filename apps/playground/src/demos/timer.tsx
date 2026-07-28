import { createTimer } from "@solid-reusable/ui"

export default function TimerDemo() {
  const timer = createTimer({ countdown: true, startMs: 60_000, autoStart: true })
  return (
    <timer.Root style={{ display: "grid", gap: "0.5rem", "max-width": "14rem" }}>
      <timer.Area style={{ "font-variant-numeric": "tabular-nums", "font-size": "1.4rem" }}>
        <timer.Item type="minutes">
          <timer.ItemValue type="minutes" />
        </timer.Item>
        <timer.Separator>:</timer.Separator>
        <timer.Item type="seconds">
          <timer.ItemValue type="seconds" />
        </timer.Item>
      </timer.Area>
      <timer.Control style={{ display: "flex", gap: "0.35rem" }}>
        <timer.ActionTrigger action="start">Start</timer.ActionTrigger>
        <timer.ActionTrigger action="pause">Pause</timer.ActionTrigger>
        <timer.ActionTrigger action="reset">Reset</timer.ActionTrigger>
      </timer.Control>
    </timer.Root>
  )
}
