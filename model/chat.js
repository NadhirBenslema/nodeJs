const mongo=require('mongoose');
const shema=mongo.Schema;


const Chat=new shema({
    msg:String,
    date:Date,
});
module.exports=mongo.model("chat",Chat);