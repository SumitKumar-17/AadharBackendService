const express=require("express")
const router=express.Router();
const aadharCreate=require("../controllers/aadharCreate")
const aadharDetails=require("../controllers/aadharDetails")
const aadharAuthenticate=require("../controllers/aadharAuthenticate")
const aadharUpdate=require("../controllers/aadharUpdate")


router.post("/create",aadharCreate.create_aadhar)
router.post("/aadhardetails",aadharDetails.get_aadhar_details)
router.post("/authenticate",aadharAuthenticate.authenticate_aadhar)
router.post("/update",aadharUpdate.update_aadhar)


module.exports=router;