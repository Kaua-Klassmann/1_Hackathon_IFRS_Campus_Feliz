import { z } from "zod";

export default async function createUser(username: string, email: string, password: string){
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const noSpecialCharRegex = /^[a-zA-Z0-9]*$/;
    const upperCaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    
    const newUserSchema = z.object({
        username: z.string().min(5).max(12)
        .refine((val) => noSpecialCharRegex.test(val), {
            message: "Username must not contain any special characters",
        }),
        email: z.string().email(),
        password: z.string().min(8).max(30)
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

    const newUser = {
        username: username,
        email: email,
        password: password
    }

    try{
        const response = await fetch(`http://localhost:4000/createUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUserSchema.parse(newUser))
        })

        const returned = response.json()
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