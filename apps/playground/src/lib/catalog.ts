export type CatalogItem = {
  name: string
  title: string
  kind: "plain" | "zag"
}

function titleCase(name: string) {
  return name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

const PLAIN = [
  "aspect-ratio",
  "badge",
  "button",
  "card",
  "kbd",
  "label",
  "separator",
  "skeleton",
  "spinner",
] as const

const ZAG = [
  "accordion",
  "angle-slider",
  "async-list",
  "avatar",
  "carousel",
  "cascade-select",
  "checkbox",
  "clipboard",
  "collapsible",
  "color-picker",
  "combobox",
  "date-input",
  "date-picker",
  "dialog",
  "drawer",
  "editable",
  "file-upload",
  "floating-panel",
  "hover-card",
  "image-cropper",
  "listbox",
  "marquee",
  "menu",
  "navigation-menu",
  "number-input",
  "pagination",
  "password-input",
  "pin-input",
  "popover",
  "presence",
  "progress",
  "qr-code",
  "radio-group",
  "rating-group",
  "scroll-area",
  "select",
  "signature-pad",
  "slider",
  "splitter",
  "steps",
  "switch",
  "tabs",
  "tags-input",
  "timer",
  "toast",
  "toc",
  "toggle",
  "toggle-group",
  "tooltip",
  "tour",
  "tree-view",
] as const

export const CATALOG: CatalogItem[] = [
  ...PLAIN.map((name) => ({ name, title: titleCase(name), kind: "plain" as const })),
  ...ZAG.map((name) => ({ name, title: titleCase(name), kind: "zag" as const })),
]

export const plainItems = CATALOG.filter((c) => c.kind === "plain")
export const zagItems = CATALOG.filter((c) => c.kind === "zag")
