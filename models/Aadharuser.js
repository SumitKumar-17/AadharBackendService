const mongoose=require('mongoose');

const AadharUserSchema=mongoose.Schema({
    AadharNumber:{
        type: String,
        required: true,
        unique: true,
    },
    Name:{
        type:String,
        required:true,
    },
    FingerPrintCode:{
        type:String,
        required:true,
        unique:true,
    },
    Address:{
        type:String,
        required:true,
    },
    EyeScanCode:{
        type:String,
        require:true,
        unique:true,
    },
    PhoneNumber:{
        type:String,
        required:true,
        // unique:true,
    },
    VID:{
        type:String,
        required:true,
        unique:true,
    }
    },{
        timestamps:true
    }
);

const aadharuser=mongoose.model(
    'AadharUser',AadharUserSchema
)

module.exports=aadharuser;