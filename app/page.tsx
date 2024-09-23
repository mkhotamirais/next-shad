import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="py-32">
      <div className="container flex items-center justify-center">
        <div className="flex flex-col justify-center items-center space-y-4">
          <h1>Welcome</h1>
          <p>Description</p>
          <Button size={"lg"}>Action</Button>
        </div>
      </div>
    </section>
  );
}
