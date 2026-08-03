import { createTabs } from "@solid-reusable/ui"

export default function TabsDemo() {
  const tabs = createTabs({ defaultValue: "one" })
  return (
    <tabs.Root class="max-w-md">
      <tabs.List>
        <tabs.Trigger value="one">Account</tabs.Trigger>
        <tabs.Trigger value="two">Password</tabs.Trigger>
        <tabs.Indicator />
      </tabs.List>
      <tabs.Content value="one">Account settings panel.</tabs.Content>
      <tabs.Content value="two">Password settings panel.</tabs.Content>
    </tabs.Root>
  )
}
