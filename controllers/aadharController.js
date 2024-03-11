const Aadhar=require('../models/aadhar');

const create_aadhar=async(req,res)=>{
    Aadhar.find({AadharNumber:req.body.AadharNumber})
    .then((result)=>{
        if(result.length>0){
            res.status(400).json({
                message:"Aadhar Number already exists Cannot create a new Aadhar"
            }
            )
        }

        else{
            if(req.body.AadharNumber!=16) res.status(400).json({message:"Aadhar Number should be 16 digits"})
            if(req.body.PhoneNumber!=10) res.status(400).json({message:"Phone Number should be 10 digits"})
            if(req.body.PanCard!=10) res.status(400).json({message:"Pan Card should be 10 digits"})
            if(req.body.FingerPrintCode!=10) res.status(400).json({message:"FingerPrintCode should be 10 digits"})
            if(req.body.EyeScanCode!=10) res.status(400).json({message:"EyeScanCode should be 10 digits"})
            if(req.body.VID!=10) res.status(400).json({message:"VID should be 10 digits"})
            if(req.body.name.length<1) res.status(400).json({message:"Name should be more than 1 character"})


            const newuser=new Aadhar({
                AadharNumber:req.body.AadharNumber,
                Name:req.body.Name,
                FingerPrintCode:Buffer.from(req.body.FingerPrintCode).toString('base64'),
                Address:req.body.Address,
                EyeScanCode:Buffer.from(req.body.EyeScanCode).toString('base64'),
                PhoneNumber:req.body.PhoneNumber,
                VID:req.body.VID,
                panCard:req.body.panCard
            })

            newuser.save()
                .then((result)=>{
                    res.status(200).json({
                        message:"New Aadhar User Created Succesfully",
                        result
                    })
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json({
                        message:"Error in creating new Aadhar User",
                    })
                })
        }
    })

}

const get_aadhar_details=async(req,res)=>{
    Aadhar.find({AadharNumber:req.body.AadharNumber})
    .then((results)=>{
        if(results && results.length){
             results.map(result=>{
                const resultAadhar={
                    AadharNumber:result.AadharNumber,
                    Name:result.Name,
                    Address:result.Address,
                    PhoneNumber:result.PhoneNumber,
                    VID:result.VID,
                    panCard:result.panCard,
                    FingerPrintCode:Buffer.from(result.FingerPrintCode,'base64').toString('ascii'),
                    EyeScanCode:Buffer.from(result.EyeScanCode,'base64').toString('ascii'),
                 }
                 res.send(resultAadhar)
             })

        }
        else{
            res.status(400).json({
                message:"Aadhar User not Found"
            })
        }
    }).catch((err)=>{
        res.status(400).json({
            message:err
        })
    })

}

const authenticate_aadhar=async(req,res)=>{

}

const update_aadhar=async(req,res)=>{

}

module.exports=(
    create_aadhar,
    get_aadhar_details,
    authenticate_aadhar,
    update_aadhar
)