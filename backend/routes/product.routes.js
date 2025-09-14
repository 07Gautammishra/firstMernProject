import express from 'express';
import { createProduct, deleteProduct, getProduct, updateProduct } from '../controller/product.controller.js';

const routes = express.Router();

routes.get("/", getProduct)

routes.post("/", createProduct)


routes.delete("/:id", deleteProduct)

routes.put('/:id', updateProduct)



export default routes;