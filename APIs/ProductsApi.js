// Product Api

const exp=require("express")

const productapp=exp.Router()

// create api

productapp.get("/get-product",(request,response)=>{
    response.send({messege:"All products"})
})

productapp.post("/create-product",(request,response)=>{
    response.send({messege:"product created"})
})

productapp.delete("/delete-product",(request,response)=>{
    response.send({messege:" product deleted "})
})


module.exports=productapp;