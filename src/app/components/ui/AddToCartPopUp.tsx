'use client'

import { FormEvent, useEffect, useState } from "react"
import { X } from "lucide-react"
import { Product } from "@/app/models/Product"

interface AddPopUpProps {
    product: Product;
    on_close:()=>void
}


export default function AddToCartPopUp({product, on_close}:AddPopUpProps){
    const [totalPrice, setTotalPrice] = useState<number>()
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [quantityValue, setQuantityValue] = useState<number>()
    


    useEffect(()=>{
        if(!product) return
        if(quantityValue) {
            if(quantityValue>product.storage) {
                setAlertMessage("Quantidade ultrapassa estoque")
            }else{
                setAlertMessage("")
                setTotalPrice(quantityValue*product.price)
            }
        }else{
            setAlertMessage("")
            setTotalPrice(product.price)
        }
    },[quantityValue, product])

    const handleAdd = async (e:FormEvent)=>{
       e.preventDefault()
       try {
        const res = await fetch('/api/cart/add',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include"
        })
        if(!res.ok) {
            console.log(res)
        }
       } catch (error) {
            console.log(error)
       }
    }
    
    

    


    return(
        <div className="h-72 w-64  absolute left-[35rem] bg-red-500 flex  flex-col justify-center items-center">
            <X onClick={on_close} className="self-end mr-2 cursor-pointer"/>
                    <h1>Pop Up de Add</h1>
                    <form onSubmit={(e)=>handleAdd(e)} className="flex flex-col p-5 gap-4 justify-center items-center">
                            <input type="number" onChange={(e)=>setQuantityValue(Number(e.target.value))}/>
                            <p>Quantidade em Estoque: {product?.storage}</p>
                            <p>Preço Total: {totalPrice?.toFixed(2)}</p>
                            <input type="submit" value="Adicionar" className="cursor-pointer bg-blue-500 p-2"/>
                            <p>{alertMessage}</p>
                    </form>
                    
        </div>
    )
}