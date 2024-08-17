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
                console.log(credentials)
                const response = await fetch(`http://192.168.1.107:3000/session`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        senha: credentials?.password
                    })
                })
                console.log(response)
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