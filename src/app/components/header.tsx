import Link from "next/link";

export default function Header() {
    return (
        <header className="flex items-center justify-end h-12 bg-yellow-500 font-bold">
            <Link className="mr-5 hover:text-white" href="/">Carrinho</Link>
            <Link className="mr-5 hover:text-white" href="/">Entrar</Link>
            <Link className="mr-5 hover:text-white" href="/">Cadastrar-se</Link>
        </header>
    )
}