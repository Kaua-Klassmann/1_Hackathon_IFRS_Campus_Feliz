"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import createUser from "@/services/createUser";
import { Toaster, toast } from "sonner";
import { AlertDialog, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction, AlertDialogHeader, AlertDialogFooter } from '@/components/ui/alert-dialog';

interface ErrorItem {
    field: string | number;
    message: string;
}

export default function Page(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [terms, setTerms] = useState(false)

    const [errorsUsername, seterrorsUsername] = useState<ErrorItem[]>([]);
    const [errorsEmail, seterrorsEmail] = useState<ErrorItem[]>([]);
    const [errorsPassword, setErrorsPassword] = useState<ErrorItem[]>([]); 
    const [errorsPasswordMatch, seterrorsPasswordMatch] = useState("");

    const arrayErroUsername: any[] = []
    const arrayErroEmail: any[] = []
    const arrayErroPasswrod: any[] = []

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter()

    function chengeDialog(){
        setIsDialogOpen(!isDialogOpen);
    };

    function redirectUser(){
        toast.success("User created successfully")
        router.replace("/login")
    }

    function changeTerms(){
        if(terms){
            setTerms(false)
        } else {
            setTerms(true)
        }
    }

    function passwordMatch(){
        if(password != passwordCheck){
            seterrorsPasswordMatch("Passwords do not match")
        } else {
            seterrorsPasswordMatch("")
        }
    }
    
    async function handleSubmit(event: SyntheticEvent){
        event.preventDefault()

        seterrorsUsername([])
        seterrorsEmail([])
        setErrorsPassword([])

        //------------------------------------------------

        if(!terms){
            toast.error("You need to accept the terms")
        }

        if(password != passwordCheck){
            toast.error("Passwords do not match")
        }

        //------------------------------------------------

        const result = await createUser(username, email, password)

        if(result.error){
            toast.error("Please correct the errors in the form")

            for(const erro of result.error){
                switch (erro.field) {
                    case "username":
                        arrayErroUsername.push(erro)
                        break;
                    case "email":
                        arrayErroEmail.push(erro)
                        break;
                    default:
                        break;
                }
            }
            seterrorsUsername(arrayErroUsername as ErrorItem[])
            seterrorsEmail(arrayErroEmail as ErrorItem[])
        }

        if(result.errorsZed){
            toast.error("Please correct the errors in the form")

            for(const erro of result.errorsZed){
                switch (erro.field) {
                    case "username":
                        arrayErroUsername.push(erro)
                        break;
                    case "email":
                        arrayErroEmail.push(erro)
                        break;
                    case "password":
                        arrayErroPasswrod.push(erro)
                        break;
                    default:
                        break;
                }
            }
            seterrorsUsername(arrayErroUsername as ErrorItem[])
            seterrorsEmail(arrayErroEmail as ErrorItem[])
            setErrorsPassword(arrayErroPasswrod as ErrorItem[])
        }

        if(!result.error && !result.errorsZed) {
            setIsDialogOpen(true)
        }
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
                <form className="w-72 flex flex-col gap-5" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></Input>
                    <>
                        {errorsUsername.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">{error.message}</p>
                        ))}
                    </>
                    <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></Input>
                    <>
                        {errorsEmail.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">{error.message}</p>
                        ))}
                    </>
                    <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></Input>
                    <>
                        {errorsPassword.map((error, index) => (
                            <p key={index} className="text-red-500 text-xs">{error.message}</p>
                        ))}
                    </>
                    <Input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordCheck(e.target.value)} onKeyUp={passwordMatch}></Input>
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
                    <Button type="submit">Create Account</Button>
                </form>
            </div>
        </>
    )
}