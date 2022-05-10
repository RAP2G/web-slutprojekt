import { Router } from "express";
import {PrismaClient, Prisma, Post } from "@prisma/client";
import path from "path";
import { UploadedFile } from 'express-fileupload';

import { Request, Response } from "express";
const postRouter = Router()
const prisma = new PrismaClient()

postRouter.post("/",  async(req:Request, res:Response)=>{
    console.log(req.files.files);
    
    const file = req.files.files  as UploadedFile        
    if (!file) {
        return res.json({
          status: false,
          message: 'Not sufficient data',
        });
      }
      
      await file.mv(`./post/${file.md5}${path.extname(file.name)}`);
      const post = await prisma.post.create({
          data: {
              picture: `${req.protocol}://${req.hostname}:${
                  process.env.SERVER_PORT
                }/posts/${file.md5}${path.extname(file.name)}`
            }
        })
    console.log(post);
    
      res.send("File Uploaded");

    

})

export default postRouter