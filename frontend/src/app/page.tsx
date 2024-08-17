import ThemeButton from "@/components/theme-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return(
    <>
      <div className="flex flex-col items-center gap-4 p-4">
        <p>Home</p>
        <ThemeButton />
        <div className="w-60 flex items-center justify-center gap-3 p-3">
          <Button asChild variant={"outline"}>
            <Link href={"/newUser"}>Create Account</Link>
          </Button>
          <Button asChild>
            <Link href={"/login"}>Login</Link>
          </Button>
        </div>
      </div>
    </>
  );
}
