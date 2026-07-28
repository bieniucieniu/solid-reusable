import { Button } from "@solid-reusable/ui"

export default function ButtonDemo() {
  return (
    <div class="flex flex-wrap gap-2">
      <Button class="demo-btn">Default</Button>
      <Button class="demo-btn" variant="outline">
        Outline
      </Button>
      <Button class="demo-btn" variant="ghost">
        Ghost
      </Button>
      <Button class="demo-btn" variant="destructive">
        Destructive
      </Button>
    </div>
  )
}
