
import express from "express"
import productController from "./src/controllers/product.controller.js"
import path from "path"

const server = express();

// create an instance of Product Controller

// setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'));

const ProductController = new productController();
server.get('/', ProductController.getProducts);
server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log("Server is Listening at Port 3400");
});