'use client'

import { useEffect, useState } from "react";

interface Item {
    id:number;
    car_id:number;
    quantity:number;
    product_id: number;
}


export default function Cart(){
    const [items, setItems] = useState<Item[]>()

    useEffect(()=>{
        const fetchCartItems = async()=>{
            try {
                const res = await fetch("/api/cart/items")
                const data = await res.json()
                setItems(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchCartItems()
    },[])


    return(
        <article>
            <section>
                <h1>Carrinho</h1>
                <ul>
                    {items&&items.map((item)=>(
                        <li key={item.product_id}>{item.quantity}</li>
                    ))}
                </ul>
                
            </section>
        </article>
    )
}