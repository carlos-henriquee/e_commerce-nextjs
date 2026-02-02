'use client'

import { useEffect } from "react";


export default function Cart(){
    useEffect(()=>{
        const cookieStore = document.cookie;
        console.log("COOKIESTORE",cookieStore)
    },[])


    return(
        <article>
            <section>
                <h1>Carrinhos</h1>
            </section>
        </article>
    )
}