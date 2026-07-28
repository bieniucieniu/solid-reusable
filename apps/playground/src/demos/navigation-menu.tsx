import { createNavigationMenu } from "@solid-reusable/ui"

export default function NavigationMenuDemo() {
  const nav = createNavigationMenu()
  return (
    <nav.Root style={{ display: "flex", gap: "0.5rem", "align-items": "center" }}>
      <nav.List
        style={{
          display: "flex",
          gap: "0.35rem",
          "list-style": "none",
          margin: 0,
          padding: 0,
        }}
      >
        <nav.Item value="products">
          <nav.Trigger value="products">Products</nav.Trigger>
          <nav.Content
            value="products"
            style={{
              position: "absolute",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              padding: "0.75rem",
              "border-radius": "0.45rem",
              "margin-top": "0.35rem",
            }}
          >
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
