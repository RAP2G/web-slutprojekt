import express, {Request,Response} from "express";
const app = express();


const server = async ()=>{

     // default port to listen

    // define a route handler for the default home page
    app.get( "/", ( req:any, res:any ) => {
        res.send( "Hello world!" );
    } );
    
    // start the Express server
    const port = process.env.SERVER_PORT || 666;

    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
    
} 
export default server;
