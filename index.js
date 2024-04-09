
import express from "express"
import productController from "./src/controllers/product.controller.js"

const server = express();

// create an instance of Product Controller

const ProductController = new productController();
server.get('/', ProductController.getProducts);
server.use(express.static('src/views'));

server.listen(3400,()=>{
    console.log("Server is Listening at Port 3400");
});