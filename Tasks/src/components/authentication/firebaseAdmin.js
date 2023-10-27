import express from "express";


import admin from "firebase-admin";
import serviceAccount from "../../../firebaseAdminCredentials.json" assert { type: "json" };;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const app=express();
app.use(express.json());

app.use((req, response, next) => {  
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Credentials", "true");
    response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

const port=5000;

app.post("/",async(req,res)=>{
    // const {authToken}=req.headers;
    // await admin.auth.verifyIdToken(authToken);
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

app.listen(port,()=>{
    console.log(`Server running on Port:${port}.`);
})