import { NextResponse } from "next/server";
import { pool } from "@/app/lib/mysql";
import { RowDataPacket } from "mysql2";
import type { Product } from "@/app/types/Product";

export async function GET() {
    const [rows] = await pool.query<RowDataPacket[] & Product[]>('SELECT * FROM products')
    return NextResponse.json(rows);
}