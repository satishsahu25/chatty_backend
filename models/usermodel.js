const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatarImageSet:{
        type:Boolean,
        default:true
    },
    avatarimage:{
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    }
},{timestamps:true});


module.exports=mongoose.model('User',userschema);