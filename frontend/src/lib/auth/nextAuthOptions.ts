import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label:  "email", type: "text" },
                password: { label: "password", type: "password" }
            },

            async authorize(credentials, req) {
                const response = await fetch(`http://localhost:4000/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        senha: credentials?.password
                    })
                })

                const user = await response.json()
                if(user && response.ok){
                    return user
                }
            },
        })
    ],
    pages: {
        signIn: "/login",
        newUser: "/newUser"
    },
    callbacks: {
        async jwt({ token, user }) {
            user && ( token.user = user)
            return token
        },
        async session({ session, token }){
            session.user = token.user as any
            return session
        }
    }
}