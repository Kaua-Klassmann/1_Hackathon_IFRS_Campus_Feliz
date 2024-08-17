import MapPage from "@/components/map_components/map/Map";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function HeaderPublic(){
    return(
        <>
            <div className="w-screen h-20 flex items-center justify-around p-6 bg-white fixed z-50">
                <div className="flex items-center gap-16">
                    <h1 className="text-lg font-bold">LOGO</h1>
                    <NavigationMenu>
                        <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Motivação</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-5">
                                <Link href={"/motivacao"}>Motivação</Link>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Documentação</NavigationMenuTrigger>
                            <NavigationMenuContent className="p-5">
                                <Link href={"/documentacao"}>Documentação</Link>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Contato</NavigationMenuTrigger>
                            <NavigationMenuContent>
                            <NavigationMenuLink>Link</NavigationMenuLink>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>
                <div className="flex items-center justify-center gap-3">
                <Button asChild variant={"outline"}>
                    <Link href={"/newUser"}>Criar Conta</Link>
                </Button>
                <Button asChild>
                    <Link href={"/login"}>Entrar</Link>
                </Button>
                </div>
            </div>
        </>
    )
}