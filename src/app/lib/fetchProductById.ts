import {pool} from './mysql';
import { RowDataPacket } from "mysql2";
import type { Product } from "@/app/types/Product";


export async function fetchProductById(id:number): Promise<Product | null> {
  
  if(Number.isNaN(id)) {
    return null
  }
  
  const [rows] = await pool.query<RowDataPacket[] & Product[]>("SELECT * FROM products WHERE id = ?", [id]);
  return Array.isArray(rows) ? rows[0]: null
}