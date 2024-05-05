"use client";
import * as z from "zod";
import Heading from "@/components/Heading";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form , FormControl, FormField, FormItem} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loading";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useProModal } from "@/hooks/use-pro-model";
import {toast} from "react-hot-toast"
import ReactMarkDown from "react-markdown"

interface ChatMessage {
    role: string; 
    content: string; 
}

const CodeGenerationPage=()=>{
    const router =useRouter();
    const [messages,setMessages]=useState<ChatMessage[]>([]);
    const ProModal =useProModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          prompt: ""
        }
    });
    
    const isLoading = form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formSchema>)=>{
       try{
            const userMessage={
                role:"user",
                content:values.prompt
            };
            const newMessages=[userMessage];
            const response=await axios.post("/api/code",{
                messages:newMessages
            });
            //console.log(response)
            

            setMessages((current)=>[...current,userMessage, {role: "system", content: response.data}]);
            form.reset();
           
        }catch(error:any){
            if(error?.response?.status==403){
                ProModal.onOpen();
            }else{
                toast.error("Something Went Wrong");
            }
        console.log(error)
       }finally{
            router.refresh();
       }
    }

    return(
        <div>
            <Heading title="Code Generation" 
                description="Our Most Advanced Generative Model"
                icon={Code}
                iconColor="text-green-700"
                bgColor="bg-green-700/10" 
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                    <form 
                        onSubmit={form.handleSubmit(onSubmit)} 
                        className="
                            rounded-lg 
                            border 
                            w-full 
                            p-4 
                            px-3 
                            md:px-6 
                            focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "
                    >
                    <FormField
                        name="prompt"
                        render={({ field }) => (
                        <FormItem className="col-span-12 lg:col-span-10">
                            <FormControl className="m-0 p-0">
                            <Input
                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                disabled={isLoading} 
                                placeholder="Code of Palindrome?" 
                                {...field}
                            />
                            </FormControl>
                        </FormItem>
                        )}
                    />
                    <Button className="col-span-12 lg:col-span-2 w-full" type="submit" disabled={isLoading} size="icon">
                        Generate
                    </Button>
                    </form>
                    </Form>
                    <div className="space-y-4 mt-4">
                        {isLoading && (
                            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                            </div>
                        )}
                        {messages.length===0 && !isLoading &&(
                            <Empty label="No Conversations started."/>
                        )}
                        <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message, index) => (
                            <div key={index}
                                className={cn(
                                    "p-8 w-full flex items-start gap-x-8 rounded-lg",
                                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted",
                                )}
                            >
                                {message.role==="user"?<UserAvatar/>:<BotAvatar/>}
                                <ReactMarkDown
                                components={{
                                    pre :({node , ...props })=>(
                                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                                            <pre {...props}/>
                                        </div>
                                    ),
                                    code :({node, ...props})=>(
                                        <code className="bg-black/10 p-1 rounded-lg" {...props} />
                                    )
                                }}
                                className="text-sm overflow-hidden leading-7"
                                >
                                     {message.content || ""}
                                </ReactMarkDown>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default CodeGenerationPage;