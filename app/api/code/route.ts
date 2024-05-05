import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import {OpenAI} from "openai";

import Anthropic from '@anthropic-ai/sdk';
import {increaseApiLimit,checkUserApiLimit} from "@/lib/api-limit"

// const openai = new OpenAI({
//     apiKey: process.env.OPEN_API_KEY,
// });


const anthropic = new Anthropic({
    apiKey: process.env["ANTHROPIC_API_KEY"]
  });

export async function POST(req:Request){
    try{
        const { userId }=auth();
        const body=await req.json();
        const {messages}=body;

        if(!userId){
            return new NextResponse("Unauthorized",{status:401})
        }

        if (!anthropic.apiKey) {
            return new NextResponse(" API Key not configured.", { status: 500 });
        }
        if(!messages){
            return new NextResponse("Provid Message",{status:400})
        }
        
        const freeTrial=await checkUserApiLimit();
        if(!freeTrial){
            return new NextResponse("Free Trial Ended",{status:403});
        }


        // const response = await openai.chat.completions.create({
        //     model: "gpt-3.5-turbo",
        //     messages
        // })

        const msg = await anthropic.messages.create({
            model: "claude-3-opus-20240229",
            max_tokens: 1024,
            system:"you need to provide the code of following and explain it with crisp comments.",
            messages
        });
        await increaseApiLimit();

        const responseData = msg.content[0].text;
        //console.log(responseData);
        //return NextResponse.json(response.choices[0].message);
        //console.log(msg);
        return NextResponse.json(responseData);

    }
    catch(error){
        console.log("CONVERSATION ERROR..........................",error);
        return new NextResponse("Internal Error here",{status:500});
    }
};