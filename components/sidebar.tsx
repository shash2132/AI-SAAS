"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
import { FreeCounter } from "./free-counter";

interface sidebarProps{
  apiLimitCount:number;
}

const routes = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
      color: "text-sky-500"
    },
    {
      label: 'Conversation',
      icon: MessageSquare,
      href: '/conversation',
      color: "text-violet-500",
    },
    {
      label: 'Video Generation',
      icon: VideoIcon,
      color: "text-orange-700",
      href: '/video',
    },
    {
      label: 'Music Generation',
      icon: Music,
      color: "text-emerald-500",
      href: '/music',
    },
    {
      label: 'Code Generation',
      icon: Code,
      color: "text-green-700",
      href: '/code',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];
  
const Sidebar=({apiLimitCount=0}:sidebarProps)=>{
  const pathname=usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <a href="/dashboard" className="flex items-center pl-13 mb-14">
                    <div className="relative w-8 h-8 mr-4">
                        <Image 
                            fill
                            alt="Logo"
                            src="/logo.png"
                        />
                        
                    </div>
                    <div>
                    <h1 className="text-xl font-bold">Genius</h1>
                    </div>
                </a>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                        key={route.href} 
                        href={route.href}
                        className={cn(
                            "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition"
                            ,pathname===route.href ? "text-white bg-white/10" : "text-zinc-400"
                        )}
                        >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                            {route.label}
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-1 left-0 w-full">
              <FreeCounter apiLimitCount={apiLimitCount} />
            </div>
            
        </div>
    );
}

export default Sidebar;