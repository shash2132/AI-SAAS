import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {increaseApiLimit,checkUserApiLimit} from "@/lib/api-limit"

import Replicate from 'replicate';
const replicate = new Replicate({
    auth:process.env.REPLICATE_API_TOKEN
});


export async function POST(req:Request){
    try{
        const { userId }=auth();
        const body=await req.json();
        const {prompt}=body;

        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }

       
        if(!prompt){
            return new NextResponse("Provid Video prompt",{status:400})
        }
        const freeTrial=await checkUserApiLimit();
        if(!freeTrial){
            return new NextResponse("Free Trial Ended",{status:403});
        }
        
        const input = {
            fps: 24,
            width: 1024,
            height: 576,
            prompt: prompt,
            guidance_scale: 17.5,
            
        };
        await increaseApiLimit();

        const response = await replicate.run("anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", 
        { input }
        );

        
        
        return NextResponse.json(response);

    }
    catch(error){
        console.log("VIDEO GENERATION ERROR..........................",error);
        return new NextResponse("Internal Error here",{status:500});
    }
};