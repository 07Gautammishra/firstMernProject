import { data } from 'react-router-dom'
import {create} from 'zustand'

export const useProductStore = create((set)=>({
    products: [],
    setProducts: (products)=> set({products}),
    CreateProduct: async(newProduct)=>{
        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message:"please fill in all fields."}
        }
        try{
            const res = await fetch("/api/products",{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(newProduct)
            })
            const data= await res.json()
            set((state)=> ({products:[...state.products, data.data]}))
            return {success: true, message:data.message}
        }catch(e){
            console.error(e.message)
            return {success: false, message:e.message}

        }
    },
    fetchProduct: async()=>{
        try{
            const res= await fetch("/api/products")
            const data = await res.json()
            set({ products: data.data})
        }catch(e){
            console.error("Error" , e.message);
        }
    },
    deleteProduct: async(id)=>{
        const res = await fetch(`/api/products/${id}` ,{
            method: "DELETE",
        })
        const data = await res.json()
        if(!data.success) return {success: data.success, message: data.message}
        set(state => ({products: state.products.filter(product=> product._id!==id)}))
        return {success: data.success, message: data.message}
    },
    updateProductDetail: async(uddatefields,pid)=>{
        const res = await fetch(`/api/products/${pid}`,{
            method: "PUT",
             headers:{
                    "Content-Type": "application/json"
                },
                body:JSON.stringify(uddatefields)
        })
        const  data = await res.json()
        if (!data.success) {
            return {success: data.success , message: data.message}
        }
    set(state => ({products: state.products.map(product=> product._id===pid? data.data : product)}))
        return {success: data.success , message: data.message}
    }
}));
