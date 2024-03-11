const Aadhar = require('../models/aadhar');


const authenticate_aadhar = async (req, res) => {
    if(req.body.FingerPrintCode.length < 10) res.status(400).json({message: "FingerPrintCode should be more than 10 characters"})
    if(req.body.EyeScanCode.length < 10) res.status(400).json({message: "EyeScanCode should be more than 10 characters"})
    
    let found = false;
    const encodedFingerPrint = Buffer.from(req.body.FingerPrintCode).toString('base64')
    const encodedEyeScan = Buffer.from(req.body.EyeScanCode).toString('base64')

    Aadhar.find({ FingerPrintCode: encodedFingerPrint, EyeScanCode: encodedEyeScan })
        .then((result) => {
            if (result && result.length) {
                found = true
            }

            if (found === true) {
                res.send(200).json({
                    message: "Aadhar User Authenticated",
                    result
                })
            }

            else {
                res.status(400).json({
                    message: "Aadhar User not Authenticated"
                })
            }


        }).catch((err) => {
            res.status(400).json({
                message: err
            })
        })
}

module.exports(
    authenticate_aadhar
)