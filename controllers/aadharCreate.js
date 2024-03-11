const Aadhar = require('../models/Aadharuser');

const create_aadhar = async (req, res) => {

    if (req.body.AadharNumber != 16) res.status(400).json({ message: "Aadhar Number should be 16 digits" })
    if (req.body.PhoneNumber != 10) res.status(400).json({ message: "Phone Number should be 10 digits" })
    if (req.body.panCard != 10) res.status(400).json({ message: "Pan Card should be 10 digits" })
    if (req.body.FingerPrintCode != 10) res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
    if (req.body.EyeScanCode != 10) res.status(400).json({ message: "EyeScanCode should be 10 digits" })
    if (req.body.VID != 10) res.status(400).json({ message: "VID should be 10 digits" })
    if (req.body.name.length < 1) res.status(400).json({ message: "Name should be more than 1 character" })


    Aadhar.find({ AadharNumber: req.body.AadharNumber })
        .then((result) => {
            if (result.length > 0) {
                res.status(400).json({
                    message: "Aadhar Number already exists Cannot create a new Aadhar"
                }
                )
            }

            else {


                const newuser = new Aadhar({
                    AadharNumber: req.body.AadharNumber,
                    Name: req.body.Name,
                    FingerPrintCode: Buffer.from(req.body.FingerPrintCode).toString('base64'),
                    Address: req.body.Address,
                    EyeScanCode: Buffer.from(req.body.EyeScanCode).toString('base64'),
                    PhoneNumber: req.body.PhoneNumber,
                    VID: req.body.VID,
                    panCard: req.body.panCard
                })

                newuser.save()
                    .then((result) => {
                        res.status(200).json({
                            message: "New Aadhar User Created Succesfully",
                            result
                        })
                    })
                    .catch((err) => {
                        console.log(err)
                        res.status(400).json({
                            message: "Error in creating new Aadhar User",
                        })
                    })
            }
        })

}


module.exports={create_aadhar}
