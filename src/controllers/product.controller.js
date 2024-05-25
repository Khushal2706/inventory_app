import * as path from "path"
import ProductModel from "../models/product.model.js";

export default class productController{

    getProducts(req,res){
        let products = ProductModel.get();
        //console.log(products);
        res.render("products",{products:products});
      // return res.sendFile(path.join(path.resolve(),'src','views','products.html'));
    }


    addForm(req,res){
     return res.render("new-product");
    }


    addNewProduct(req,res){
      console.log(req.body);
      ProductModel.add(req.body)
      let products = ProductModel.get();
     return res.render('products',{products:products});

    }
}