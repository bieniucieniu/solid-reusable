import { createFileUpload } from "@solid-reusable/ui"
import { For } from "solid-js"

export default function FileUploadDemo() {
  const upload = createFileUpload({ maxFiles: 3 })
  return (
    <upload.Root class="grid max-w-sm gap-2">
      <upload.Label class="text-sm font-medium">Upload</upload.Label>
      <upload.Dropzone class="rounded-lg border border-dashed border-line p-4 text-center text-sm">
        Drop files or
        <upload.Trigger class="ml-1.5">browse</upload.Trigger>
      </upload.Dropzone>
      <upload.ItemGroup class="grid gap-1">
        <For each={upload.api.acceptedFiles}>
          {(file) => (
            <upload.Item file={file} class="flex items-center justify-between gap-2 text-sm">
              <upload.ItemName file={file}>{file.name}</upload.ItemName>
              <upload.ItemDeleteTrigger file={file} class="px-2 text-xs">
                Remove
              </upload.ItemDeleteTrigger>
            </upload.Item>
          )}
        </For>
      </upload.ItemGroup>
      <upload.HiddenInput />
    </upload.Root>
  )
}
