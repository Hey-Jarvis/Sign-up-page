const client = require("@mailchimp/mailchimp_marketing");
const { response } = require("express");
const express = require ("express");
// const request = require("request");    for olde version of node
const https = require("https");
// const { post } = require("request");    its the auto part of babel

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));



client.setConfig({

    apiKey: "e44ebf8292f86235c74f0a0a92ab22e7-us6",
  
    server: "us6",
  
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
  
     const response = await client.lists.addListMember("026f92d3d0", {
  
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

