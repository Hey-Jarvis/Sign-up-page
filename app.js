const client = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const express = require ("express");
// const request = require("request");    for olde version of node

// const { post } = require("request");    its the auto part of babel

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));



client.setConfig({

  apiKey: process.env.API_KEY,

  server: process.env.SERVER

});

app.get("/", (req,res) =>{
  res.sendFile(__dirname + "/signup.html")
})


app.post("/",(req,res)=>{

  const firstName = req.body.fname;
  
  const lastName = req.body.lname;
  
  const email = req.body.email;
  
  const subscribingUser = {fname: firstName, lname: lastName, email: email}
  
  const run = async () => {

    const lid = process.env.LIST_ID;
  
    const response = await client.lists.addListMember(lid, {

      email_address: subscribingUser.email,
  
      status: "subscribed",
  
      merge_fields: {

        FNAME: subscribingUser.fname,
  
        LNAME: subscribingUser.lname
      }
    });

    res.sendFile(__dirname + "/success.html")
    console.log(response)
  
  };


  run().catch(e => res.sendFile(__dirname + "/failure.html"));
  
});

app.post("/failure", (req,res)=>{
  res.redirect("/");  
});
  
app.listen(3000, (req,res)=>{
  console.log("Server is running on port 3000");
});

