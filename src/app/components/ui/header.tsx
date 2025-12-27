'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";



interface HeaderProps {
    isHome: boolean;
}

export default function Header({isHome}:HeaderProps) {
    const router = useRouter()
    
    if(!isHome) {
        return (
                <header className="flex items-center h-12 bg-orange-500 font-bold">
                    <ChevronLeftIcon onClick={()=>router.back()} color="white" size={48} className="cursor-pointer"/>
                    
                    <div className="ml-auto">
                        <Link className="mr-5 hover:text-white" href="/">Carrinho</Link>
                        <Link className="mr-5 hover:text-white" href="/">Entrar</Link>
                        <Link className="mr-5 hover:text-white" href="/">Cadastrar-se</Link>
                    </div>
                    
                </header>
            )
    }


    return (
        <header className="flex items-center justify-end h-12 bg-orange-500 font-bold">
            <Link className="mr-5 hover:text-white" href="/">Carrinho</Link>
            <Link className="mr-5 hover:text-white" href="/">Entrar</Link>
            <Link className="mr-5 hover:text-white" href="/">Cadastrar-se</Link>
        </header>
    )
}