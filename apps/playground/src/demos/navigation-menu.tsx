import { createNavigationMenu } from "@solid-reusable/ui"

export default function NavigationMenuDemo() {
  const nav = createNavigationMenu()
  return (
    <nav.Root>
      <nav.List>
        <nav.Item value="products">
          <nav.Trigger value="products">Products</nav.Trigger>
          <nav.Content value="products" class="absolute mt-1.5 text-sm">
            Product links go here.
          </nav.Content>
        </nav.Item>
        <nav.Item value="docs">
          <nav.Link value="docs" href="#">
            Docs
          </nav.Link>
        </nav.Item>
      </nav.List>
    </nav.Root>
  )
}
