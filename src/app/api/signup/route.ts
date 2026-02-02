import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import bcrypt from "bcrypt"
import { SignJWT } from "jose";
import { error } from "console";



export async function POST(req:NextRequest) {
    
        const {name, email, password} = await req.json()
        if(!name||!email||!password) {
            return NextResponse.json(
                {status:400},
                {statusText: "Credenciais Nao Preenchidas"}
            )
            
        }
        const [result] = await pool.execute<RowDataPacket[]>(
            "SELECT * FROM e_commerce.users WHERE email = ?", 
            [email]
        )
        if(result.length>0) {
            console.log("JA EXISTEEE")
            return NextResponse.json(
                {error:"Usuario ja existe"},
                {status:400}
            )
        }   
        
        const hashedPassword = await bcrypt.hash(password,10)
        const values = [name,email,hashedPassword]

        const [insertResult]=await pool.execute<ResultSetHeader>(
                "INSERT INTO e_commerce.users (name,email,password) VALUES (?,?,?)",
                values
            )
        const user = insertResult
        console.log("chegou ANTES DO TRY")
        try {
            console.log("chegou no try")           
            const secret =  new TextEncoder().encode(process.env.SECRET_KEY!)
            const token = await  new SignJWT({name:name})
            .setProtectedHeader({alg:'HS256'})
            .setSubject(String(user.insertId))
            .setIssuedAt()
            .setExpirationTime('1min')
            .sign(secret)
            
            const res = NextResponse.json({message: "sucesso", status:200})
            res.cookies.set('token', token, {
                httpOnly: true,
                secure: false,
                sameSite:"lax",
                path:"/"
            })
            
            return res
            
        } catch (error) {
            return NextResponse.json({error:error})
        }
    

}
