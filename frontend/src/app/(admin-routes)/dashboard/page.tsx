import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "@/lib/auth/nextAuthOptions";
import HeaderDashboard from "@/components/header-dashboard"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import MapPage from "@/components/map_components/map/Map";


export default async function Page(){
    const session = await getServerSession(nextAuthOptions)
    //session?.user.username
    //session?.user.email
    //session?.user.id

    const recentPasswords = [
        {
            title: "Gmail",
            description: "1 hour ago",
        },
        {
            title: "Sicredi",
            description: "1 hour ago",
        },
        {
            title: "Apple Icloud",
            description: "2 hours ago",
        },
    ]

    return(
        <>
            <HeaderDashboard userName={session?.user.username}/>
            <div className="w-screen h-auto flex justify-center p-10">
                <div className="w-2/3 h-auto flex gap-8">
                    <div className="w-1/3 h-auto flex flex-col gap-8">
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Criar Senha</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Create</Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Criar Senha</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Create</Button>
                            </CardFooter>
                        </Card>
                    </div>
                    <div className="w-1/3 h-auto flex flex-col gap-8">
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Compartilhar</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Deploy</Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Criar Senha</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" placeholder="Name of your project" />
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="framework">Framework</Label>
                                    <Select>
                                        <SelectTrigger id="framework">
                                        <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                        <SelectContent position="popper">
                                        <SelectItem value="next">Next.js</SelectItem>
                                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                                        <SelectItem value="astro">Astro</SelectItem>
                                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    </div>
                                </div>
                                </form>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Create</Button>
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px] h-[125px]">
                            <CardHeader>
                                <CardTitle>Compartilhar</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                            </CardContent>
                            <CardFooter className="flex justify-between">

                            </CardFooter>
                        </Card>
                    </div>
                    <div className="w-1/3 h-auto flex flex-col gap-8">
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Senhas Recentes</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                            <div className="pt-3">
                                {recentPasswords.map((password, index) => (
                                    <div
                                        key={index}
                                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
                                        >
                                        <span className="flex h-2 w-2 translate-y-1 rounded-full bg-teal-500 mt-3" />
                                        <div className="space-y-1 hover:bg-zinc-50 p-1 rounded flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium leading-none">
                                                {password.title}
                                                </p>
                                                <p className="text-sm text-muted-foreground">
                                                {password.description}
                                                </p>
                                            </div>
                                            <Copy className="w-6 pr-2"/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                            </CardFooter>
                        </Card>
                        <Card className="w-[350px]">
                            <CardHeader>
                                <CardTitle>Cofre</CardTitle>
                                <CardDescription>Deploy your new project in one-click.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button>Abrir</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <MapPage isAdmin={true}  />

        </>
    );
}