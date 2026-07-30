import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@solid-reusable/ui"

export default function CardDemo() {
  return (
    <Card class="demo-panel max-w-sm">
      <CardHeader class="mb-2 grid gap-1">
        <CardTitle class="font-display text-lg font-semibold">Card title</CardTitle>
        <CardDescription class="text-mute text-sm">Short supporting copy.</CardDescription>
      </CardHeader>
      <CardContent class="text-sm">Body content lives here.</CardContent>
      <CardFooter class="mt-4">
        <Button class="demo-btn">Action</Button>
      </CardFooter>
    </Card>
  )
}
