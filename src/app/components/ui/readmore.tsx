"use client"
import { useState } from "react"
import PopUp from "./popup";

interface ReadMoreTextProps {
    productName:string;
    productDescription: string;
    style:string
}

export default function ReadMoreText ({ productName, productDescription, style }: ReadMoreTextProps) {
    
    const [popUp, setPopUp] = useState(false)
    const maxLength = 50;
    const shortDescription = productDescription.slice(0,maxLength)


    if(popUp===true) {
        return(
            <>
                <PopUp 
                title={productName}
                description={productDescription}
                onClickX={()=>setPopUp(false)}
                />
                <div className={style}>
                <p>{shortDescription}...</p>
                <button 
                className="m-auto"
                onClick={()=>setPopUp(false)}
                >
                    Ver menos
                </button>
            </div>
            </>
            
        )
    }


    if(productName.length>20 || productDescription.length>40) {
        
        return(
            <div className={style}>
                <p>{shortDescription}...</p>
                <button 
                className="m-auto"
                onClick={()=>setPopUp(true)}
                >
                    Ver mais
                </button>
            </div>
            
        )
    }
    return(
        <div className="flex flex-col">
                <p>{productDescription}...</p>
            </div>
    )
}