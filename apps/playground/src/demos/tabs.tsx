import { createTabs } from "@solid-reusable/ui"

export default function TabsDemo() {
  const tabs = createTabs({ defaultValue: "one" })
  return (
    <tabs.Root style={{ "max-width": "28rem" }}>
      <tabs.List style={{ display: "flex", gap: "0.35rem", "border-bottom": "1px solid var(--line)", "margin-bottom": "0.75rem" }}>
        <tabs.Trigger value="one">Account</tabs.Trigger>
        <tabs.Trigger value="two">Password</tabs.Trigger>
        <tabs.Indicator />
      </tabs.List>
      <tabs.Content value="one">Account settings panel.</tabs.Content>
      <tabs.Content value="two">Password settings panel.</tabs.Content>
    </tabs.Root>
  )
}
