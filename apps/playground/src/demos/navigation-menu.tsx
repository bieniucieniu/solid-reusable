import { createNavigationMenu } from "@solid-reusable/ui"

export default function NavigationMenuDemo() {
  const nav = createNavigationMenu()
  return (
    <nav.Root class="flex items-center gap-2">
      <nav.List class="m-0 flex list-none gap-1.5 p-0">
        <nav.Item value="products">
          <nav.Trigger value="products" class="demo-btn">
            Products
          </nav.Trigger>
          <nav.Content value="products" class="demo-popover absolute mt-1.5 text-sm">
            Product links go here.
          </nav.Content>
        </nav.Item>
        <nav.Item value="docs">
          <nav.Link value="docs" href="#" class="demo-btn">
            Docs
          </nav.Link>
        </nav.Item>
      </nav.List>
    </nav.Root>
  )
}
