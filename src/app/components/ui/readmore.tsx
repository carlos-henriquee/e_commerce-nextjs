"use client"
import { useState } from "react"
import PopUp from "./popup";

interface ReadMoreTextProps {
    productName:string;
    text: string;
    style:string
}

export default function ReadMoreText ({ productName, text, style }: ReadMoreTextProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const maxLength = 50;

    const PopUpAction = ()=>{
        if(isExpanded) {
            setIsExpanded(false);
            console.log(isExpanded)
        }else if(isExpanded==false){
            setIsExpanded(true)
        }
          
        
    }
    
    return (
        <>
            {isExpanded? (
                <>


                <PopUp title={productName} description={text}  onClickX={PopUpAction} />
                <div className="flex flex-col items-center justify-center">
                    
                    {text.length > maxLength ? (
                        <>
                        <p className={style}>{text.slice(0,maxLength)}...</p>
                        <button onClick={PopUpAction}>
                            Ver Menos
                        </button>
                        </>
                        
                    ):(
                        <p className={style}>{text}</p>
                    )}
                </div>
            </>): 
            
        (<div className="flex flex-col items-center justify-center">
            {text.length > maxLength?(
                        <>
                        <p className={style}>{text.slice(0,maxLength)}...</p>
                        </>
                        
                    ):(
                        <p className={style}>{text}</p>
                    )}
        </div>)}
        
        </>
        
    )
}