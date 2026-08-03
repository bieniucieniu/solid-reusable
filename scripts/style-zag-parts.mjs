/**
 * Apply New York–style default classes to Zag compound parts.
 * Run: node scripts/style-zag-parts.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const uiDir = join(root, "registry/warsaw/ui")

const BTN =
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50 h-9 px-4 py-2"
const INPUT =
  "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-muted-foreground"
const OVERLAY =
  "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
const POPOVER =
  "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
const MENU_CONTENT =
  "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
const MENU_ITEM =
  "relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
const LABEL =
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"

/** @type {Record<string, Record<string, string>>} */
const STYLES = {
  accordion: {
    Root: "w-full",
    Item: "border-b last:border-b-0",
    ItemTrigger:
      "flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 w-full",
    ItemContent:
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4",
    ItemIndicator:
      "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200 data-[state=open]:rotate-180",
  },
  checkbox: {
    Root: "flex items-center gap-2",
    Label: LABEL,
    Control:
      "peer size-4 shrink-0 rounded-[4px] border border-input shadow-xs transition-shadow outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-primary data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:bg-input/30",
    Indicator: "grid place-content-center text-current [&_svg]:size-3.5",
  },
  switch: {
    Root: "inline-flex items-center gap-2",
    Label: LABEL,
    Control:
      "peer inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80",
    Thumb:
      "pointer-events-none block size-4 rounded-full bg-background ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0 dark:data-[state=checked]:bg-primary-foreground",
  },
  slider: {
    Root: "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
    Label: LABEL,
    Control: "relative flex w-full items-center",
    Track:
      "relative grow overflow-hidden rounded-full bg-muted data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
    Range:
      "absolute bg-primary data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full",
    Thumb:
      "block size-4 shrink-0 rounded-full border border-primary bg-white shadow-sm ring-ring/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
    ValueText: "text-sm text-muted-foreground",
  },
  tabs: {
    Root: "flex flex-col gap-2",
    List: "bg-muted text-muted-foreground inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
    Trigger:
      "inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all outline-none hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[selected]:bg-background data-[selected]:text-foreground data-[selected]:shadow-sm dark:data-[selected]:border-input dark:data-[selected]:bg-input/30",
    Content: "flex-1 outline-none text-sm",
    Indicator: "absolute bottom-0 h-0.5 bg-foreground transition-all",
  },
  dialog: {
    Trigger: BTN,
    Backdrop: OVERLAY,
    Content:
      "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border bg-background p-6 shadow-lg duration-200 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:max-w-lg",
    Title: "text-lg leading-none font-semibold",
    Description: "text-sm text-muted-foreground",
    CloseTrigger: `${BTN} absolute top-4 right-4 size-8 p-0 opacity-70 hover:opacity-100`,
  },
  drawer: {
    Trigger: BTN,
    Backdrop: OVERLAY,
    Content:
      "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out inset-y-0 right-0 h-full w-3/4 border-l p-6 sm:max-w-sm",
    Title: "text-lg font-semibold",
    Description: "text-sm text-muted-foreground",
    CloseTrigger: BTN,
  },
  popover: {
    Trigger: BTN,
    Content: POPOVER,
    Title: "font-medium",
    Description: "text-muted-foreground text-sm",
    CloseTrigger: `${BTN} h-8 px-3`,
  },
  tooltip: {
    Trigger: BTN,
    Content:
      "z-50 w-fit rounded-md bg-foreground px-3 py-1.5 text-xs text-balance text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
  },
  "hover-card": {
    Trigger: "text-primary font-medium underline-offset-4 hover:underline",
    Content: POPOVER,
  },
  select: {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative",
    Trigger:
      "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-muted-foreground",
    ValueText: "line-clamp-1",
    Indicator: "size-4 opacity-50",
    ClearTrigger: "size-4 opacity-50 hover:opacity-100",
    Content: `${MENU_CONTENT} min-w-[8rem]`,
    List: "p-1 max-h-60 overflow-y-auto",
    Item: MENU_ITEM,
  },
  combobox: {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative flex items-center",
    Input: INPUT,
    Trigger: `${BTN} absolute right-1 size-7 p-0`,
    Content: MENU_CONTENT,
    Item: MENU_ITEM,
  },
  menu: {
    Trigger: BTN,
    Content: MENU_CONTENT,
    Item: MENU_ITEM,
    Separator: "-mx-1 my-1 h-px bg-border",
    ItemGroupLabel: "px-2 py-1.5 text-sm font-medium",
  },
  toggle: {
    Root: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 min-w-9 px-2 border border-input bg-transparent shadow-xs",
  },
  "toggle-group": {
    Root: "group/toggle-group flex w-fit items-center rounded-md data-[variant=outline]:shadow-xs",
    Item: "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,box-shadow] outline-none hover:bg-muted hover:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground h-9 min-w-9 px-2 border border-input bg-transparent shadow-xs first:rounded-l-md last:rounded-r-md rounded-none -ml-px first:ml-0",
  },
  avatar: {
    Root: "relative flex size-8 shrink-0 overflow-hidden rounded-full",
    Image: "aspect-square size-full",
    Fallback:
      "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground",
  },
  progress: {
    Root: "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
    Track: "h-full w-full",
    Range: "h-full w-full flex-1 bg-primary transition-all",
    Label: LABEL,
    ValueText: "text-sm text-muted-foreground",
  },
  "radio-group": {
    Root: "grid gap-3",
    Label: LABEL,
    Item: "flex items-center gap-2",
    ItemControl:
      "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50",
    ItemText: "text-sm font-medium leading-none",
    Indicator: "flex items-center justify-center [&_svg]:size-2.5",
  },
  collapsible: {
    Root: "flex flex-col gap-2",
    Trigger: `${BTN} w-fit`,
    Content:
      "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
  },
  pagination: {
    Root: "mx-auto flex w-full justify-center gap-1",
    PrevTrigger: `${BTN} gap-1 pl-2.5`,
    NextTrigger: `${BTN} gap-1 pr-2.5`,
    Item: `${BTN} size-9 p-0`,
    Ellipsis: "flex size-9 items-center justify-center",
  },
  "number-input": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative flex items-center",
    Input: `${INPUT} pr-16`,
    IncrementTrigger: `${BTN} absolute right-1 top-1 size-7 p-0`,
    DecrementTrigger: `${BTN} absolute right-8 top-1 size-7 p-0`,
  },
  "pin-input": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "flex items-center gap-2",
    Input:
      "h-9 w-9 rounded-md border border-input bg-transparent text-center text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
  },
  "password-input": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative flex items-center",
    Input: `${INPUT} pr-10`,
    VisibilityTrigger: `${BTN} absolute right-1 size-7 p-0`,
  },
  editable: {
    Root: "flex flex-col gap-1.5",
    Area: "flex items-center gap-2",
    Input: INPUT,
    Preview: "text-sm rounded-md border border-transparent px-3 py-2 hover:border-input",
    EditTrigger: `${BTN} h-8`,
    SubmitTrigger: `${BTN} h-8`,
    CancelTrigger: `${BTN} h-8`,
    Label: LABEL,
  },
  clipboard: {
    Root: "relative flex items-center gap-2",
    Input: INPUT,
    Label: LABEL,
    Control: "flex items-center gap-2",
    Trigger: BTN,
    Indicator: "text-sm text-muted-foreground",
  },
  toast: {
    Root: "pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-md border p-4 pr-6 shadow-lg transition-all bg-background text-foreground",
    Title: "text-sm font-semibold",
    Description: "text-sm opacity-90",
    CloseTrigger: `${BTN} absolute right-1 top-1 size-6 p-0 opacity-70`,
    ActionTrigger: `${BTN} h-8`,
  },
  "scroll-area": {
    Root: "relative overflow-hidden",
    Viewport: "size-full rounded-[inherit]",
    Content: "min-w-full",
    Scrollbar:
      "flex touch-none p-px transition-colors select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col",
    Thumb: "relative flex-1 rounded-full bg-border",
  },
  carousel: {
    Root: "relative w-full",
    Control: "flex items-center justify-center gap-2",
    PrevTrigger: `${BTN} size-8 p-0 absolute left-2 top-1/2 -translate-y-1/2 z-10`,
    NextTrigger: `${BTN} size-8 p-0 absolute right-2 top-1/2 -translate-y-1/2 z-10`,
    ItemGroup: "overflow-hidden",
    Item: "min-w-0 shrink-0 grow-0 basis-full",
    IndicatorGroup: "flex justify-center gap-1 mt-2",
    Indicator: "size-2 rounded-full bg-muted data-[current]:bg-primary",
  },
  listbox: {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Content:
      "max-h-60 overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
    Item: MENU_ITEM,
  },
  "tags-input": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control:
      "flex min-h-9 flex-wrap items-center gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-xs focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50",
    Item: "inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
    ItemDeleteTrigger: "size-3 opacity-70 hover:opacity-100",
    Input: "min-w-[80px] flex-1 bg-transparent outline-none placeholder:text-muted-foreground",
    ClearTrigger: `${BTN} h-8`,
  },
  steps: {
    Root: "flex flex-col gap-4",
    List: "flex items-center gap-2",
    Item: "flex items-center gap-2",
    Trigger: "inline-flex items-center gap-2 text-sm font-medium data-[complete]:text-primary",
    Indicator:
      "flex size-8 items-center justify-center rounded-full border border-input bg-background text-sm data-[complete]:border-primary data-[complete]:bg-primary data-[complete]:text-primary-foreground data-[current]:border-primary",
    Separator: "h-px flex-1 bg-border",
    Content: "text-sm",
    PrevTrigger: BTN,
    NextTrigger: BTN,
  },
  splitter: {
    Root: "flex h-[200px] w-full",
    Panel: "overflow-auto p-2",
    ResizeTrigger: "relative w-1 bg-border hover:bg-primary transition-colors",
  },
  "file-upload": {
    Root: "flex flex-col gap-2",
    Label: LABEL,
    Dropzone:
      "flex min-h-32 flex-col items-center justify-center rounded-lg border border-dashed border-input bg-muted/30 px-4 py-8 text-sm text-muted-foreground transition-colors data-[dragging]:border-primary data-[dragging]:bg-accent",
    Trigger: `${BTN} ml-1`,
    ItemGroup: "flex flex-col gap-2",
    Item: "flex items-center justify-between gap-2 rounded-md border p-2 text-sm",
    ItemName: "truncate",
    ItemSizeText: "text-muted-foreground text-xs",
    ItemDeleteTrigger: `${BTN} size-7 p-0`,
  },
  "signature-pad": {
    Root: "flex flex-col gap-2",
    Label: LABEL,
    Control: "rounded-md border border-input bg-background",
    Segment: "touch-none",
    ClearTrigger: `${BTN} w-fit`,
    Guide: "text-muted-foreground",
  },
  "rating-group": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "flex gap-1",
    Item: "size-5 text-muted-foreground data-[highlighted]:text-primary data-[checked]:text-primary cursor-pointer",
  },
  "angle-slider": {
    Root: "relative flex size-28 items-center justify-center",
    Control: "absolute inset-0",
    Thumb: "absolute size-3.5 rounded-full bg-primary shadow border border-background",
    Marker: "absolute size-1 rounded-full bg-muted-foreground",
    ValueText: "text-sm font-medium",
    Label: LABEL,
  },
  "qr-code": {
    Root: "flex flex-col gap-2 items-start",
    Frame: "rounded-md border bg-background p-2",
    Pattern: "fill-foreground",
  },
  "tree-view": {
    Root: "text-sm",
    Label: LABEL,
    Tree: "space-y-0.5",
    Item: "rounded px-1.5 py-1 hover:bg-accent",
    BranchControl: "flex items-center gap-1.5 rounded px-1.5 py-1 hover:bg-accent cursor-pointer",
    BranchTrigger: "size-4",
    BranchContent: "pl-4",
    BranchIndentGuide: "border-l border-border ml-2",
  },
  "navigation-menu": {
    Root: "relative flex max-w-max flex-1 items-center justify-center",
    List: "flex flex-1 list-none items-center gap-1",
    Trigger: `${BTN} h-9 bg-transparent`,
    Content: `${POPOVER} w-auto`,
    Link: `${BTN} h-9 bg-transparent`,
    Indicator: "top-full z-1 flex h-1.5 items-end justify-center overflow-hidden",
  },
  "date-picker": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative flex items-center",
    Input: `${INPUT} pr-10`,
    Trigger: `${BTN} absolute right-1 size-7 p-0`,
    Content: `${POPOVER} w-auto p-3`,
    ViewControl: "flex items-center justify-between gap-2 mb-2",
    PrevTrigger: `${BTN} size-7 p-0`,
    NextTrigger: `${BTN} size-7 p-0`,
    ViewTrigger: `${BTN} h-7 px-2`,
    Table: "w-full border-collapse space-y-1",
    TableHead: "w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground",
    TableRow: "mt-2 flex w-full",
    TableCell: "relative p-0 text-center text-sm",
    TableCellTrigger:
      "size-8 p-0 font-normal aria-selected:opacity-100 rounded-md hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[today]:bg-accent",
  },
  "date-input": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control:
      "inline-flex h-9 items-center rounded-md border border-input bg-transparent px-3 text-sm shadow-xs",
    Input: "w-8 bg-transparent text-center outline-none",
  },
  "color-picker": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "flex items-center gap-2",
    Trigger: "size-9 rounded-md border border-input shadow-xs",
    TransparencyGrid: "rounded-md",
    Content: `${POPOVER} w-auto`,
    Area: "h-40 rounded-md",
    AreaBackground: "rounded-md",
    AreaThumb: "size-3 rounded-full border-2 border-white shadow",
    ChannelSlider: "h-3 rounded-full",
    ChannelSliderTrack: "h-full rounded-full",
    ChannelSliderThumb: "size-3 rounded-full border-2 border-white shadow",
    ChannelInput: `${INPUT} h-8`,
    EyeDropperTrigger: `${BTN} size-8 p-0`,
    SwatchGroup: "flex flex-wrap gap-1",
    SwatchTrigger: "size-6 rounded-md border",
    Swatch: "size-full rounded-[inherit]",
  },
  "floating-panel": {
    Trigger: BTN,
    Content: "fixed z-50 w-80 rounded-lg border bg-popover text-popover-foreground shadow-lg",
    Header: "flex items-center justify-between border-b px-3 py-2",
    Title: "text-sm font-medium",
    Body: "p-3 text-sm",
    CloseTrigger: `${BTN} size-7 p-0`,
    ResizeTrigger: "absolute size-3",
  },
  "image-cropper": {
    Root: "relative overflow-hidden rounded-md border",
    Viewport: "relative",
    Image: "max-w-full",
    Selection: "border-2 border-primary",
  },
  marquee: {
    Root: "relative flex overflow-hidden",
    Content: "flex shrink-0 justify-around gap-4",
    Item: "flex items-center",
  },
  timer: {
    Root: "flex flex-col gap-2",
    Area: "flex items-center gap-1 font-mono text-2xl tabular-nums",
    Separator: "text-muted-foreground",
    Control: "flex gap-2",
    ActionTrigger: BTN,
  },
  toc: {
    Root: "relative text-sm",
    List: "space-y-1",
    Link: "text-muted-foreground hover:text-foreground data-[current]:text-foreground data-[current]:font-medium",
    Indicator: "absolute left-0 w-0.5 bg-foreground",
  },
  tour: {
    Backdrop: OVERLAY,
    Spotlight: "rounded-md",
    Content: `${POPOVER} w-72`,
    Title: "font-medium",
    Description: "text-sm text-muted-foreground",
    CloseTrigger: `${BTN} h-8`,
    ActionTrigger: `${BTN} h-8`,
  },
  "cascade-select": {
    Root: "flex flex-col gap-1.5",
    Label: LABEL,
    Control: "relative",
    Trigger:
      "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
    ValueText: "line-clamp-1",
    Content: MENU_CONTENT,
    List: "p-1",
    Item: MENU_ITEM,
  },
  "async-list": {
    Root: "flex flex-col gap-2",
  },
  presence: {
    Root: "",
  },
}

