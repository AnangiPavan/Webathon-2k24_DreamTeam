const cloudinary=require("cloudinary").v2;
const multer=require("multer")
const {CloudinaryStorage}=require("multer-storage-cloudinary")


// configure cloudinary

cloudinary.config({
    cloud_name:"diguohzi0",
    api_key:"538326281488457",
    api_secret:"J4029rMswh9dKtWbBGPLUXU2k_0"
})

// configure cloudinary storage

let clStorage=new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:"usersapp",
        public_id:(request,file)=>file.fieldname+"-"+Date.now()
    }
})


// configure multer

let multerObject=multer({
    storage:clStorage
})

// export multer object
module.exports=multerObject