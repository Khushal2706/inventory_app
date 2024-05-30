import * as path from "path"
import ProductModel from "../models/product.model.js";

export default class productController{

    getProducts(req,res,next){
        let products = ProductModel.get();
        //console.log(products);
        res.render("products",{products:products});
      // return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }


    addForm(req,res,next){
     return res.render("new-product", {errorMessage:null});
    }


    addNewProduct(req,res,next){
      // Validate data before uploading
      // extract the data
      
      ProductModel.add(req.body)
      let products = ProductModel.get();
     return res.render('products',{products:products});

    }
    getUpdateProductView(req,res,next){
        //1. if product exists then return view.
        const id = req.params.id;
        const productFound = ProductModel.getById(id);
        if(productFound){
          res.render('update-product',{product:productFound, errorMessage:null});     
           }
        //2. else return errors.
        else{
          res.status(401).send('Product not Found');
        }
    }

    postUpdateProduct(req,res){
      ProductModel.update(req.body)
      var products = ProductModel.get();
     return res.render('products',{products:products});
    }
}