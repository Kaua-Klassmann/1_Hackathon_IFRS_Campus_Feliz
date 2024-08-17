"use client"

import LogOutButton from "@/components/logout-button";
import ThemeButton from "@/components/theme-button";
import { useState } from "react";
import { BellRing, CalendarDays, Check } from "lucide-react"
import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface HeaderDashboardProps{
    userName: string | undefined
}

export default function HeaderDashboard({ userName }: HeaderDashboardProps){
    const [notifications, setNotifications] = useState(false)

    const notification = [
        {
            title: "Your call has been confirmed.",
            description: "1 hour ago",
        },
        {
            title: "You have a new message!",
            description: "1 hour ago",
        },
        {
            title: "Your subscription is expiring soon!",
            description: "2 hours ago",
        },
      ]

    function changeNotifications(){
        setNotifications(!notifications)
    }

    return(
        <>
            <div className="w-full flex gap-6 justify-around items-center p-6">
                <div className="flex gap-8 items-center">
                    <p className="font-bold text-2xl">Dashboard</p>
                    <Menubar className="flex w-64 justify-center">
                        <MenubarMenu>
                            <MenubarTrigger>File</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Edit</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>View</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                        <MenubarMenu>
                            <MenubarTrigger>Profiles</MenubarTrigger>
                            <MenubarContent>
                                <MenubarItem>
                                    New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                                </MenubarItem>
                                <MenubarItem>New Window</MenubarItem>
                                <MenubarSeparator />
                                    <MenubarItem>Share</MenubarItem>
                                <MenubarSeparator />
                                <MenubarItem>Print</MenubarItem>
                            </MenubarContent>
                        </MenubarMenu>
                    </Menubar>
                </div>
                <div className="flex items-center">
                    <p className="font-medium text-base pr-1">Bem vindo,</p>
                    <HoverCard>
                        <HoverCardTrigger className="font-medium text-base">{userName}</HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="flex justify-between space-x-4">
                                <Avatar>
                                    <AvatarImage src="https://github.com/GustavoGebhardt.png" />
                                    <AvatarFallback>GG</AvatarFallback>
                                </Avatar>
                                <div className="space-y-1">
                                    <h4 className="text-sm font-semibold">@nextjs</h4>
                                    <p className="text-sm">
                                    The React Framework – created and maintained by @vercel.
                                    </p>
                                    <div className="flex items-center pt-2">
                                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                                        <span className="text-xs text-muted-foreground">
                                            Joined December 2021
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                    <p className="font-medium text-base">!</p>
                </div>
                <div className="flex gap-6 items-center">
                    <Input className="w-72" placeholder="Quick search..."/>
                    <div className="flex gap-2">
                        <ThemeButton />
                        <Button variant="outline" size="icon" onClick={changeNotifications}><BellRing className="w-5"/></Button>
                        <LogOutButton />
                    </div>
                </div>
            </div>
            <Sheet open={notifications} onOpenChange={changeNotifications}>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="text-2xl font-bold">Notifications</SheetTitle>
                        <SheetDescription>
                            You have {notification.length} unread messages.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="pt-8 pb-8">
                        {notification.map((notification, index) => (
                            <div
                                key={index}
                                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                                >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button className="w-full">
                        <Check className="mr-2 h-4 w-4" /> Mark all as read
                    </Button>
                </SheetContent>
            </Sheet>
        </>
    );
}