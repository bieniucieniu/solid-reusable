import { createCarousel } from "@solid-reusable/ui"
import { ChevronLeft, ChevronRight } from "lucide-solid"
import { Index } from "solid-js"

const slides = ["One", "Two", "Three"]

export default function CarouselDemo() {
  const carousel = createCarousel({ slideCount: slides.length })
  return (
    <carousel.Root class="max-w-sm">
      <carousel.ItemGroup class="rounded-lg border">
        <Index each={slides}>
          {(slide, i) => (
            <carousel.Item
              index={i}
              classList={{
                "bg-muted p-8 text-center text-sm": true,
                "bg-muted/70": i % 2 === 1,
              }}
            >
              Slide {slide()}
            </carousel.Item>
          )}
        </Index>
      </carousel.ItemGroup>
      <carousel.PrevTrigger>
        <ChevronLeft />
      </carousel.PrevTrigger>
      <carousel.NextTrigger>
        <ChevronRight />
      </carousel.NextTrigger>
      <carousel.IndicatorGroup>
        <Index each={slides}>{(_, i) => <carousel.Indicator index={i} />}</Index>
      </carousel.IndicatorGroup>
    </carousel.Root>
  )
}
