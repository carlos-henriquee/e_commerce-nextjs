import { notFound } from "next/navigation";
import { fetchProductById } from "@/app/lib/fetchProductById";
import Image from "next/image";
import Header from "@/app/components/header";
import ReadMoreText from "@/app/components/readmore";


interface ProductPageParams {
    params: {
        productId: string
    }
}


export default async function ProductPage({params}:ProductPageParams) {
    const id = Number((await params).productId)


    if(Number.isNaN(id)) {
        return notFound()
    }

    const product = await fetchProductById(id)

    if(!product) {
        return notFound()
    }
    return(
        <>
        <Header isHome={false}/>
        
        <h1 className="text-3xl font-semibold ml-10 mt-5">Página do Produto</h1>
        
        <div 
        className="bg-orange-500 h-80 w-20 absolute mt-20 ml-10"
        ></div>
        <div className="bg-orange-500 rounded-lg flex flex-col h-fit p-5 w-[34rem] absolute ml-[50rem] mt-[-3rem]">
            <h1 className="text-2xl font-semibold mx-10 my-10">{product.name}</h1>
            <p className="ml-10 text-3xl">R${product.price.toFixed(2)}</p>
            <h2 className="font-semibold ml-10 my-5">Descrição</h2>
            <ReadMoreText style="mx-10 mb-5 text-xl" text={product.description} />
            <button className="p-5 bg-white text-black   w-80 rounded-lg mx-auto mt-5 ">Adicionar ao carrinho</button>
            <button className="p-5 bg-red-500 hover:shadow-2xl hover:shadow-red-400 text-white w-80 rounded-lg mx-auto mt-5 ">Comprar</button>
        </div>
        
        <div 
        className="ml-40 mt-12 w-[36rem] h-[30rem] flex items-center justify-center
        rounded-lg border border-black"
         >
            
            <Image width={300} height={300} alt = "Imagem do produto" src={product.image_url} className="m-auto"/>
            
        </div>

        
        </>
    )
}