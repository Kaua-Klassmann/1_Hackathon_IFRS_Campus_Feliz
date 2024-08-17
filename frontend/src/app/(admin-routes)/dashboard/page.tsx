import { getServerSession, Session } from "next-auth";
import { nextAuthOptions } from "@/lib/auth/nextAuthOptions";
import HeaderDashboard from "@/components/header-dashboard"


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
        </>
    );
}