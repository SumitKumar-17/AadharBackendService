const Aadhar = require('../models/Aadharuser');


const update_aadhar = async (req, res) => {
    try{
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Please provide the required details" });
        }
    
        if (!req.body.AadharNumber || !req.body.Name || !req.body.FingerPrintCode || !req.body.Address || !req.body.EyeScanCode || !req.body.PhoneNumber || !req.body.VID || !req.body.panCard) return res.status(400).json({ message: "Please provide all the required details" })
    
        // console.log(req.body.AadharNumber.length)
        if (!req.body.AadharNumber || req.body.AadharNumber.length !== 16) {
            console.log("Length condition is false");
            return res.status(400).json({
                message: `Aadhar Number '${req.body.AadharNumber}' should be 16 digits`
            });
    
        } if (req.body.PhoneNumber.length !== 10) return res.status(400).json({ message: "Phone Number should be 10 digits" })
        if (req.body.panCard.length !== 10) return res.status(400).json({ message: "Pan Card should be 10 digits" })
        if (req.body.FingerPrintCode.length !== 10) return res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
        if (req.body.EyeScanCode.length !== 10) return res.status(400).json({ message: "EyeScanCode should be 10 digits" })
        if (req.body.VID.length !== 10) return res.status(400).json({ message: "VID should be 10 digits" })
        if (req.body.Name.length < 1) return res.status(400).json({ message: "Name should be more than 1 character" })
        
        const encodedFingerPrint = Buffer.from(req.body.FingerPrintCode).toString('base64')
        const encodedEyeScan = Buffer.from(req.body.EyeScanCode).toString('base64')

        const existingAadhar = await Aadhar.findOne({ AadharNumber: req.body.AadharNumber });
        if (!existingAadhar) {
            return res.status(400).json({ message: "Aadhar Number does not exist. Cannot update a new Aadhar." });
        }

        const existingFingerprint = await Aadhar.findOne({ FingerPrintCode: encodedFingerPrint});
        if (!existingFingerprint) {
            return res.status(400).json({ message: "Fingerprint already exists. Cannot update with the same fingerprint." });
        }

        const existingEyeScan = await Aadhar.findOne({ EyeScanCode: encodedEyeScan });
        if (!existingEyeScan) {
            return res.status(400).json({ message: "EyeScan already exists. Cannot update with the same EyeScan." });
        }
        
    
        Aadhar.findOneAndUpdate(
            { AadharNumber: req.body.AadharNumber }, // Find the Aadhar document by AadharNumber
            {
                Name: req.body.Name,
                FingerPrintCode: encodedFingerPrint,
                Address: req.body.Address,
                EyeScanCode: encodedEyeScan,
                PhoneNumber: req.body.PhoneNumber,
                VID: req.body.VID,
                panCard: req.body.panCard
            },
            { new: true } // Return the updated document
        )
        .then((updatedAadhar) => {
            if (updatedAadhar) {
                res.status(200).json({
                    message: "Aadhar User Updated Successfully",
                    result: updatedAadhar
                });
            } else {
                res.status(400).json({ message: "Aadhar User not Found" });
            }
        })
        .catch((err) => {
            res.status(500).json({ message: "Internal Server Error" });
        });
            }
    catch(err){
        console.log(err)
        res.status(400).json({
            message: err
        })
    }

}

module.exports ={update_aadhar}
