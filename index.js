
import express, { urlencoded } from "express"
import productController from "./src/controllers/product.controller.js"
import userController from "./src/controllers/user.controller.js"
import path from "path"
import ejsLayouts from "express-ejs-layouts"
import validateRequest from "./src/middlewares/productValidation.middleware.js"
import { uploadFile } from "./src/middlewares/file-upload.middleware.js"
const server = express();

// parse form data

server.use(express.urlencoded({extended:true}));
// create an instance of Product Controller

// setup view engine settings
server.set("view engine","ejs");
server.set("views",path.join(path.resolve(),'src','views'));

server.use(ejsLayouts);
server.use(express.static('public'));

const ProductController = new productController();
const usersController = new userController();
server.get('/', ProductController.getProducts);
server.get('/register', usersController.getRegister);
server.post('/register', usersController.postRegister);
server.get('/login', usersController.getLogin);
server.post('/login', usersController.postLogin);
server.get('/update-product/:id', ProductController.getUpdateProductView);
server.post('/delete-product/:id',ProductController.deleteProduct);
server.use(express.static('src/views'));
server.get("/new",ProductController.addForm);
server.post("/", uploadFile.single('imageUrl'),validateRequest,ProductController.addNewProduct);
server.post('/update-product', ProductController.postUpdateProduct);

server.listen(3400,()=>{
    console.log("Server is Listening at Port 3400");
});