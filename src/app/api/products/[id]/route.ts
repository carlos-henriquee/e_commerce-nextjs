import { fetchProductById } from "@/app/utils/fetchProductById";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest, {params}:{params:{id:string}}) {
    const productId = Number((await params).id)
    
    if(Number.isNaN(productId)) {
        return NextResponse.json({status:400})
    }

    const product = await fetchProductById(productId)
    return NextResponse.json(product)
}