import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { pool } from "@/app/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";

export async function POST(request: NextRequest) {
    const authToken = request.cookies.get("token")?.value
    if(!authToken) {
        console.log("SEM TOKEN")
        return NextResponse.json(
            {},
            {status:401}
        )
    }

    console.log("CHEGOUA AQUI DEPOIS DO PRIMEIRO IF")
    const {productId, insertQuantity} = await request.json()
    if(productId.length<0 || insertQuantity.length<0) {
        console.log("NAAOOOO")
        return NextResponse.json(
            {status:400},
            {statusText:"Campos nao preenchidos"}
    )}
    const product_id = Number(productId)
    const insert_quantity = Number(insertQuantity)

    if(isNaN(product_id) || isNaN(insert_quantity)) {
        return NextResponse.json(
            {status:400},
            {statusText:"Campos invalidoooooos"}
        )
    }
    
    try {
        const secret = new TextEncoder().encode(process.env.SECRET_KEY!)

        const { payload } = await jwtVerify(authToken,secret)

        const userId = Number(payload.sub)

        const [rows] = await pool.query<RowDataPacket[]>(
            "SELECT * FROM e_commerce.carts WHERE user_id = ?", 
            [userId]
        )

        if(rows.length>0) {
            console.log("It has carts")
            await pool.query(
                "INSERT INTO e_commerce.cart_items(cart_id, quantity, product_id) VALUES(?,?,?)",
                [rows[0].id,insert_quantity,product_id]
            )
            return NextResponse.json({status:200},{statusText:"Produto acidionado"})
        }else{
            console.log("It doesn't has carts")
            const [result] = await pool.query<ResultSetHeader>(
                "INSERT INTO e_commerce.carts (user_id) VALUES (?)", 
                [userId]
            )
            const cart = result
            await pool.query(
                "INSERT INTO e_commerce.cart_items (cart_id, quantity, product_id) VALUES(?,?,?)",
                [cart.insertId,insert_quantity,product_id]
            )
            return NextResponse.json({status:200},{statusText:"Produto acidionado"})
        }
    } catch (error:any) {
        if (error.code === "ERR_JWT_EXPIRED") {
            return NextResponse.json(
                {},
                {status: 401},
            )
        }
        return NextResponse.json({error:error}, {status:500})
}
    
}