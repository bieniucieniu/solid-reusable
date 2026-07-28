import { createEditable } from "@solid-reusable/ui"

export default function EditableDemo() {
  const editable = createEditable({ defaultValue: "Click to edit" })
  return (
    <editable.Root style={{ display: "grid", gap: "0.35rem", "max-width": "18rem" }}>
      <editable.Label>Name</editable.Label>
      <editable.Area>
        <editable.Input />
        <editable.Preview />
      </editable.Area>
      <editable.Control style={{ display: "flex", gap: "0.35rem" }}>
        <editable.EditTrigger>Edit</editable.EditTrigger>
        <editable.SubmitTrigger>Save</editable.SubmitTrigger>
        <editable.CancelTrigger>Cancel</editable.CancelTrigger>
      </editable.Control>
    </editable.Root>
  )
}
