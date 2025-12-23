import { Search } from "lucide-react";
interface SearchFieldProps {
    value: string;
    onChange: (value:string)=>void;
    placeholder: string;
    size: "short" | "medium" | "default";
    
}

export default function SearchField({ value, onChange, placeholder, size}: SearchFieldProps) {
    

    const sizeVariants = {
        "short": "w-32",
        "medium": "w-60",
        "default": "w-[50rem]"
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
            onChange={(e)=>{onChange(e.target.value)}}
            value={value}
            />

            <Search 
            className="group-hover:cursor-pointer"
            />
        </form>
     
     )
}