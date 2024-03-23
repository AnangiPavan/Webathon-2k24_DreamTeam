


// import verify token

const verifyToken=require('./APIs/middlewares/verify')

// import path
const path=require("path")

// importing bcryptjs
const bcryptjs=require("bcryptjs")
// nodemon = node monitering

// import { Jwt } from "jsonwebtoken"

const jwt=require("jsonwebtoken")

const exp=require('express')

const expressAsyncHandler=require("express-async-handler")

const app=exp()

// assign port number

app.listen(3500,()=>{console.log("server is running")})



// connect to react app

app.use(exp.static(path.join(__dirname,'./build')))


// get mongo client
const mclient=require("mongodb").MongoClient


// // import multer object
// const multerObject=require('./APIs/middlewares/cloudinaryConfig')

// connect to databse using mongo client


mclient
.connect('mongodb://127.0.0.1:27017')
.then((dbRef)=>{
    // connect to database
      const dbObj=dbRef.db("webathon")
    // connect to collections
    const usersCollecitonObj=dbObj.collection("userscollection")
    const LoginUsersCollection=dbObj.collection("LoginUsersCollection")
    
    // const productscollection=dbObj.collection("productscollection")
    // const productCollectionObj=dbObj.collection("productscollection")
    // connect to apis
    app.set("usersCollectionObj",usersCollecitonObj)
    app.set("LoginUsersCollection",LoginUsersCollection)
    
    // app.set("productscollection",productscollection)
    console.log("DB connection success")
})
.catch(err=>console.log("Database connect error",err))

// // sample users data
 let users=[]


// middle ware

const middleware1=(request,responce,next)=>{

      console.log("Moddle ware 1 executing");
    //   forward
    next();
}

// app.use(middleware1);

// error handler middleware

const errorhandlemiddleware=(error,request,responce,next)=>{
    responce.send({message:error.message})
};
app.use(errorhandlemiddleware)


// invalid path

// const InvalidPathMiddleware=(request,response,next)=>{
//     response.send({messege:"Invalid path"})
// }
// app.use("*",InvalidPathMiddleware)

// create user api

app.get('/get-user',middleware1,expressAsyncHandler(async(request,response)=>{
    // response.send({messege:"All users",payload:users})
    // get collections
    const userCollectionObj=request.app.get("userCollectionObj");
    // get users from db
    let dbres=await userCollectionObj.find().toArray()
    // .then((userList)=>{
    //     response.status(200).send({message:"user list",payload:userList})
    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     response.send({message:"error",errMessage:err.message})
    // })
    response.status(200).send({message:"user list",payload:dbres})
}))



// app.get('/get-user/:id',expressAsyncHandler(async(request,response)=>{
//     // // geting id
//     // let userId= +request.params.id;
//     // // geting user
//     // let user=users.find((userobj)=>userobj.id===userId)
//     // response.send({messege:'one',payload:user})
//     // get collection
//     const userCollectionObj=request.app.get("userCollectionObj")
//     // get id
//     const userid=+request.params.id
//     let dbres=await userCollectionObj.findOne({id:userid})
//     // .then((userobj)=>{
//     //     response.status(200).send({message:"User",payload:userobj})

//     // })
//     // .catch((err)=>{
//     //     console.log("error is ",err)
//     //     request.status(200).send({message:"error",errMessage:err.message})
//     // })
//     response.status(200).send({message:"User",payload:dbres})


// }))

// body parser
app.use(exp.json())

