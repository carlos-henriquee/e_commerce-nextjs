"use client"
import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import Image from "next/image";
import Header from "./components/header";


export default function Page() {

    const [products, setProducts] = useState<Product[]>([])


    useEffect(()=>{
      async function getProducts() {
        try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data)
        } catch (error) {
            console.error(error)
        }
      }
      getProducts();
    },[])

    return(
      <>
          <Header/>
          <h1 className="text-3xl text-center mt-10 mb-10 font-bold">Encontre o que você ama.</h1>
          <div className="grid grid-cols-5 gap-0">
             
            {products && products.map((item)=>(
                <div className=" bg-primary cursor-pointer hover:scale-[1.1] ease-in-out duration-200 flex flex-col  m-10  w-50 h-68 rounded-lg" key={item.id}>
                    <Image
                        className="m-auto mt-2 rounded-sm bg-white overflow-hidden h-40 w-40" 
                        src={item.image_url}
                        alt={`Imagem do produto ${item.name}`}
                        width={120}
                        height={120}
                    />
                    <h2 className="mt-5 text-2xl ml-3 font-bold truncate">{item.name}</h2>
                    <p className="mr-4 mt-6 text-2xl text-end">R${item.price}</p>
                </div>
            ))}
        </div>
      </>
    )
}