import { createCarousel } from "@solid-reusable/ui"
import { Index } from "solid-js"

const slides = ["One", "Two", "Three"]

export default function CarouselDemo() {
  const carousel = createCarousel({ slideCount: slides.length })
  return (
    <carousel.Root style={{ "max-width": "22rem", display: "grid", gap: "0.5rem" }}>
      <carousel.Control style={{ display: "flex", gap: "0.35rem" }}>
        <carousel.PrevTrigger>Prev</carousel.PrevTrigger>
        <carousel.NextTrigger>Next</carousel.NextTrigger>
      </carousel.Control>
      <carousel.ItemGroup
        style={{
          display: "grid",
          "border-radius": "0.5rem",
          overflow: "hidden",
          border: "1px solid var(--line)",
        }}
      >
        <Index each={slides}>
          {(slide, i) => (
            <carousel.Item
              index={i}
              style={{
                padding: "2rem",
                "text-align": "center",
                background: i % 2 ? "#fafaf9" : "#f5f5f4",
              }}
            >
              Slide {slide()}
            </carousel.Item>
          )}
        </Index>
      </carousel.ItemGroup>
      <carousel.IndicatorGroup
        style={{ display: "flex", gap: "0.35rem", "justify-content": "center" }}
      >
        <Index each={slides}>
          {( _, i) => (
            <carousel.Indicator
              index={i}
              style={{
                width: "0.5rem",
                height: "0.5rem",
                "border-radius": "999px",
                background: "var(--line)",
              }}
            />
          )}
        </Index>
      </carousel.IndicatorGroup>
    </carousel.Root>
  )
}
