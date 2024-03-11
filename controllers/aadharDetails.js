const Aadhar = require('../models/Aadharuser');



const get_aadhar_details = async (req, res) => {

    try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Please provide the required details" });
        }

        if (!req.body.AadharNumber || !req.body.FingerPrintCode || !req.body.EyeScanCode) return res.status(400).json({ message: "Please provide all the required details" })
        // console.log(req.body.AadharNumber.length)
        if (!req.body.AadharNumber || req.body.AadharNumber.length !== 16) {
            console.log("Length condition is false");
            return res.status(400).json({
                message: `Aadhar Number '${req.body.AadharNumber}' should be 16 digits`
            });

        }
        if (req.body.FingerPrintCode.length !== 10) return res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
        if (req.body.EyeScanCode.length !== 10) return res.status(400).json({ message: "EyeScanCode should be 10 digits" })



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
    catch (err) {
        console.log(err)
        res.status(400).json({
            message: err
        })
        // next(err)
    }
}

module.exports = { get_aadhar_details }