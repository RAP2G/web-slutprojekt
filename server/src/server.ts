import express from "express";
const app = express();


const server = async ()=>{

    const port = 5000; // default port to listen

    // define a route handler for the default home page
    app.get( "/", ( req:any, res:any ) => {
        res.send( "Hello world!" );
    } );
    
    // start the Express server
    app.listen( port, () => {
        console.log( `server started at http://localhost:${ port }` );
    } );
    
} 
export default server;
