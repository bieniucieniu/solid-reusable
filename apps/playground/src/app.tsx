import { Router } from "@solidjs/router"
import { FileRoutes } from "@solidjs/start/router"
import { Suspense } from "solid-js"
import { Shell } from "~/components/Shell"
import "./app.css"

export default function App() {
  return (
    <Router
      base={import.meta.env.SERVER_BASE_URL}
      root={(props) => (
        <Shell>
          <Suspense fallback={<p class="text-muted-foreground">Loading…</p>}>
            {props.children}
          </Suspense>
        </Shell>
      )}
    >
      <FileRoutes />
    </Router>
  )
}
