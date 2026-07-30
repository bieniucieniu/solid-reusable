import { createTimer } from "@solid-reusable/ui"

export default function TimerDemo() {
  const timer = createTimer({ countdown: true, startMs: 60_000, autoStart: true })
  return (
    <timer.Root class="grid max-w-xs gap-2">
      <timer.Area class="font-display text-2xl tabular-nums">
        <timer.Item type="minutes">
          <timer.ItemValue type="minutes" />
        </timer.Item>
        <timer.Separator>:</timer.Separator>
        <timer.Item type="seconds">
          <timer.ItemValue type="seconds" />
        </timer.Item>
      </timer.Area>
      <timer.Control class="flex gap-1.5">
        <timer.ActionTrigger action="start" class="demo-btn">
          Start
        </timer.ActionTrigger>
        <timer.ActionTrigger action="pause" class="demo-btn">
          Pause
        </timer.ActionTrigger>
        <timer.ActionTrigger action="reset" class="demo-btn">
          Reset
        </timer.ActionTrigger>
      </timer.Control>
    </timer.Root>
  )
}
