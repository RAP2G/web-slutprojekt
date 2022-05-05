import express, {Request,Response} from "express";
import fileupload, { UploadedFile } from 'express-fileupload'
import path from "path"

const app = express();
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 }, // ~~52Mb
          responseOnLimit: 'File size is too big',
          abortOnLimit: true,
          preserveExtension: true,
}))
const server = async ()=>{

     // default port to listen

    // define a route handler for the default home page
    app.get( "/", ( req:any, res:any ) => {
        req.send( "Hello world!" );
    } );
    
    app.post("/upload",  async(req:Request, res:Response)=>{
        console.log(req.files);
        console.log(req.files.files);
        
        const file = req.files.files  as UploadedFile
        console.log(file);
        
        if (!file) {
            return res.json({
              status: false,
              message: 'Not sufficient data',
            });
          }

        await file.mv(`./post/${file.md5}${path.extname(file.name)}`);

        res.send("File Uploaded");

        

    })
        // start the Express server
    const port = process.env.SERVER_PORT || 666;    

    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
    
} 
export default server;
