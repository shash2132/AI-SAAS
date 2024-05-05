import {auth} from "@clerk/nextjs"
import { MAX_LIMIT } from "@/constants"
import prismadb from "./prismadb"

export const increaseApiLimit=async()=>{
    const {userId}=auth();
    if(!userId){
        return;
    }

    const userApiLimit= await prismadb.userApiLimit.findUnique({
        where:{
           userId 
        }
    });

    if(userApiLimit){
        await prismadb.userApiLimit.update({
            where:{userId:userId},
            data:{count:userApiLimit.count+1}
        })
    }else{
        await prismadb.userApiLimit.create({
            data:{userId:userId, count:1}
        })
    }
};

export const checkUserApiLimit=async ()=>{
    const {userId}=auth();
    if(!userId){
        return false;
    }

    const userApiLimit=await prismadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });

    if(!userApiLimit || userApiLimit.count<MAX_LIMIT){
        return true;
    }else{
        return false;
    }
}

export const countUserApiLimit=async ()=>{
    const {userId}=auth();
    if(!userId){
        return 0;
    }

    const userApiLimit=await prismadb.userApiLimit.findUnique({
        where:{userId}
    });
    if(!userApiLimit){
        return 0;
    }
    return userApiLimit.count;
} 