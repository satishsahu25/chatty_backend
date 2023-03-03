const {register,login,getalluser} = require('../controllers/usercontroller');

const router=require("express").Router();

router.post("/register",register);
router.post("/login",login);

router.get("/allusers/:id",getalluser);
module.exports=router;