const {addmessage ,getmessage } = require('../controllers/msgcontrollers');

const router=require("express").Router();

router.post("/addmsg",addmessage);
router.post("/getmsg",getmessage);

module.exports=router;