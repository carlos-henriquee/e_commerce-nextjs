'use client'

import { X } from "lucide-react"

interface PopUpProps {
    title:string;
    description: string;
    onClickX: ()=>void
}

export default function PopUp ({title, description, onClickX}: PopUpProps){


    return (
        <div className="absolute h-[30rem] w-[48rem] bg-gray-500 rounded-md left-[16rem] r-2 top-[5rem]">
            <div className="flex justify-end">
                <h1 className="mt-5 font-bold text-xl text-center h-6 w-full">{title}</h1>
                <X onClick={onClickX} className="cursor-pointer m-2 hover:text-red-500"/>
            </div>
            
            <p className="ml-10 mt-10 w-[40rem] overflow-clip">{description}</p>
        </div>
    )
}