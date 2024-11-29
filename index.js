import express from "express";
const app = express()

app.listen(8080,()=>{
    console.log("Server started at port 8080.")
})

import {MongoClient, ObjectId} from "mongodb"; 
const uri = "mongodb+srv://ramyaswarna725:rizerUKa2eNbMuct@cluster0.igylx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" //my local computer has connected
const client = new MongoClient(uri) 
const db = client.db("ecomm") //to access mongodb these 3 lines are used
import cors from "cors" //crossorigin - used for api calling
app.use(express.json()) //this commad to receive and process the data
app.use(cors());


// app.get("/customer",(req,res)=>{
//     res.send("Name:Ramya Swarna Email:rswarna@gmail.com")
// })

app.get("/", async(req,res)=>{                                                  //arrow function 
    const items = await db.collection("products").find().toArray()
    res.status(200).json(items);    //this is nothing but an array of objects which will be stored in the frontend application
});


app.post("/", async (req, res) => {
    const { name, price, desc, url } = req.body;
    const data = {
      name: name,
      price: price,
      desc: desc,
      url:url
    };
    const newProduct = await db.collection("products").insertOne(data);
    res.status(200).json(newProduct);
  });
  
  
  app.delete("/:id", async (req, res) => {
      const id = req.params.id;
      const newProduct = await db.collection("products").deleteOne({_id:new ObjectId(id)});
      res.status(200).json(newProduct);
    });