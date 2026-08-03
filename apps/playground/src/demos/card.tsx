import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@solid-reusable/ui"

export default function CardDemo() {
  return (
    <Card class="max-w-sm">
      <CardHeader>
        <CardTitle>Card title</CardTitle>
        <CardDescription>Short supporting copy.</CardDescription>
      </CardHeader>
      <CardContent>Body content lives here.</CardContent>
      <CardFooter>
        <Button>Action</Button>
      </CardFooter>
    </Card>
  )
}