app.post('/user-signup',expressAsyncHandler(async(request,response)=>{
    // get user obj from req
    console.log(request.body)
        let newuser=request.body;
        console.log(newuser)
        // get user collection
        const usersCollecitonObj=request.app.get("usersCollectionObj");
        console.log(newuser.name)
        const userobj=await usersCollecitonObj.findOne({name:newuser.name})
        console.log(userobj)
        // checking duplicate
        if(userobj!=null){
            response.status(200).send({message:"user already existed"})
        }
        // not existed
        else{


            let hashedpassword=await bcryptjs.hash(newuser.password,5)   
            console.log(hashedpassword)  ;
        //    replace old password with hashed one
            newuser.password=hashedpassword;
              //    add CDN of cloudinary image to user obj
            //   let sampleObj=JSON.parse(request.body.user)
      

        
             // adding user
           let dbres= await usersCollecitonObj.insertOne(newuser)
            
      
        // // adding to users data
        // let dbres=await userCollecitonObj.insertOne(newuser)
    
    
    
        // // .then((dbRes)=>{
        // //     console.log(dbRes)
        // //     response.status(201).send({messege:"user created"})
        // // })
        // // .catch((err)=>{
        // //     console.log(err)
        // // });
        // // users.push(newuser)
        response.status(201).send({messege:"new user created"})
        }
    }))

// app.post('/user-signup',expressAsyncHandler(async(request,response)=>{
//     // get user obj from req
//         let newuser=request.body;
//         // get user collection
//         const userCollecitonObj=request.app.get("userCollectionObj");
//         const userobj=await userCollecitonObj.findOne({name:newuser.name})
//         console.log(userobj)
//         // checking duplicate
//         if(userobj!=null){
//             response.status(200).send({message:"user already existed"})
//         }
//         // not existed
//         else{
//             let hashedpassword=await bcryptjs.hash(newuser.password,5)   
//             console.log(hashedpassword)  ;
//         //    replace old password with hashed one
//             newuser.password=hashedpassword;
//              // adding user
//            let dbres= await userCollecitonObj.insertOne(newuser)
//         }   
        
//         // // adding to users data
//         // let dbres=await userCollecitonObj.insertOne(newuser)
    
    
    
//         // // .then((dbRes)=>{
//         // //     console.log(dbRes)
//         // //     response.status(201).send({messege:"user created"})
//         // // })
//         // // .catch((err)=>{
//         // //     console.log(err)
//         // // });
//         // // users.push(newuser)
//         response.status(201).send({messege:"new user created"})
//     }))

app.put('/update-user',expressAsyncHandler(async(request,response)=>{

    // // get modified user from client
    // let ModUser=request.body;
    // // get index of existing user
    // let IndexOfExistingUser=users.findIndex((userobj)=>userobj.id===ModUser.id);

    // // replace user
    // users.splice(IndexOfExistingUser,1,ModUser)

    // if(IndexOfExistingUser===-1){
    //     response.send("User not found")
    // }
    // else{
    // response.send("user updated")
    // }

    // get user collection
    const userCollecitonObj=request.app.get("userCollectionObj");
    // get modified user
    const modUserObj=request.body;
    // update user in db
    let dbres=await userCollecitonObj.updateOne({id:modUserObj.id},{$set:{...modUserObj}})
    // .then((dbRef)=>{
    //     response.status(200).send({message:"user updated"})
    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     request.status(200).send({message:"error",errMessage:err.message})
    // })
    response.status(201).send({message:"user updated"})

}))

app.delete('/delete-user/:name',expressAsyncHandler(async(request,response)=>{
    // // get user id from url
    // let UserId=+request.params.id;
    // // get id
    // let DelUserId=users.findIndex((userobj)=>userobj.id===UserId)
    // //deleting
    // console.log(DelUserId)
    // if(DelUserId===-1){
    //     response.send("User not found to delete")
    // }
    // else{
    // users.splice(DelUserId,1)
    // response.send("user deleted")
    // }
     // get user collection
     const userCollecitonObj=request.app.get("userCollectionObj");

    //  get deleted userid
    const delUsername=request.params.name
        // delete user
    let dbres=await userCollecitonObj.deleteOne({name:delUsername})
    // .then((dbRef)=>{
    //     response.send({message:"Deleted sucess"})

    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     request.status(200).send({message:"error",errMessage:err.message})
    // })
    response.status(200).send({message:"Deleted sucess"})

}))


