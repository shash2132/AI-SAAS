"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useProModal } from "@/hooks/use-pro-model"
import { Badge } from "./ui/badge";
import { Check, Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon, Zap } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
  
const tools = [
    
    {
      label: 'Conversation',
      icon: MessageSquare,
      color: "text-violet-500",
    },
    
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
    },
  
  ];

export const ProModal=()=>{
    const proModal=useProModal();
    const [loading,setLoading]=useState(false);

    const subcribe=async ()=>{
        try{
            setLoading(true)
            const response = await axios.get("/api/stripe");
            window.location.href=response.data.url;
        }catch(error:any){
            console.log(error);
        }finally{
            setLoading(false);
        }
        
    }
    return(
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle className="flex justify-center items-center
                flex-col gap-y-4 pb-2">
                    <div className="flex items-center gap-x-2 font-bold py-1">
                        Upgrade to Genius
                        <Badge variant="premium" className="uppercase text-sm py-1">Pro</Badge>
                    </div>  
                    
                </DialogTitle>
                <DialogDescription>
                    {tools.map((tool)=>(
                        <Card
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-x-4">
                                <div className={cn("p-2 w-fit rounded-md")}>
                                    <tool.icon className={cn("w-6 h-6" , tool.color)}/>
                                </div>
                                <div className="font-semibold text-sm">
                                    {tool.label}
                                </div>
                            </div>
                            <Check className="text-primary w-5 h-5"/>
                        </Card>
                    ))}
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={subcribe} size="lg" className="w-full" variant="premium">
                        Upgrade
                        <Zap className="z-4 h-4 ml-2 fill-white"/>  
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}