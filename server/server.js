const express = require("express");
const app = express();
const User = require("./schemas/user.js")
require("./database/db.js")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Blog = require("./schemas/blog.js");
app.use(express.json());
app.use(cookieParser());
app.use(cors({  origin: 'http://localhost:3000',
credentials: true}));






app.get("/",(req,res)=>{
    res.send("Hello from the other side")
})
app.post("/user",async (req,res)=>{
    const {name,email,password,confirmpassword} = req.body;
    if(!password || !confirmpassword || password.length<=7 || confirmpassword.length<=7){
        res.sendStatus(400);
    }
    else{

        const findUser =await User.findOne({email});
        if(findUser){
            res.sendStatus(404);
        }
        else{
            const hashPassword = await bcrypt.hash(password,12);
            const hashConfirmPassword =await bcrypt.hash(confirmpassword,12);
            const user = await User.create({name,email,password:hashPassword,confirmpassword:hashConfirmPassword});
            if(user){
                res.send(user);
            }
            else{
                res.sendStatus(400);
            }
        }
    }
})
app.post("/auth",async (req,res)=>{
    const {email,password} = req.body;
    const findUser = await User.findOne({email});
    if(findUser){
    const isMatch = bcrypt.compare(password,findUser.password);
    if(isMatch){
        
        const token = jwt.sign({_id:findUser._id},"ALIBURHANSSECRETKEYISVERYIMPORTANT");
        res.cookie("jwtoken",token)
        res.sendStatus(201);
    }
    }
})



app.get("/usersdata",async (req,res)=>{
    const token = req.cookies.jwtoken;
    const decoded = jwt.verify(token,"ALIBURHANSSECRETKEYISVERYIMPORTANT");
    const user = await User.findById(decoded._id);
    if(user){
        res.send(user);
        }
        else{
            res.sendStatus(404);
            }
})



app.post("/blog",async (req,res)=>{
    const {blogTitle,blogDesc,blogPic} = req.body;
    const blog = await Blog.create({blogTitle,blogDesc,blogPic});
    if(blog){
        res.send(blog);
        }
        else{
            res.sendStatus(400);
            }
            
})

app.get("/getblogs",async(req,res)=>{
    const user = await Blog.find({});
    if(user){
        res.send(user);
        }
        else{
            res.sendStatus(404);
            }

})

app.listen(8000,()=>{
    console.log(`listeing at port 8000`);
})