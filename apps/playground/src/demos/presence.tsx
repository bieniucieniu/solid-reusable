import { createPresence } from "@solid-reusable/ui"
import { createSignal, Show } from "solid-js"

export default function PresenceDemo() {
  const [present, setPresent] = createSignal(true)
  const presence = createPresence({ present: present() })
  return (
    <div class="grid gap-2">
      <button type="button" class="demo-btn w-fit" onClick={() => setPresent((v) => !v)}>
        Toggle present ({String(present())})
      </button>
      <p class="text-mute text-sm">
        API present={String(presence.api.present)} · skip={String(presence.api.skip)}
      </p>
      <Show when={presence.api.present}>
        <div class="rounded-lg border border-line p-3 text-sm">Present node</div>
      </Show>
    </div>
  )
}
