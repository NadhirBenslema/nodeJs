const mongo=require('mongoose');
const shema=mongo.Schema;


const User=new shema({
    name:String,
    email:String,
    cin:Number
});
module.exports=mongo.model("user",User);