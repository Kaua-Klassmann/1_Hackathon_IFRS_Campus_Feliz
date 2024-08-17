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

export default function Home() {
  return(
    <>
      <div className="w-screen h-20 flex items-center justify-around p-6 bg-white fixed">
        <div className="flex items-center gap-16">
          <h1 className="text-lg font-bold">LOGO</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Motivação</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Documentação</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink>Link</NavigationMenuLink>
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
        <MapPage isAdmin={true}  />
      </div>
      <div className="w-screen flex flex-col items-center gap-3 p-14 pt-24">
        <p className="text-3xl font-bold">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
        <p className="w-[700px] font-medium text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse, fuga id. Ipsum optio amet veritatis maxime placeat architecto ea minima tempora.</p>
      </div>
      <div className="w-full flex items-center justify-center gap-28">
        <div className="w-[400px] h-[400px] bg-black rounded-md"></div>
        <div className="flex flex-col gap-3">
          <p className="text-2xl font-bold">Lorem ipsum dolor</p>
          <p className="w-96 font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, nemo accusantium. Et, voluptas. Ab veniam repellendus explicabo, cumque vel animi unde molestiae numquam quasi cum architecto vitae, est iure quam similique consectetur, incidunt maiores sapiente id expedita vero veritatis nisi provident. Dolorem tenetur ipsum natus ipsa repellat quam exercitationem aut?</p>
        </div>
      </div>
      <div className="w-screen h-[250px] bg-black mt-24 mb-24 p-16 pl-32 flex flex-col gap-3">
        <p className="text-2xl font-bold text-white">Lorem ipsum dolor</p>
        <p className="w-[600px] font-medium text-white">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut molestias ullam cumque architecto odio sint, minus fugit, corporis voluptatem accusantium, doloribus iusto voluptas esse dicta harum culpa necessitatibus?</p>
      </div>
    </>
  );
}