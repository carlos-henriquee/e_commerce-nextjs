"use client"
import { useState } from "react"
import PopUp from "./popup";

interface ReadMoreTextProps {
    text: string;
    style:string
}

export default function ReadMoreText ({ text, style }: ReadMoreTextProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const maxLength = 50;
    const sla = ()=>{
        setIsExpanded(!isExpanded)
    }
    return (
        <>
            {isExpanded? (<PopUp/>): 
            
        (<div className="flex flex-col items-center justify-center">
            <p className={style}>{text.slice(0,maxLength)}...</p>
            {text.length > maxLength && (
                <button onClick={sla}>
                    {isExpanded? 'Ver menos':'Ver mais'}
                </button>
            )}
        </div>)}
        
        </>
        
    )
}