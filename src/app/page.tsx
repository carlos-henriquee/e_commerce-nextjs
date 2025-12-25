"use client"
import { useEffect, useState } from "react";
import { Product } from "./types/Product";
import Image from "next/image";
import Header from "./components/header";
import Link from "next/link";
import  Loader  from "./components/ui/loader";
import  SearchField from "./components/ui/searchField";
import { useSearchParams } from "next/navigation";



export default function Page() {
    const searchParams = useSearchParams()
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setLoading] = useState(true)
    const query = searchParams.get("query")|| ""


    useEffect(()=>{
      async function getProducts() {
        if(query) {
          try {
            const res = await fetch(`/api/products/search?query=${query}`)
            const data: Product[] = await res.json()
            setProducts(data);
          } catch(error) {
            console.log(error)
          }
          
        }else{
          try {
            const res = await fetch('/api/products');
            const data = await res.json();
            setProducts(data)
          } catch (error) {
            console.error(error)
          }
        }
          
        }
        getProducts();
        setLoading(false)
    },[query])

    if(isLoading) {
      return (
        <>
          <Header isHome={true}/>
          <h1 className="text-3xl text-center mt-10 mb-10 font-bold">Encontre o que você ama.</h1>
          <Loader/>
        </>
      )
    }
    
    return(
      <>
          <Header isHome={true}/>
          <div className="flex flex-col items-center justify-center">
                <SearchField placeholder={"Encontre o que você ama."} size={"default"}/>
                <h1 className="text-3xl text-center mt-10 mb-10 font-bold">Destaques do dia</h1>
          </div>
          
          <div className="grid grid-cols-5">
          
            {products && products.map((item)=>(
              
                <Link href={`/products/${item.id}`} 
                onClick={()=>setLoading(true)}
                className="w-50 h-68  bg-orange-500 text-white 
                cursor-pointer hover:scale-[1.1] ease-in-out 
                duration-200 flex flex-col m-8 rounded-lg" 

                key={item.id}
                >
                    <Image
                        className="m-auto mt-2 rounded-sm 
                        bg-white overflow-hidden h-40 w-40" 

                        src={item.image_url}
                        alt={`Imagem do produto ${item.name}`}
                        width={120}
                        height={120}
                    />
                    <h2 
                    className="mt-5 text-2xl ml-3 
                    font-bold truncate">
                      {item.name}
                    </h2>
                    <p 
                    className="mr-4 mt-6 text-2xl 
                    text-end">
                      R${item.price}
                    </p>
                </Link>
            ))}
        </div>
      </>
    )
}