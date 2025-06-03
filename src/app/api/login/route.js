import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const name = "Ajay Kumar"
        return NextResponse.json({ message: "Login API", name }, { status: 201 })
    } catch (error) {
        console.error("Internal Server Error", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}