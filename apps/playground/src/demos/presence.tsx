import { createPresence } from "@solid-reusable/ui"
import { createSignal, Show } from "solid-js"

export default function PresenceDemo() {
  const [present, setPresent] = createSignal(true)
  const presence = createPresence({ present: present() })
  return (
    <div style={{ display: "grid", gap: "0.5rem" }}>
      <button type="button" onClick={() => setPresent((v) => !v)}>Toggle present ({String(present())})</button>
      <p class="muted">API present={String(presence.api.present)} · skip={String(presence.api.skip)}</p>
      <Show when={presence.api.present}>
        <div style={{ padding: "0.75rem", border: "1px solid var(--line)", "border-radius": "0.45rem" }}>Present node</div>
      </Show>
    </div>
  )
}
