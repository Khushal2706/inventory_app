
import express from "express"
import productController from "./src/controllers/product.controller.js"
import path from "path"
import ejsLayouts from "express-ejs-layouts"

const server = express();

// create an instance of Product Controller

// setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);

const ProductController = new productController();
server.get('/', ProductController.getProducts);
server.use(express.static('src/views'));
server.get("/new",ProductController.addForm);
server.post("/", ProductController.addNewProduct);

server.listen(3400,()=>{
    console.log("Server is Listening at Port 3400");
});