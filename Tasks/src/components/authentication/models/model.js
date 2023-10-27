import express from "express";
import bodyParser from "body-parser";
//import ejs from ejs;
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import passportLocalMongoose from "passport-local-mongoose";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import findOrCreate from "mongoose-findorcreate";
import sendMail from "./mailer.js"
const app=express();
//Server will run on http://localhost:4000
const port=4000;
var currUser;

//To tap into the reqest body.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use((req, response, next) => {  
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Credentials", "true");
  response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

//Connect with mongoDb->Tasks database (username & password is mongo);
mongoose.connect("mongodb+srv://mongo:mongo@cluster0.azc9vfb.mongodb.net/Tasks");

//Create schema for tasks , lists and user.
const taskSchema=new mongoose.Schema({
    content:String
});
const listSchema= new mongoose.Schema({
    name:String,
    tasks:[taskSchema]
});


userSchema.plugin(passportLocalMongoose); 
userSchema.plugin(findOrCreate);

//Create items to populate tasks for new user;
const Items= mongoose.model("Items",taskSchema);
const item1=new Items({
    content:"You can easily keep track your tasks here",
});
const item2=new Items({
    content:"Try creating new tasks by clicking on + button below.",
});
const item3=new Items({
    content:"You can also create different lists here to separate your tasks.",
});
const defaultItems=[item1,item2,item3];

const Lists= mongoose.model("List",listSchema);
const main= new Lists({
    name:"main",
    items:defaultItems,
});
const User= mongoose.model("User",userSchema);


passport.use(User.createStrategy());

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
      });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

var currEmail;
passport.use(new GoogleStrategy({
    clientID: "1019744542239-nmhk54tmtmn2eh0juss0pkq673ri71c9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/tasks"
  },
  function(accessToken, refreshToken, profile, cb) {
    currEmail=profile.emails[0].value;
    User.findOrCreate({ googleId: profile.id ,emailId:profile.emails[0].value,name:profile.name.givenName}, function (err, user) {
      return cb(err, user);
    });
  }
));

const options={returnDocument:"after"};

//When Email is entered

//IMP:::: NEED TO FIGURE OUT WHAT TO DO WHEN USER IS ALREADY REGISTERED WITH OAUTH
async function findUser(username){
  const user=await User.findOne({username:username}).exec();
  return user;
}
app.post("/",async (req,res)=>{
    const user=await findUser(req.body.username);
    if(user){
      console.log(user);
      res.json({name:user.name});
    }
    else{
      res.status(400).json({error:"User Not Found"});
    }
});

//When password is entered to login
app.post("/signin",async(req,res)=>{
    const user=await findUser(req.body.username);
    if(!user) {
      res.status(400).json({message:"User Not found."});
    }
    req.login(user, function(err){
        if (err) {
            res.status(400).json({message:"Wrong Password."});
        } else {
            passport.authenticate("local")(req, res, function(){
                res.json(user.name);
            });
        }
    });
});

//Sign up
app.post("/signup", async function(req, res){
    findUser(req.body.username).then((user)=>{
      
      if(user){
        res.status(409).send("User with given email already exists.");
        return ;
      }
      else{
      User.register({username:req.body.username,emailId:req.body.username,name:req.body.name}, req.body.password, function(err, user){
        console.log("New user Created");

        if (err) {
          console.log(err);
          res.status(400).json({error:err});
        } else {
            sendMail(1234,"hritikkaushik@gmail.com")
            .then((result) => console.log("Email sent...", result))
            .catch((error) => console.log(error.message));
            // res.redirect("/signin");
        }
      });
    }
    });
    
       
});


//Google oAuth
app.get("/auth/google",passport.authenticate("google", { scope: ["profile","email"] }));
app.get("/auth/google/tasks", 
  passport.authenticate("google", { failureRedirect: "/auth/google" }),
  function(req, res) {
    res.json(req.user);
  });

//Add new List to DB.
app.post('/addList',(req,res)=>{
  //const newListName=req.body.listName;
  const newListName=req.body.listName;
  passport.authenticate("local")(req, res, async function(){
    const user=await User.findById(req.user.id).exec();
    const list=await User.findOne({id:req.user.id,"list.name":newListName}).exec();
    if(list) {
      res.status(400).json("List already exist.");
    }else{
      console.log(user);
      user.lists.push(new Lists({name:newListName,tasks:defaultItems}));
      user.save();
      res.json(user);
    }
  });
})

//Delete List from DB.
app.post("/deleteList",(req,res)=>{
    const listName=req.body.listName;
    passport.authenticate("local")(req, res, async function(){
      const user= await User.findByIdAndUpdate(
        req.user.id,
        {$pull:{lists:{name:listName}}}
      ).exec();
      res.json(user);
    });
 })

//Rename list
app.post("/renameList",(req,res)=>{
  const oldName=req.body.listName;
  const newName=req.body.newListName;
  passport.authenticate("local")(req, res, async function(){
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":oldName},
      {$set:{"lists.$.name":newName}},
      options,
    ).exec();
    res.json(user);
  });
})

//Add new task
app.post("/addTask",(req,res)=>{
  const listName=req.body.listName;
  const content=req.body.content;
  const item=new Items({content:content});
  passport.authenticate("local")(req, res, async function(){
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":listName},
      {$push:{"lists.$.tasks":item}},
      options
    ).exec();
    res.json(user);
  });
})

//Delete a task
app.post("/deleteTask",(req,res)=>{
  const listName=req.body.listName;
  const taskId=req.body.taskId;

  passport.authenticate("local")(req, res, async function(){
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":listName},
      {$pull:{"lists.$.tasks":{_id:taskId}}},
      options
    ).exec();
    res.json(user);
  });
})



//Get all the lists of user  
app.listen(port,()=>{
    console.log(`Server running on Port:${port}.`);
})