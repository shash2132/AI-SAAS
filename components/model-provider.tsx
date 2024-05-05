"use client"

import { useEffect, useState } from "react"
import { ProModal } from "./promodel";

export const ModelProvider=()=>{
    const [isMounted,setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true);
    },[])

    if(!isMounted){
        return null;
    }
    return(
        <>
            <ProModal/>
        </>
    )
} 