import {PrismaClient, Prisma, Post } from "@prisma/client";
import express, {Request,Response} from "express";
import fileupload, { UploadedFile } from 'express-fileupload'
import cors from 'cors'
import path from "path"
import postRouter from "./routes/post";
const prisma = new PrismaClient()
const app = express();
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }, // ~~52Mb5
          responseOnLimit: 'File size is too big',
          abortOnLimit: true,
          preserveExtension: true,
}))
const server = async ()=>{
    app.use(cors())
    app.get( "/", ( req:Request, res:Response ) => {
        res.send( "Hello world!" );
    } );
    // app.use('/upload', postRouter)
    // app.use
    app.get("/feed", async(req:Request, res:Response)=>{
        const  feed = await prisma.post.findMany()
        
        return res.json(feed)
    })

    
    
    app.post("/upload",  async(req:Request, res:Response)=>{
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
        // start the Express server

        app.get('/posts/:id', (req:Request, res:Response) => {
            const { id } = req.params;
          
            return res.sendFile(path.join(__dirname, `../post/${id}`));
          });
          
    const port = process.env.SERVER_PORT || 666;    

    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
    
} 
export default server;
