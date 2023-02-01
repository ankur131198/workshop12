const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/User')
//Databse Connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
mongoose.connection.on("connected",()=>{
    console.log("Datbase connected");
})
mongoose.connection.on("error",()=>{
    console.log("Database Error")
})
//init server
const app=express();
app.use(express.json());
app.get('/users', async(req,res)=>{
    try {
        const page=parseInt(req.query.page)-1||0;
        const limit =parseInt(req.query.limit) ||5;
        const selectionkeys=req.query.selectionkeys
        const searchkey=req.query.searchkey || "";
        const searchvalue=req.query.searchvalue || "";
        const sort=req.query.sort || "";
        const users= await 
        User.find({username:{$regex:new RegExp('^'+searchvalue+".*"), $options:"i"}})
        .select(selectionkeys)
        .limit(limit*1)
        .skip(page*limit);
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
})
app.listen(3000,(req,res)=>{
    console.log("listening on port 3000");
})
// const express=require('express');
// const mongoose=require('mongoose');

// // const mongoose=require('mongoose');

// // const DB_URL="mongodb://localhost:27017/test";
// // const User=require("./models/User");

// // mongoose.connect(
// //     DB_URL,
// //     {
// //         useNewUrlParser:true,useUnifiedTopology:true},
// //         ()=>{
// //             console.log("connected to mongodb");
// //         }
// // );

// const User=require('./models/User')
// //Databse Connection
// mongoose.connect('mongodb://127.0.0.1/ttl')
// mongoose.connection.on("connected",()=>{
//     console.log("Datbase connected");
// })
// mongoose.connection.on("error",()=>{
//     console.log("Database Error")
// })


// const app=express();
// app.use(express.json());

// app.get('/users', async(req,res)=>{
//     try {
//         const page=parseInt(req.query.page)-1||0;
//         const limit =parseInt(req.query.limit) ||5;
//         const selectionkeys=req.query.selectionkeys
//         const searchkey=req.query.searchkey || "";
//         const searchvalue=req.query.searchvalue || "";
//         const sort=req.query.sort || "";
//         const user= await playlists.find({username:{$regex:'a',$options:'i'}}).forEach(user)
//         .select(selectionkeys)
//         .limit(limit*1)
//         .skip(page*limit);
//         res.json(user);
//     } catch (error) {
//         console.log(error)
//         res.status(500).send("Internal Server Error")
//     }
// })
// app.listen(3000,(req,res)=>{
//     console.log("listening on port 3000");
// })