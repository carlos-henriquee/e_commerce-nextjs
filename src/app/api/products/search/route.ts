import { NextRequest, NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";


export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url)
    const query = searchParams.get("query")||""

    const [rows] = await pool.execute("SELECT * FROM e_commerce.products WHERE name LIKE ?", [`%${query}%`])
    return NextResponse.json(rows) 
}