app.put('/update-user/:name',expressAsyncHandler(async(request,response)=>{

    // // get modified user from client
    // let ModUser=request.body;
    // // get index of existing user
    // let IndexOfExistingUser=users.findIndex((userobj)=>userobj.id===ModUser.id);

    // // replace user
    // users.splice(IndexOfExistingUser,1,ModUser)

    // if(IndexOfExistingUser===-1){
    //     response.send("User not found")
    // }
    // else{
    // response.send("user updated")
    // }

    // get user collection
    const userCollecitonObj=request.app.get("userCollectionObj");
    // get modified user
    const modUserObj=request.body;
    console.log(modUserObj)
    const username=request.params.name;
    console.log(username)
    // update user in db
    let dbres=await userCollecitonObj.updateOne({name:username},{$set:{...modUserObj}})
    // .then((dbRef)=>{
    //     response.status(200).send({message:"user updated"})
    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     request.status(200).send({message:"error",errMessage:err.message})
    // })
    response.status(201).send({message:"user updated"})

}))


app.get('/get-user/:name',verifyToken,expressAsyncHandler(async(request,response)=>{
    // get collection

    const userCollecitonObj=request.app.get("userCollectionObj")
    // get user from url

    const usernamefromurl=request.params.name;
    // get user by username
    const userDB=await userCollecitonObj.findOne({name:usernamefromurl});
    console.log(userDB)
    // if user not exit

    if(userDB===null){
        response.status(200).send({message:"user not found"})
    }
    // if user exit
   else{
        // remove password
        delete userDB.password;
        response.status(200).send({message:"user",payload:userDB})
   }

}))


app.post('/login-users',expressAsyncHandler(async(request,response)=>{
    // get user obj from req
    console.log(request.body)
        let newuser=request.body;
        console.log(newuser)
        // get user collection
        const LoginUsersCollecitonObj=request.app.get("LoginUsersCollection");
        console.log(newuser.name)
        const userobj=await LoginUsersCollecitonObj.findOne({name:newuser.name})
        console.log(userobj)
        // checking duplicate
        if(userobj!=null){
            response.status(200).send({message:"user already existed"})
        }
        // not existed
        else{


            let hashedpassword=await bcryptjs.hash(newuser.password,5)   
            console.log(hashedpassword)  ;
        //    replace old password with hashed one
            newuser.password=hashedpassword;
              //    add CDN of cloudinary image to user obj
            //   let sampleObj=JSON.parse(request.body.user)
      

        
             // adding user
           let dbres= await LoginUsersCollecitonObj.insertOne(newuser)
            
      
        // // adding to users data
        // let dbres=await userCollecitonObj.insertOne(newuser)
    
    
    
        // // .then((dbRes)=>{
        // //     console.log(dbRes)
        // //     response.status(201).send({messege:"user created"})
        // // })
        // // .catch((err)=>{
        // //     console.log(err)
        // // });
        // // users.push(newuser)
        response.status(201).send({messege:"new user created"})
        }
    }))

// user login request
// public route
app.post('/user-login',expressAsyncHandler(async(request,response)=>{
    // console.log(request.headers)
   // get user collection
   const usersCollectionObj=request.app.get("usersCollectionObj");
    // get user credentails
    const userCredObj=request.body;
    console.log(userCredObj)
    // verify user
    let userDBObj=await usersCollectionObj.findOne({name:userCredObj.name})
    // if name invalid
    console.log(userDBObj)
    if(userDBObj===null){
        response.status(200).send({message:"username invalid"})
    }
    // if name is valid
    else{
        // verify password
        let isEqual=await bcryptjs.compare(userCredObj.password,userDBObj.password);
        // if password not matched
        if(isEqual===false){
            response.status(201).send({message:"Invalid password"})
        }
        else{
            // if password matched
            // create a jwt(json web token)

            let jwtToken=jwt.sign({name:userDBObj.name},"absdcdh",{expiresIn:"1h"})
            response.status(200).send({message:"Valid user",token:jwtToken,user:userDBObj})
        }
    }
}))



