
import express, { urlencoded } from "express"
import productController from "./src/controllers/product.controller.js"
import path from "path"
import ejsLayouts from "express-ejs-layouts"
import validateRequest from "./src/middlewares/productValidation.middleware.js"

const server = express();

// parse form data

server.use(express.urlencoded({extended:true}));
// create an instance of Product Controller

// setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);

const ProductController = new productController();
server.get('/', ProductController.getProducts);
server.get('/update-product/:id', ProductController.getUpdateProductView);
server.use(express.static('src/views'));
server.get("/new",ProductController.addForm);
server.post("/",validateRequest, ProductController.addNewProduct);
server.post('/update-product', ProductController.postUpdateProduct);

server.listen(3400,()=>{
    console.log("Server is Listening at Port 3400");
});