import { createEditable } from "@solid-reusable/ui"

export default function EditableDemo() {
  const editable = createEditable({ defaultValue: "Click to edit" })
  return (
    <editable.Root class="grid max-w-xs gap-1.5">
      <editable.Label class="text-sm font-medium">Name</editable.Label>
      <editable.Area>
        <editable.Input class="w-full" />
        <editable.Preview class="rounded-md border border-dashed border-line px-2.5 py-1.5 text-sm" />
      </editable.Area>
      <editable.Control class="flex gap-1.5">
        <editable.EditTrigger>Edit</editable.EditTrigger>
        <editable.SubmitTrigger>Save</editable.SubmitTrigger>
        <editable.CancelTrigger>Cancel</editable.CancelTrigger>
      </editable.Control>
    </editable.Root>
  )
}
