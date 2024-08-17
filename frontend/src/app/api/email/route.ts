import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    const response = await fetch(`http://localhost:4000/validateEmail`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token
        })
    })
    
    // const data = await response.json();
    // console.log(data);

    return NextResponse.redirect("http://localhost:3000/login")
}