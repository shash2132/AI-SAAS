"use client"

import { useEffect } from "react"
import {Crisp} from "crisp-sdk-web"
export const CrispChat=()=>{
    useEffect(()=>{
        Crisp.configure("84f312a8-f211-4dfc-a4e1-6229a46c9cfd")
    },[]);

    return null;
}