const PLAIN = new Set([
  "button",
  "badge",
  "card",
  "label",
  "separator",
  "skeleton",
  "spinner",
  "kbd",
  "aspect-ratio",
])

function ensureCnImport(src) {
  if (src.includes('from "@/registry/warsaw/lib/utils"')) return src
  const line = 'import { cn } from "@/registry/warsaw/lib/utils"'
  const imports = [...src.matchAll(/^import .+$/gm)]
  if (!imports.length) return `${line}\n${src}`
  const last = imports[imports.length - 1]
  const idx = last.index + last[0].length
  return `${src.slice(0, idx)}\n${line}${src.slice(idx)}`
}

function findPartRanges(src) {
  /** @type {{name: string, start: number, end: number}[]} */
  const parts = []
  const re = /\n    ([A-Z][A-Za-z0-9]*)\(props:/g
  let m
  while ((m = re.exec(src))) {
    parts.push({ name: m[1], start: m.index + 1, end: -1 })
  }
  for (let i = 0; i < parts.length; i++) {
    const next = parts[i + 1]?.start ?? src.search(/\n    \/\*\* Connected/) 
    const fallback = src.indexOf("\n  }\n", parts[i].start)
    parts[i].end = next > 0 ? next : fallback > 0 ? fallback : src.length
  }
  return parts
}

function stylePartBody(body, classStr) {
  if (body.includes("/* styled */")) return { body, ok: true }

  // Ensure splitProps includes "class"
  const sp = body.match(/splitProps\(props,\s*\[([^\]]*)\]\)/)
  if (!sp) return { body, ok: false, reason: "no splitProps" }

  const keys = sp[1]
    .split(",")
    .map((s) => s.trim().replace(/['"]/g, ""))
    .filter(Boolean)
  if (!keys.includes("class")) {
    keys.push("class")
    body = body.replace(
      /splitProps\(props,\s*\[[^\]]*\]\)/,
      `splitProps(props, [${keys.map((k) => `"${k}"`).join(", ")}])`,
    )
  }

  const escaped = classStr.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
  const classExpr = `class={cn(/* styled */ "${escaped}", local.class)}`

  if (!body.includes("{...rest}")) {
    return { body, ok: false, reason: "no {...rest}" }
  }

  // Prefer attaching to the Dynamic/element that has Zag props + rest (usually last {...rest})
  // If already has class= after a {...rest}, skip that occurrence.
  const restRe = /\{\.\.\.rest\}/g
  const matches = [...body.matchAll(restRe)]
  if (!matches.length) return { body, ok: false, reason: "no rest matches" }

  // Use the last {...rest} (content Dynamic inside Show/positioner)
  const last = matches[matches.length - 1]
  const afterIdx = last.index + last[0].length
  const after = body.slice(afterIdx, afterIdx + 80)
  if (/^\s*class=\{cn\(/.test(after)) {
    return { body, ok: true }
  }

  body = body.slice(0, afterIdx) + `\n          ${classExpr}` + body.slice(afterIdx)
  return { body, ok: true }
}

function processFile(name) {
  if (PLAIN.has(name)) return
  const styles = STYLES[name]
  if (!styles) {
    console.warn(`no style map: ${name}`)
    return
  }

  let src = readFileSync(join(uiDir, `${name}.tsx`), "utf8")
  if (Object.values(styles).some(Boolean)) src = ensureCnImport(src)

  const ranges = findPartRanges(src)
  // process from end so offsets stay valid
  for (let i = ranges.length - 1; i >= 0; i--) {
    const { name: part, start, end } = ranges[i]
    const cls = styles[part]
    if (!cls) continue
    const chunk = src.slice(start, end)
    const { body, ok, reason } = stylePartBody(chunk, cls)
    if (!ok) {
      console.warn(`  ${name}.${part}: ${reason}`)
      continue
    }
    src = src.slice(0, start) + body + src.slice(end)
  }

  writeFileSync(join(uiDir, `${name}.tsx`), src)
  console.log(`ok ${name}`)
}

for (const file of readdirSync(uiDir).filter((f) => f.endsWith(".tsx"))) {
  processFile(file.replace(/\.tsx$/, ""))
}
