import { z } from "zod";

export default async function createUser(nome: string, email: string, cep: string, senha: string, habilidades: number[]){
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const noSpecialCharRegex = /^[a-zA-Z0-9]*$/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    
    const usuarioSchema = z.object({
        nome: z.string().min(4).max(20)
        .refine((val) => noSpecialCharRegex.test(val), {
            message: "Username must not contain any special characters",
        }),
        email: z.string().email(),
        senha: z.string().min(8).max(30)
        .refine((val) => specialCharRegex.test(val), {
            message: "Password must contain at least one special character",
        })
        .refine((val) => upperCaseRegex.test(val), {
            message: "Password must contain at least one uppercase letter",
        })
        .refine((val) => numberRegex.test(val), {
            message: "Password must contain at least one number",
        })
    });

    const novoUsuario = {
        nome: nome,
        email: email,
        cep: cep,
        senha: senha,
        habilidades: habilidades
    }

    try{
        const response = await fetch(`http://192.168.1.107:3000/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(novoUsuario)
        })

        const returned = await response.json()
        return returned

    } catch(e){
        if (e instanceof z.ZodError) {
            const formattedErrors = e.errors.map(err => ({
                field: err.path[0],
                message: err.message
            }));
            return { errorsZed: formattedErrors };
        }
    }

}