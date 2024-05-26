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
     return res.render("new-product", {errorMessage:null});
    }


    addNewProduct(req,res){
      // Validate data before uploading
      // extract the data
      const{name,price,imageUrl} = req.body;
      let errors = [];
      if(!name || name.trim() == ''){
        errors.push("Name is required");
      }

      if(!price || parseFloat(price)<1){
        errors.push("price must be a positive value ");
      }

      try{
        const validUrl = new URL(imageUrl);
      }catch(err){
        errors.push("URL is invalid");
      }
      if(errors.length>0){
        return res.render("new-product", {errorMessage: errors[0]});
      }
      ProductModel.add(req.body)
      let products = ProductModel.get();
     return res.render('products',{products:products});

    }
}