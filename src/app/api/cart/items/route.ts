import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";
import { RowDataPacket } from "mysql2";
import { jwtVerify } from "jose";
export async function GET(request: NextRequest) {
    const authToken = request.cookies.get("token")?.value
    const secret = new TextEncoder().encode(process.env.SECRET_KEY!)
    try {
        const {payload} = await jwtVerify(authToken!,secret)
        const userId = payload.sub

        const [result] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM e_commerce.carts WHERE user_id = ?",
            [userId]
        )
        const cart = result
        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM e_commerce.cart_items WHERE cart_id = ?",
            [cart[0].id]
        )
        if(rows.length<0) {
            return NextResponse.json({status:300},{statusText:"Sem itens"})
        }
        return NextResponse.json(rows)

    }catch (error) {
        return NextResponse.json({status:500},{statusText:`ERRO INTERNO:${error}`})
    }
    
}