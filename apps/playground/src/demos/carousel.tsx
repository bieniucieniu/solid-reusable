import { createCarousel } from "@solid-reusable/ui"
import { Index } from "solid-js"

const slides = ["One", "Two", "Three"]

export default function CarouselDemo() {
  const carousel = createCarousel({ slideCount: slides.length })
  return (
    <carousel.Root class="grid max-w-sm gap-2">
      <carousel.Control class="flex gap-1.5">
        <carousel.PrevTrigger>Prev</carousel.PrevTrigger>
        <carousel.NextTrigger>Next</carousel.NextTrigger>
      </carousel.Control>
      <carousel.ItemGroup class="overflow-hidden rounded-lg border border-line">
        <Index each={slides}>
          {(slide, i) => (
            <carousel.Item
              index={i}
              classList={{
                "bg-stone-50 p-8 text-center text-sm": true,
                "bg-stone-100": i % 2 === 1,
              }}
            >
              Slide {slide()}
            </carousel.Item>
          )}
        </Index>
      </carousel.ItemGroup>
      <carousel.IndicatorGroup class="flex justify-center gap-1.5">
        <Index each={slides}>
          {(_, i) => <carousel.Indicator index={i} class="size-2 rounded-full bg-line" />}
        </Index>
      </carousel.IndicatorGroup>
    </carousel.Root>
  )
}
