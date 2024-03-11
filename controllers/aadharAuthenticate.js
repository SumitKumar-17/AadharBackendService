const Aadhar = require('../models/Aadharuser');


const authenticate_aadhar = async (req, res) => {
    try {

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "Please provide the required details" });
        }

        if (!req.body.FingerPrintCode || !req.body.EyeScanCode) return res.status(400).json({ message: "Please provide all the required details" })

        if (req.body.FingerPrintCode.length !== 10) return res.status(400).json({ message: "FingerPrintCode should be 10 digits" })
        if (req.body.EyeScanCode.length !== 10) return res.status(400).json({ message: "EyeScanCode should be 10 digits" })

       
        const encodedFingerPrint = Buffer.from(req.body.FingerPrintCode).toString('base64');
        const encodedEyeScan = Buffer.from(req.body.EyeScanCode).toString('base64');

        // Find Aadhar user by FingerPrintCode and EyeScanCode
        const result = await Aadhar.find({ FingerPrintCode: encodedFingerPrint, EyeScanCode: encodedEyeScan });

        // Check if Aadhar user is found
        if (result && result.length > 0) {
            return res.status(200).json({ message: "Aadhar User Authenticated", result });
        } else {
            return res.status(400).json({ message: "Aadhar User not Authenticated" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { authenticate_aadhar }