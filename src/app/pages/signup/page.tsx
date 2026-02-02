'use client'
import { FormEvent, useState } from "react"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"


export default function SignUpPage() {
    const router = useRouter()
    const [alertMessage, setAlertMessage] = useState<string>("")
    const [formData,setFormData] = useState({
        name: "",
        email:"",
        password:""
    })

    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        try {
            const res = await fetch('/api/signup',{
            method:'POST',
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData),
            credentials:"include"
            })
            if(res.status==400) {
                setAlertMessage("User already exists")
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
        
        <h1 className="">Pagina de cadastro</h1>
        <form onSubmit={handleSubmit} className="bg-blue-500 flex flex-col items-center h-fit w-[20rem]">
            <input 
            type="text" 
            placeholder="Nome" 
            name="name"
            onChange={(e)=>setFormData({...formData, name:e.target.value})} 
            className="mt-10 h-8 w-64"
            />
            <input 
            type="email" 
            placeholder="Email" 
            onChange={(e)=>setFormData({...formData, email:e.target.value})} 
            className="mt-5 h-8 w-64"
            />
            <input 
            type="password" 
            placeholder="Senha" 
            onChange={(e)=>setFormData({...formData, password:e.target.value})} 
            className="mt-5 h-8 w-64"
            />
            <input 
            type="submit" 
            value="Cadastrar-se" 
            className="cursor-pointer justify-self-end bg-red-500 mb-3 p-2 mt-3 rounded-sm"
            />
            {alertMessage&&(
                <p className="text-red-500">{alertMessage}</p>
            )}
        </form>
    </main>
        
        </>
   
    )
}