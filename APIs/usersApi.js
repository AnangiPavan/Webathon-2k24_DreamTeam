



const exp=require("express")

const usersapp=exp.Router()


// sample users data
let users=[]

// create user api

usersapp.get('/get-user',middleware1,(request,response)=>{
    response.send({messege:"All users",payload:users})
})

usersapp.get('/get-user/:id',(request,response)=>{
    // geting id
    let userId= +request.params.id;
    // geting user
    let user=users.find((userobj)=>userobj.id===userId)
    response.send({messege:'one',payload:user})
})

// body parser
usersapp.use(exp.json())

usersapp.post('/create-user',(request,response)=>{
// get user obj from req
    let newuser=request.body;

    // adding to users data
    users.push(newuser)

    response.send({messege:"new user created"})
})

usersapp.put('/update-user',(request,response)=>{

    // get modified user from client
    let ModUser=request.body;
    // get index of existing user
    let IndexOfExistingUser=users.findIndex((userobj)=>userobj.id===ModUser.id);

    // replace user
    users.splice(IndexOfExistingUser,1,ModUser)

    if(IndexOfExistingUser===-1){
        response.send("User not found")
    }
    else{
    response.send("user updated")
    }
})

usersapp.delete('/delete-user/:id',(request,response)=>{
    // get user id from url
    let UserId=+request.params.id;
    // get id
    let DelUserId=users.findIndex((userobj)=>userobj.id===UserId)
    //deleting
    console.log(DelUserId)
    if(DelUserId===-1){
        response.send("User not found to delete")
    }
    else{
    users.splice(DelUserId,1)
    response.send("user deleted")
    }
})


module.exports=usersapp;

