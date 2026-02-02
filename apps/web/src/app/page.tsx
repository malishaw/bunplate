import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex items-center justify-center gap-3">
      <h2 className="font-semibold text-foreground">bunplate.</h2>
      <Button asChild>
        <Link href={"/tasks"}>Demo tasks api</Link>
      </Button>
    </div>
  );
}
