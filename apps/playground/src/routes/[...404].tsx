import { A } from "@solidjs/router"

export default function NotFound() {
  return (
    <main class="grid gap-3">
      <h1 class="font-display text-2xl font-semibold">404</h1>
      <p class="text-muted-foreground">Page not found.</p>
      <A href="/" class="text-primary text-sm underline-offset-2 hover:underline">
        Back to demos
      </A>
    </main>
  )
}
