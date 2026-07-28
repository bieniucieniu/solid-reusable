import {
  Button,
  Badge,
  Separator,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  createTooltip,
  createDialog,
} from "@solid-reusable/ui"
import { Show, type Component } from "solid-js"

function TooltipDemo() {
  const tooltip = createTooltip()

  const Body: Component = () => {
    const api = tooltip.useApi()
    return (
      <>
        <tooltip.Trigger>Hover me</tooltip.Trigger>
        <Show when={api().open}>
          <tooltip.Positioner>
            <tooltip.Content>Unstyled tooltip content</tooltip.Content>
          </tooltip.Positioner>
        </Show>
      </>
    )
  }

  return (
    <tooltip.Root>
      <Body />
    </tooltip.Root>
  )
}

function DialogDemo() {
  const dialog = createDialog()

  const Body: Component = () => {
    const api = dialog.useApi()
    return (
      <>
        <dialog.Trigger>Open dialog</dialog.Trigger>
        <Show when={api().open}>
          <dialog.Backdrop />
          <dialog.Positioner>
            <dialog.Content>
              <dialog.Title>Edit profile</dialog.Title>
              <dialog.Description>Unstyled dialog placeholder.</dialog.Description>
              <dialog.CloseTrigger>Close</dialog.CloseTrigger>
            </dialog.Content>
          </dialog.Positioner>
        </Show>
      </>
    )
  }

  return (
    <dialog.Root>
      <Body />
    </dialog.Root>
  )
}

export default function App() {
  return (
    <main style={{ padding: "2rem", display: "grid", gap: "2rem", "max-width": "40rem" }}>
      <header>
        <h1>solid-reusable</h1>
        <p>Zag compounds + plain presentational. Tailwind v4 loaded; comps unstyled.</p>
      </header>

      <section style={{ display: "flex", gap: "0.75rem", "align-items": "center" }}>
        <Button>Plain Button</Button>
        <Badge>Badge</Badge>
      </section>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Tooltip (createTooltip)</CardTitle>
        </CardHeader>
        <CardContent>
          <TooltipDemo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dialog (createDialog)</CardTitle>
        </CardHeader>
        <CardContent>
          <DialogDemo />
        </CardContent>
      </Card>
    </main>
  )
}
