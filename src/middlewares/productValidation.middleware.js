import { body, validationResult } from "express-validator";
const validateRequest = async(req,res,next)=>{
   
    // 1. Setup the rules for validation.
  const rules = [
    body('name').notEmpty().withMessage("Name is Required"),
    body('price').isFloat({gt:0}).withMessage("Price should be a Positive Value"),
    body('imageUrl').isURL().withMessage("Invalid URL")
  ]
    // 2. Run those Rules.
  await Promise.all(rules.map((rule)=> rule.run(req)));
    // 3. check if there are any erros after running the rules.
    var validationErrors = validationResult(req);
    // 4. if errors, return error message
    console.log(validationErrors)
      if(!validationErrors.isEmpty()){
        return res.render("new-product", {errorMessage: validationErrors.array()[0].msg});
      }
      next();
};

export default validateRequest;