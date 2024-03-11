const Aadhar = require('../models/Aadharuser');



const get_aadhar_details = async (req, res) => {

    if (req.body.AadharNumber != 16) res.status(400).json({ message: "Aadhar Number should be 16 digits" })
    if (req.body.FingerPrintCode != 10) res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
    if (req.body.EyeScanCode != 10) res.status(400).json({ message: "EyeScanCode should be 10 digits" })



    Aadhar.find({ AadharNumber: req.body.AadharNumber, FingerPrintCode: Buffer.from(req.body.FingerPrintCode).toString('base64'), EyeScanCode: Buffer.from(req.body.EyeScanCode).toString('base64') })
        .then((results) => {
            if (results && results.length) {
                results.map(result => {
                    const resultAadhar = {
                        AadharNumber: result.AadharNumber,
                        Name: result.Name,
                        Address: result.Address,
                        PhoneNumber: result.PhoneNumber,
                        VID: result.VID,
                        panCard: result.panCard,
                        FingerPrintCode: Buffer.from(result.FingerPrintCode, 'base64').toString('ascii'),
                        EyeScanCode: Buffer.from(result.EyeScanCode, 'base64').toString('ascii'),
                    }
                    res.send(resultAadhar)
                })

            }
            else {
                res.status(400).json({
                    message: "Aadhar User not Found"
                })
            }
        }).catch((err) => {
            res.status(400).json({
                message: err
            })
        })

}

module.exports={get_aadhar_details}