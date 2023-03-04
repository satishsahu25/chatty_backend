const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

const register = async (req, res, next) => {
  try {
    
    const { username, email, password } = req.body;
    
    const usernamecheck = await User.findOne({ username });
    if (usernamecheck) {
      return res.json({ msg: "Username already exists", status: false });
    }
    const emailcheck = await User.findOne({ email });
    if (emailcheck) {
      return res.json({ msg: "Email already used", status: false });
    }

    
    const hasedpassed = await bcrypt.hash(password, 10);
    const user = await User.create({ email, username, password: hasedpassed });
    delete user.password;
    return res.json({ status: true, user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    
    const { username, password } = req.body;

    const usernamecheck = await User.findOne({ username });
    if (!usernamecheck) {
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    //front, database one
    const ispasswordvalid = await bcrypt.compare(password, usernamecheck.password);

    if(!ispasswordvalid){
      return res.json({ msg: "Incorrect username or password", status: false });
    }
    delete usernamecheck.password;
 
    return res.json({ status: true, usernamecheck });
  } catch (err) {
    next(err);
  }
};



const getalluser=async(req,res,next)=>{
  try{
    const users=await User.find({_id:{$ne:req.params.id}}).select([
      "email","username","_id","avatarimage"
    ]);
    
    return res.json({users});
  }catch(err){

  }

}

module.exports = { register,login,getalluser };
