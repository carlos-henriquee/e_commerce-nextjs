'use client'
import { FormEvent, useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"


export default function SignUpPage() {
    const router = useRouter()
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [loginFormData,setLoginFormData] = useState({
        email:"",
        password:""
    })

    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        try {
                const res = await fetch('/api/login',{
                method:'POST',
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginFormData),
                credentials:"include"})
                if(!res.ok) {
                    setAlertMessage(res.statusText)
                }else{
                    router.replace("/")
                }
        
        } catch (error) {
            setAlertMessage(`${error}`)
        }
        
    }
    
    const handleBack = ()=>{
        router.back()
    }
    return( 
        <>
        <ArrowLeftIcon className="absolute m-5 cursor-pointer" onClick={handleBack}/>
         <main className="bg-gray-500 w-screen h-screen flex flex-col items-center justify-center">
        
        <h1 className="">Pagina de Login</h1>
        <form onSubmit={handleSubmit} className="bg-blue-500 flex flex-col items-center h-fit w-[20rem]">
            <input 
            type="email" 
            placeholder="Email"
            name="email" 
            onChange={(e)=>setLoginFormData({...loginFormData, email:e.target.value})} 
            className="mt-5 h-8 w-64"
            />
            <input 
            type="password" 
            placeholder="Senha" 
            name="password"
            onChange={(e)=>setLoginFormData({...loginFormData, password:e.target.value})} 
            className="mt-5 h-8 w-64"
            />
            <input type="submit" value="Entrar" className="cursor-pointer justify-self-end bg-red-500 mb-3 p-2 mt-3 rounded-sm"/>
            {alertMessage&&(
                <p className="text-red-500 font-bold">{alertMessage}</p>
            )}
        
        </form>
    </main>
        
        </>
   
    )
}