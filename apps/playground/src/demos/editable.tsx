import { createEditable } from "@solid-reusable/ui"

export default function EditableDemo() {
  const editable = createEditable({ defaultValue: "Click to edit" })
  return (
    <editable.Root class="max-w-xs">
      <editable.Label>Name</editable.Label>
      <editable.Area>
        <editable.Input />
        <editable.Preview />
      </editable.Area>
      <editable.Control>
        <editable.EditTrigger>Edit</editable.EditTrigger>
        <editable.SubmitTrigger>Save</editable.SubmitTrigger>
        <editable.CancelTrigger>Cancel</editable.CancelTrigger>
      </editable.Control>
    </editable.Root>
  )
}
