const Aadhar = require('../models/aadhar');


const update_aadhar = async (req, res) => {
    if (req.body.AadharNumber != 16) res.status(400).json({ message: "Aadhar Number should be 16 digits" })
    if (req.body.PhoneNumber != 10) res.status(400).json({ message: "Phone Number should be 10 digits" })
    if (req.body.panCard != 10) res.status(400).json({ message: "Pan Card should be 10 digits" })
    if (req.body.FingerPrintCode != 10) res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
    if (req.body.EyeScanCode != 10) res.status(400).json({ message: "EyeScanCode should be 10 digits" })
    if (req.body.VID != 10) res.status(400).json({ message: "VID should be 10 digits" })
    if (req.body.name.length < 1) res.status(400).json({ message: "Name should be more than 1 character" })

    const encodedFingerPrint = Buffer.from(req.body.FingerPrintCode).toString('base64')
    const encodedEyeScan = Buffer.from(req.body.EyeScanCode).toString('base64')
    Aadhar.find({ AadharNumber: req.body.AadharNumber }, { FingerPrintCode: encodedFingerPrint }, { EyeScanCode: encodedEyeScan })
        .then((results) => {
            if (results && results.length) {
                results.map((result) => {
                    result.AadharNumber = req.body.AadharNumber,
                        result.Name = req.body.Name,
                        result.FingerPrintCode = encodedFingerPrint,
                        result.Address = req.body.Address,
                        result.EyeScanCode = encodedEyeScan,
                        result.PhoneNumber = req.body.PhoneNumber,
                        result.VID = req.body.VID,
                        result.panCard = req.body.panCard

                    result.save()
                })
                res.status(200).json({
                    message: "Aadhar User Updated Successfully",
                    result
                })
            }
            else {
                res.status(400).json({
                    message: "Aadhar User not Found"
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                message: err
            })
        })


}

module.exports = (
    update_aadhar
)