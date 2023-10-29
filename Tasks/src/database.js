import express from "express";
import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

import admin from "firebase-admin";
import serviceAccount from "../firebaseAdminCredentials.json" assert { type: "json" };;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app=express();
//Server will run on http://localhost:4000
const port=4000;
var currUser;

//To tap into the reqest body.
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());  
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
const userSchema =new mongoose.Schema({
  _id:{type:String,
    required:true,
    unique:true,
    background:false,
  }, 
  lists:[listSchema]
});

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
    tasks:defaultItems,
});
const defaultList=[main];
const User= mongoose.model("User",userSchema);
const options={returnDocument:"after"};

//When Email is entered

//IMP:::: NEED TO FIGURE OUT WHAT TO DO WHEN USER IS ALREADY REGISTERED WITH OAUTH
async function findUser(username){
  try{
  var user= await User.findOne({_id:username}).exec()
  if(user){
    return user;
  }else{
    const user=new User({
      id:username,
      lists:defaultList,
    });
    await user.save();
    return user;
    } 
  }catch(error){
      return  User.findOne({_id:username}).exec();
    };
}

app.post("/",async (req,res)=>{
    const user= await findUser(req.body.username).then(user=>{
      const result=user.lists.map(list=>{return {name:list.name,id:list._id}});
      res.json(result);
    })
});




//Add new List to DB.
app.post('/addList',async(req,res)=>{
  const newListName=req.body.listName;
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
})

//Delete List from DB.
app.post("/deleteList",async(req,res)=>{
    const listName=req.body.listName;
    const user= await User.findByIdAndUpdate(
      req.user.id,
      {$pull:{lists:{name:listName}}}
    ).exec();
    res.json(user);
 })

//Rename list
app.post("/renameList",async(req,res)=>{
  const oldName=req.body.listName;
  const newName=req.body.newListName;
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":oldName},
      {$set:{"lists.$.name":newName}},
      options,
    ).exec();
    res.json(user);
})

//Add new task
app.post("/addTask",async(req,res)=>{
  const listName=req.body.listName;
  const content=req.body.content;
  const item=new Items({content:content});
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":listName},
      {$push:{"lists.$.tasks":item}},
      options
    ).exec();
    res.json(user);
})

//Delete a task
app.post("/deleteTask",async(req,res)=>{
  const listName=req.body.listName;
  const taskId=req.body.taskId;
    const user=await User.findOneAndUpdate(
      {_id:req.user.id,"lists.name":listName},
      {$pull:{"lists.$.tasks":{_id:taskId}}},
      options
    ).exec();
    res.json(user);
})

app.post("/getUserWithEmail",(req,res)=>{
  console.log(req.body.username);
    admin.auth()
  .getUserByEmail(req.body.username)
  .then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.status(200).json("User exist");
  })
  .catch((error) => {
    console.log('Error fetching user data:', error);
    res.status(400).json("user Not found");
  });
})

app.post("/getTasks",(req,res)=>{
    User.findOne({_id:req.body.username,"lists.id":req.body.list}).then(tasks=>{
      const result=tasks.lists[0].tasks.map(task=>{return {content:task.content,id:task._id}});
      console.log(result);
      res.json(result);
    });
})

//Get all the lists of user  
app.listen(port,()=>{
    console.log(`Server running on Port:${port}.`);
})