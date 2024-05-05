"use client";
import { Menu } from "lucide-react";
import {Button} from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Sidebar from "./sidebar";
import { useEffect, useState } from "react";

const Navbar=()=>{
    const [isMounted,setMounted]=useState(false);
    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }
    return(
        <div className="flex items-center p-4">
            <Sheet>
                <SheetTrigger>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu/>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <Sidebar></Sidebar>
                </SheetContent>
            </Sheet>
        </div>
    );
}
export default Navbar;