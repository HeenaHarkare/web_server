const express  = require("express");
const mongoose = require("mongoose");
require('dotenv').config();

const app = express();
app.use(express.json());

async function connectDB(){
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log("MongoDB connected");
    
   
}

connectDB();

const productSchema = new mongoose.Schema({
    name: String,
    price:Number,
    category:String
});

const Product = mongoose.model('Product',productSchema);
// asynchronos means server not blocked

// POST - Create
app.post('/product',async (req,res) =>{
    await Product.create(req.body);
    res.send("Response send successfully.......!");
    

});

// GET - Read
app.get('/product',async (req,res) =>{
    // res.send('Hello the Data is Readed');
    const products = await Product.find();
    res.send(products);
});
// PUT - UPDATE  add /:id for update
app.put('/product/:id',async (req,res) =>{
    console.log(req.params.id);
    await Product.updateOne({_id:req.params.id},req.body);
    res.send("Product updated successfully");
    

});
// DELETE - DELETE
app.delete('/product/:id',async (req,res) =>{
    console.log(req.params.id);
    await Product.findByIdAndDelete({_id:req.params.id});
    res.send("Product deleted successfully");
    

});

app.listen(3000,'localhost',() =>{
    console.log("Server started at port 3000.....");
    

});
