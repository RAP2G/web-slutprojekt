import { Router } from "express";
import {PrismaClient, Prisma, Post } from "@prisma/client";
import { Request, Response } from "express";
const feedRouter = Router()
const prisma = new PrismaClient()

feedRouter.get("/", async(req:Request, res:Response)=>{
    const  feed = await prisma.post.findMany()
    console.log(feed);
    
    res.json(feed)
})

export default feedRouter;
