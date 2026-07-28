import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Button,
} from "@solid-reusable/ui"

export default function CardDemo() {
  return (
    <Card style={{ "max-width": "22rem" }}>
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
