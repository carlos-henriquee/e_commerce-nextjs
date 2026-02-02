import {pool} from '../lib/mysql';
import { RowDataPacket } from "mysql2";
import type { Product } from "@/app/models/Product";


export async function fetchProductById(id:number|string): Promise<Product | null> {
  
  if(Number.isNaN(id)) {
    return null
  }
  
  const [rows] = await pool.query<RowDataPacket[] & Product[]>("SELECT * FROM products WHERE id = ?", [id]);
  return Array.isArray(rows) ? rows[0]: null
}