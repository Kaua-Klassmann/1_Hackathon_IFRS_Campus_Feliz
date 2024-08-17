"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";

export default function Page(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const router = useRouter()
    
    async function handleSubmit(event: SyntheticEvent){
        event.preventDefault()

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        })

        if(result!.ok){
            router.replace("/dashboard")
        }
    }

    return(
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <form className="w-72 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></Input>
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Input>
                    <Button type="submit">Enviar</Button>
                </form>
            </div>
        </>
    )
}