'use client'

import { FormEvent, useEffect, useState } from "react"
import { X } from "lucide-react"
import { Product } from "@/app/models/Product"
import { useRouter } from "next/navigation"


interface AddPopUpProps {
    product: Product;
    on_close:()=>void
}


export default function AddToCartPopUp({product, on_close}:AddPopUpProps){
    const router = useRouter()
    const [totalPrice, setTotalPrice] = useState<number>()
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [quantityValue, setQuantityValue] = useState<number>()
    const [itemData, setItemData] = useState({
        productId:"",
        insertQuantity:"",
    })


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
       if(!quantityValue) {
            setAlertMessage("Campo nao preenchido")
       }else{
        setItemData(
        {
            productId:String(product.id), 
            insertQuantity:String(quantityValue)
        })
        try {
        const res = await fetch('/api/cart/add',{
            method:'POST',
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(itemData)
        })
        console.log(res.statusText)
        if(res.status==401) {
            router.replace("/pages/login")
        }else{
            setAlertMessage(res.statusText)
        }
       } catch (error) {
            console.log(error)
       }
       }
       

       
    }
    
    


    return(
        <div className="h-72 w-64  absolute left-[35rem] bg-red-500 flex  flex-col justify-center items-center">
            <X onClick={on_close} className="self-end mr-2 cursor-pointer"/>
                    <h1>Pop Up de Add</h1>
                    <form 
                    onSubmit={
                        handleAdd
                    } 
                    className="flex flex-col p-5 gap-4 justify-center items-center"
                    >
                            <input 
                            type="number" 
                            onChange={
                                (e)=>setQuantityValue(Number(e.target.value))
                            }
                            />
                            <p>
                                Quantidade em Estoque: {product?.storage}
                            </p>
                            <p>
                                Preço Total: {totalPrice?.toFixed(2)}
                            </p>
                            <input 
                            type="submit" 
                            value="Adicionar" 
                            className="cursor-pointer bg-blue-500 p-2"
                            />
                            <p>{alertMessage}</p>
                    </form>
                    
        </div>
    )
}