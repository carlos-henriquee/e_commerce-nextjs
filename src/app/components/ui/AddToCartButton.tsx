'use client'
import { useState } from "react"
import AddToCartPopUp from "./AddToCartPopUp"
import { Product } from "@/app/models/Product"


interface CartButtonProps {
    product: Product
}

export default function AddToCartButton({product}:CartButtonProps) {
    const [addPopUp, setAddPopUp] = useState<boolean>(false)

    const handleClick = ()=>{
        setAddPopUp(!addPopUp)
    }

    return (
        <>
            {addPopUp&&(
                <AddToCartPopUp product={product} on_close={()=>setAddPopUp(false)}/>
            )}
            <button
            onClick={()=>handleClick()} 
            className="bg-gray-500 my-5 p-2 rounded-sm 
            hover:bg-black hover:text-white"        
            >
                Adicionar ao Carrinho
            </button>
        </>
          
    )
}