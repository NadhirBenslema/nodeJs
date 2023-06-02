const user=require('../model/user')
const express=require('express');

async function add(req,res,next){
    console.log("notre data :"+JSON.stringify(req.params));
    new user({
        name:req.params.name,
        email:req.params.email,
        cin:req.params.cin
    }).save((err,data)=>{
        if(err){
            console.log(err);
        }
        console.log(data);
        res.json(data);

    });
};


async function newAdd (req,res,next){
    // console.log("resultat:"+req.body);
     try{
 
         const User=new user(req.body);
         User.save();
        //  res.json(req.body);
         res.status(200).send("added successfully");
     } catch(err){
         console.log(err);
         res.status(500).send("Internal server error");
     }
    
 
    };


 async function getAll(req, res) {
    try{
        const data = await user.find();
        res.send(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    };
};
//     async function add(req,res,next){
//         try{
     
//             const User=new user(req.body);
//             User.save();
//             //res.json(req.body);
//             res.send("added successfully");
//         } catch(err){
//             console.log(err);
//         }
// };

    async function getById(req,res){
        try{
            const data=await user.findById(req.params.id);
            res.status(200).send(data);
    
        }catch(err){
            res.status(500).send(err.message)
        }
    };


    async function update (req,res){
        try{
            await user.findByIdAndUpdate(req.params.id,req.body,{new:true});
            res.status(200).send("updated successfully");
    
        }catch(err){
            res.status(500).send(err.message)
        }
    };

    async function deleteByid (req,res){
        try{
            await user.findByIdAndRemove(req.params.id);
            res.status(200).send("deleted successfully");
    
        }catch(err){
            res.status(500).send(err.message)
        }
    };

    async function getByName(req,res){
        try{
            const User = await user.find({name:req.params.name});
            res.json(User);

        }catch(err){
            res.status(500).send(err.message)
        }
    }


    
module.exports={add,newAdd,getAll,getById,update,deleteByid,getByName};
