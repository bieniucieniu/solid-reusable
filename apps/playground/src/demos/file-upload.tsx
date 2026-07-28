import { createFileUpload } from "@solid-reusable/ui"
import { For } from "solid-js"

export default function FileUploadDemo() {
  const upload = createFileUpload({ maxFiles: 3 })
  return (
    <upload.Root style={{ display: "grid", gap: "0.5rem", "max-width": "22rem" }}>
      <upload.Label>Upload</upload.Label>
      <upload.Dropzone style={{ border: "1px dashed var(--line)", padding: "1rem", "border-radius": "0.5rem", "text-align": "center" }}>
        Drop files or
        <upload.Trigger style={{ "margin-left": "0.35rem" }}>browse</upload.Trigger>
      </upload.Dropzone>
      <upload.ItemGroup>
        <For each={upload.api.acceptedFiles}>
          {(file) => (
            <upload.Item file={file} style={{ display: "flex", "justify-content": "space-between", gap: "0.5rem" }}>
              <upload.ItemName file={file}>{file.name}</upload.ItemName>
              <upload.ItemDeleteTrigger file={file}>Remove</upload.ItemDeleteTrigger>
            </upload.Item>
          )}
        </For>
      </upload.ItemGroup>
      <upload.HiddenInput />
    </upload.Root>
  )
}
