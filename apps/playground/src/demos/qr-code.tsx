import { createQrCode } from "@solid-reusable/ui"

export default function QrCodeDemo() {
  const qr = createQrCode({ value: "https://zagjs.com" })
  return (
    <qr.Root style={{ width: "10rem" }}>
      <qr.Frame style={{ width: "100%", height: "auto", background: "white" }}>
        <qr.Pattern />
      </qr.Frame>
    </qr.Root>
  )
}
