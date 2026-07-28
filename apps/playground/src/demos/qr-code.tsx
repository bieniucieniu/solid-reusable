import { createQrCode } from "@solid-reusable/ui"

export default function QrCodeDemo() {
  const qr = createQrCode({ value: "https://zagjs.com" })
  return (
    <qr.Root class="w-40">
      <qr.Frame class="h-auto w-full bg-white">
        <qr.Pattern />
      </qr.Frame>
    </qr.Root>
  )
}
