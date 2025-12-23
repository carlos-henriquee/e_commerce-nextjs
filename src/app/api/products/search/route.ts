import { NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";

export async function GET(req:Request) {
    const {searchParams} = new URL(req.url);
    const query = searchParams.get("query") || ""

    const [rows] = await pool.query(
        `
        SELECT id, name, image_url 
        FROM products
        WHERE name LIKE ?    
        `,
        [`%${query}%`]
    )
    return NextResponse.json(rows)
}