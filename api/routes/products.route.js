import express from "express"

import productService from "../services/product.service.js";
import validatorHandler from "../middlewares/validatorHandler.js";
import { createProductSchema, updateProductSchema, getProductSchema } from "../schemas/products.schema.js";

const router = express.Router();

const service = new productService();


router.get("/", async (req, res)=>{
     const products = await service.find()
     res.json(products)
});

router.get("/filter", async (req, res)=>{
     res.send("yo soy un filtro!")
})

router.get("/:id", 
     validatorHandler(getProductSchema, "params"),
     async (req, res, next)=>{
     try {
          const { id } = req.params;
          const product = await service.findOne(id);
          res.json(product);
     } catch (error) {
          next(error)
     }
});

router.post("/", 
     validatorHandler(createProductSchema, "body"),
     async(req, res, next)=>{
    try {
     const body = req.body;
     const newProduct = await service.create(body)
     res.status(201).json({
          message: "created",
          data: newProduct
     })
    } catch (error) {
     next(error);
    }
})

router.patch("/:id", 
     validatorHandler(getProductSchema, "params"),
     validatorHandler(updateProductSchema, "body"),
     async(req, res, next)=>{
     try {
          const {id} = req.params;
          const body = req.body;
          const product = await service.update(id, body);
          res.status(201).json(product)
     } catch (error) {
         next(error)
     }
});

router.delete("/:id", async(req, res)=>{
     const {id} = req.params;
     const product = await service.delete(id)
     res.status(201).json(product)
});

export default router;