import { createFileUpload } from "@solid-reusable/ui"
import { X } from "lucide-solid"
import { For } from "solid-js"

export default function FileUploadDemo() {
  const upload = createFileUpload({ maxFiles: 3 })
  return (
    <upload.Root class="max-w-sm">
      <upload.Label>Upload</upload.Label>
      <upload.Dropzone>
        Drop files or <upload.Trigger class="ml-1.5">browse</upload.Trigger>
      </upload.Dropzone>
      <upload.ItemGroup>
        <For each={upload.api.acceptedFiles}>
          {(file) => (
            <upload.Item file={file}>
              <upload.ItemName file={file}>{file.name}</upload.ItemName>
              <upload.ItemDeleteTrigger file={file}>
                <X />
              </upload.ItemDeleteTrigger>
            </upload.Item>
          )}
        </For>
      </upload.ItemGroup>
      <upload.HiddenInput />
    </upload.Root>
  )
}
