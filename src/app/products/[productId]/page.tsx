import { notFound } from "next/navigation";
import { fetchProductById } from "@/app/lib/fetchProductById";
import Image from "next/image";
import Header from "@/app/components/ui/header";
import ReadMoreText from "@/app/components/ui/readmore";



interface ProductPageParams {
    params: {
        productId: string
    }
}


export default async function ProductPage({params}:ProductPageParams) {
    const id = Number(params.productId)


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
        <h1 className="text-3xl font-semibold ml-10 mt-5 ">Página do Produto</h1>
        <main className="mt-3 flex justify-center">
            <div className=" flex w-[60rem] h-[30rem]">
                <div 
                className="w-1/2 
                flex items-center justify-center
                rounded-lg border border-black"
                >
                    
                    <Image 
                    width={300} 
                    height={300} 
                    alt = "Imagem do produto" 
                    src={product.image_url} 
                    className="m-auto"
                    />
                    
                </div>
                <div 
                className="w-1/2 flex items-center 
                justify-center rounded-lg"
                >
                    <div 
                    className="bg-blue-500 h-[28rem] 
                    w-[25rem] p-5 flex flex-col rounded-sm" 
                    >
                        
                        {product.name.length>40? (
                            <h1 
                            className="text-2xl"
                            >
                                {product.name.slice(0,40)}...
                            </h1>
                        ):(
                            <h1 
                            className="text-2xl"
                            >
                                {product.name}
                            </h1>
                        )}
                        
                            <p className="text-2xl mt-5">
                                R${product.price}
                            </p>
                            <div>
                                <ReadMoreText 
                                productName={product.name}
                                text={product.description} 
                                style="my-12"
                                />
                            </div>
                            <button className="bg-gray-500 my-5 p-2 rounded-sm hover:bg-black hover:text-white">
                                Adicionar ao Carrinho
                            </button>

                            <button className="bg-gray-500 p-2 rounded-sm hover:bg-red-500 hover:text-white  ">
                                Comprar
                            </button>

                    </div>
                    

                </div>
            
                
            </div>
            

        </main>
        

        
        </>
    )
}