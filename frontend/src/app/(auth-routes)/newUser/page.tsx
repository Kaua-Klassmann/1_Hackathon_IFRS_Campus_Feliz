"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import createUser from "@/services/createUser";
import { Toaster, toast } from "sonner";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import getSkills from "@/services/getSkills";

interface ErrorItem {
    field: string | number;
    message: string;
}

export default function Page(){   

    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cep, setCep] = useState("")  
    const [senha, setSenha] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [terms, setTerms] = useState(false)

    const [errorsUsername, seterrorsUsername] = useState<ErrorItem[]>([]);
    const [errorsEmail, seterrorsEmail] = useState<ErrorItem[]>([]);
    const [errorsPassword, setErrorsPassword] = useState<ErrorItem[]>([]); 
    const [errorsPasswordMatch, seterrorsPasswordMatch] = useState("");

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [skills, setSkills] = useState([])
    let habilidades: number[] = []

    const router = useRouter()

    function redirectUser(){
        toast.success("User created successfully")
        router.replace("/login")
    }

    function changeTerms(){
        setTerms(!terms)
    }

    function passwordMatch(){
        if(senha != passwordCheck){
            seterrorsPasswordMatch("Passwords do not match")
        } else {
            seterrorsPasswordMatch("")
        }
    }
    
    async function handleSubmit(event: SyntheticEvent){
        event.preventDefault()
        const result = await createUser(nome, email, cep, senha, habilidades)
        if(result){
            console.log("erro")
        } else {
            setIsDialogOpen(true)
        }

    }

    async function generateSkills(){
        const skills = await getSkills()
        setSkills(skills)
    }

    return(
        <>
            <div className="w-screen h-screen flex flex-col justify-center items-center">
                <Toaster />
                <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Check your email</AlertDialogTitle>
                        <AlertDialogDescription>
                            Please check your email to verify your account.
                            Once verified, you will be able to log in.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogAction onClick={redirectUser}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Tabs defaultValue="account" className="w-[300px]">
                    <TabsList className="grid w-full grid-cols-2 mb-10">
                        <TabsTrigger value="conta">Conta</TabsTrigger>
                        <TabsTrigger value="habilidade" onClick={generateSkills}>Habilidades</TabsTrigger>
                    </TabsList>
                    <TabsContent className="flex items-center justify-center" value="conta">
                        <form className="w-full flex flex-col gap-5" onSubmit={handleSubmit}>
                            <Input type="text" placeholder="Nome Completo" value={nome} onChange={(e) => setNome(e.target.value)}></Input>
                            <>
                                {errorsUsername.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs">{error.message}</p>
                                ))}
                            </>
                            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                            <>
                                {errorsEmail.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs">{error.message}</p>
                                ))}
                            </>
                            <Input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)}></Input>
                            <Input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)}></Input>
                            <>
                                {errorsPassword.map((error, index) => (
                                    <p key={index} className="text-red-500 text-xs">{error.message}</p>
                                ))}
                            </>
                            <Input type="password" placeholder="Confirmar Senha" value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} onKeyUp={passwordMatch}></Input>
                            <>
                                <p className="text-red-500 text-xs">{errorsPasswordMatch}</p>
                            </>
                            <div className="flex gap-4">
                                <Checkbox id="terms" onClick={changeTerms}/>
                                <div className="grid gap-1.5 leading-none">
                                    <label
                                    htmlFor="terms1"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                    Accept terms and conditions
                                    </label>
                                    <p className="text-sm text-muted-foreground">
                                    You agree to our Terms of<br />Service and Privacy Policy.
                                    </p>
                                </div>
                            </div>
                            <Button type="submit">Criar Conta</Button>
                        </form>
                    </TabsContent>
                    <TabsContent className="flex items-center justify-center" value="habilidade">
                        <div className="flex flex-col gap-4">
                            {skills.map(({ id, nome }) => (
                                <div className="flex gap-4">
                                    <Checkbox key={id} onClick={() => habilidades.push(id)} />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                        htmlFor="terms1"
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                        {nome}
                                        </label>
                                        <p className="text-sm text-muted-foreground">
                                        You agree to our Terms of<br />Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}