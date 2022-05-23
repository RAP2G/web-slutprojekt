import { PrismaClient } from '@prisma/client'
import express, {Request,Response} from "express";
import fileupload, { UploadedFile } from 'express-fileupload'
import cors from 'cors'
import path from "path"
import postRouter from "./routes/post";
const prisma = new PrismaClient()
const app = express();
// Sätter en limit på hur stora bilderna får vara
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }, // ~~52Mb
          responseOnLimit: 'File size is too big',
          abortOnLimit: true,
          preserveExtension: true,

}))
        app.use(cors())
const server = async ()=>{
    app.get( "/", ( req:Request, res:Response ) => {
        res.send( "Hello world!" );
    } );
    // Skapar en feed route som frontend använder för att hämta alla poster
    app.get("/feed", async(req:Request, res:Response)=>{
        const  feed = await prisma.post.findMany()
        
        return res.json(feed)
    })

    
    // Skapar routen där frontend laddar upp bilderna
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
