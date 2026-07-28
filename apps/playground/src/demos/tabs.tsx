import { createTabs } from "@solid-reusable/ui"

export default function TabsDemo() {
  const tabs = createTabs({ defaultValue: "one" })
  return (
    <tabs.Root class="max-w-md">
      <tabs.List class="mb-3 flex gap-1.5 border-b border-line pb-1">
        <tabs.Trigger value="one" class="demo-btn border-0 bg-transparent">
          Account
        </tabs.Trigger>
        <tabs.Trigger value="two" class="demo-btn border-0 bg-transparent">
          Password
        </tabs.Trigger>
        <tabs.Indicator />
      </tabs.List>
      <tabs.Content value="one" class="text-sm">
        Account settings panel.
      </tabs.Content>
      <tabs.Content value="two" class="text-sm">
        Password settings panel.
      </tabs.Content>
    </tabs.Root>
  )
}
