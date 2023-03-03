const Messages = require("../models/messagemodel");
const bcrypt = require("bcrypt");

const addmessage = async (req, res, next) => {
    try{
        const {from,to,message} = req.body;
        const data=await Messages.create({
            sender:from,
            users:[from,to],
            message:{text:message}
        });
        if(data) return res.json({message:"message added successfully"});
        return res.json({message:"message not added"});

    }catch(err){
            next(err);
    }
 
};
const getmessage = async (req, res, next) => {
    try{
        const {from,to}=req.body;
        const messages=await Messages.find({users:{$all:[from,to]}})
        .sort({updatedAt:1});

        const projectmessages=messages.map((message)=>{
            return {
                fromSelf:message.sender.toString()===from,
                message:message.message.text
            }
        });
            res.json(projectmessages);
    }catch(err){
        next(err);
    }
};

module.exports = { getmessage,addmessage  };
