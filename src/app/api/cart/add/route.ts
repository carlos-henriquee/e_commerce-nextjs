import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { pool } from "@/app/lib/mysql";
import { RowDataPacket } from "mysql2";



export async function POST(request: NextRequest) {
    const authToken = request.cookies.get("token")?.value
    if(!authToken) {
        console.log("Sem token")
        const response =  NextResponse.json(
            {message:"Forbiden"},
            {status:400},
            
        )
        console.log(response)
        return response
    }
    const secret = new TextEncoder().encode(process.env.SECRET_KEY!)

    const { payload } = await jwtVerify(authToken,secret)

    const userId = Number(payload.sub)

    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM e_commerce.carts WHERE user_id = ?", [userId])

    if(rows.length>0) {
        console.log("It has carts")
    }else{
        console.log("It doesn't has carts")
    }
}