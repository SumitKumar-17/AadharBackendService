const Aadhar = require('../models/Aadharuser');

const create_aadhar = async (req, res) => {
    try {
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


        const existingUser = await Aadhar.findOne({ AadharNumber: req.body.AadharNumber });
        if (existingUser) {
            return res.status(400).json({ message: "Aadhar Number already exists Cannot create a new Aadhar" });
        }

        const newuser = new Aadhar({
            AadharNumber: req.body.AadharNumber,
            Name: req.body.Name,
            FingerPrintCode: Buffer.from(req.body.FingerPrintCode).toString('base64'),
            Address: req.body.Address,
            EyeScanCode: Buffer.from(req.body.EyeScanCode).toString('base64'),
            PhoneNumber: req.body.PhoneNumber,
            VID: req.body.VID,
            panCard: req.body.panCard
        });

        await newuser.save();
        return res.status(200).json({ message: "New Aadhar User Created Successfully", result: newuser });


    } catch (err) {
        console.log(err)
        // next(err)

    }
}

module.exports = { create_aadhar }
