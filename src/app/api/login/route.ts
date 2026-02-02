import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";
import { RowDataPacket } from "mysql2";
import bcrypt from "bcrypt"
import { SignJWT } from "jose";


export async function POST(req:NextRequest) {
    
    const { email,password } = await req.json()

    if(!email||!password) {
        return NextResponse.json({status:400}, {statusText:"Credenciais nao preenchidas"})
    }
    const [rows] = await pool.execute<RowDataPacket[]>(
        "SELECT * FROM e_commerce.users WHERE email = ?",
         [email]
    )
    if(rows.length===0){
        return NextResponse.json({status:400},{statusText:"email ou senha incorretos"})
    }
    const user = rows[0]
    console.log(user)
    console.log("INSERTED PASSWORD:",password)
    console.log("USER PASSWORD:", user.password)
    const isMatch = await bcrypt.compare(password,user.password)
    console.log("CHEOGU ATE AQUI - IS MATCH")
    
    if(isMatch) {
        console.log("CHEOGU ATE AQUI - IS MATCH = TRUEEE")
        try {
            console.log("CHEOGU ATE AQUI - TRY")
            const secret = new TextEncoder().encode(process.env.SECRET_KEY!)
            const token = await  new SignJWT({name:user.name})
            .setProtectedHeader({alg:'HS256'})
            .setSubject(user.id)
            .setIssuedAt()
            .setExpirationTime('1min')
            .sign(secret)
            console.log(token)
            const res = NextResponse.json({message: "sucesso"}, {status:200})
            res.cookies.set('token', token, {
                httpOnly: true,
                secure: false,
                sameSite:"lax",
                path:"/"
            })
            
            return res
    } catch (error) {
         return NextResponse.json({message:`Erro do servidor: ${error}`},{status:500})
    }
    }else{
        console.log("SENHA ERRADA")
        return NextResponse.json({status:400},{statusText: "Credenciais Invalidas"})
    }
}