app.get('/test',verifyToken,expressAsyncHandler(async(request,response)=>{
    console.log(request.headers)
    response.status(200).send({messege:"Reply from private route"})
}))


// removed user post request

app.post('/users-removed',expressAsyncHandler(async(request,response)=>{
    // get user obj from req
        let removeduser=request.body;
        console.log(removeduser)
        // get user collection
        const removeduserCollectionObj=request.app.get("removedusers");
        console.log(removeduser.name)
        const removeduserobj=await removeduserCollectionObj.findOne({name:removeduser.name})
        console.log(removeduserobj)
        // checking duplicate
        if(removeduserobj!=null){
            response.status(200).send({message:"user already existed"})
        }
        // not existed
        else{
            let hashedpassword=await bcryptjs.hash(removeduser.password,5)   
            console.log(hashedpassword);
        //    replace old password with hashed one
            removeduser.password=hashedpassword;
             // adding user
           let dbres= await removeduserCollectionObj.insertOne(removeduser)
        }   
        
        // // adding to users data
        // let dbres=await userCollecitonObj.insertOne(newuser)
    
    
    
        // // .then((dbRes)=>{
        // //     console.log(dbRes)
        // //     response.status(201).send({messege:"user created"})
        // // })
        // // .catch((err)=>{
        // //     console.log(err)
        // // });
        // // users.push(newuser)
        response.status(201).send({messege:"new user created"})
    }))

// removed user get request

app.get('/get-removedusers',expressAsyncHandler(async(request,response)=>{
    // response.send({messege:"All users",payload:users})
    // get collections
    const removeduserCollectionObj=request.app.get("removedusers");
    console.log(removeduserCollectionObj)
    // get users from db
    let dbres=await removeduserCollectionObj.find().toArray()
    console.log(dbres)
    // .then((userList)=>{
    //     response.status(200).send({message:"user list",payload:userList})
    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     response.send({message:"error",errMessage:err.message})
    // })
    response.status(200).send({message:"user list",payload:dbres})
}))

// delete request after restored in removed user component
app.delete('/delete-removeduser/:name',expressAsyncHandler(async(request,response)=>{
    // // get user id from url
    // let UserId=+request.params.id;
    // // get id
    // let DelUserId=users.findIndex((userobj)=>userobj.id===UserId)
    // //deleting
    // console.log(DelUserId)
    // if(DelUserId===-1){
    //     response.send("User not found to delete")
    // }
    // else{
    // users.splice(DelUserId,1)
    // response.send("user deleted")
    // }
      // get collections
    const removeduserCollectionObj=request.app.get("removedusers");

    //  get deleted userid
    const delUsername=request.params.name
        // delete user
    let dbres=await removeduserCollectionObj.deleteOne({name:delUsername})
    // .then((dbRef)=>{
    //     response.send({message:"Deleted sucess"})

    // })
    // .catch((err)=>{
    //     console.log("error is ",err)
    //     request.status(200).send({message:"error",errMessage:err.message})
    // })
    response.status(200).send({message:"Deleted sucess"})

}))


    
// middleware to deal with refresh page
const pageRefresh=(request,response,next)=>{
    response.sendFile(path.join(__dirname,'./build/index.html'))
    }
    
    app.use("/*",pageRefresh)
    

    

const { request } = require('express')

const fileUpload=require('express-fileupload')
const pdfParse=require('pdf-parse')





// app.use('/',exp.static('public'))

// app.post('/extract-txt',(req,res)=>{

//   if(!req.files && !req.files.pdfFile){
//     res.status(400)
//     res.end()
//   }

//   pdfParse(request.files.pdfFile)
//   .then(result=>{
//     res.send(result.text)
//   })

// })

// app.use(fileUpload())

    
    