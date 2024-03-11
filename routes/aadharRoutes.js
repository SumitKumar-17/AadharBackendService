const express=requre("express")
const router=express.Router();
const aadharController=require("../controllers/aadharController")


app.post("/create",aadharController.create_aadhar)
app.post("/aadhardetails",aadharController.get_aadhar_details)
app.post("/authenticate",aadharController.authenticate_aadhar)
app.post("/update",aadharController.update_aadhar)


module.exports=router;