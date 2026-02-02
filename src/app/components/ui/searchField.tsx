'use client'

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchFieldProps {
    placeholder: string;
    size: "short" | "medium" | "default" ;
    
}

export default function SearchField({placeholder, size}: SearchFieldProps) {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query,setQuery] = useState(searchParams.get("query")|| "");
    
    useEffect(()=>{
        if(query.length>0){
            query.trim()
            router.push(`/?query=${query}`)
        }else{
            router.replace("/")
        }
        
    },[query,router])
   
        const sizeVariants = {
            "short": "w-32",
            "medium": "w-60",
            "default": "w-1/2",
        }
        

     return (
        <form 
        className={` ${sizeVariants[size]} group flex  
        items-center justify-center outline-none focus:shadow-lg 
        focus:shadow-yellow-500/50 mt-10 p-2 rounded-lg 
        font-semibold placeholder:text-black border-4 
        border-orange-500`}>

            <input 
            className={`w-full outline-none`} 
            placeholder={placeholder}
            onChange={(e)=>setQuery(e.target.value)}
            />

            <Search 
            className="group-hover:cursor-pointer"
            />
        </form>
     
     )
}