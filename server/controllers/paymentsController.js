const { handleAsync } = require("../utils/helpers");
const axios = require('axios')
const Donation = require('./../models/donationsModel')
const jwt = require('jsonwebtoken')

const verifyTransaction = handleAsync(async(req,res) => {
    // Get the reference from the url params
    try{
        const reference = req.params.reference

        const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{
            headers:{
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`
            }
        })

        if(paystackResponse.data.status === true && paystackResponse.data.data.status === 'success'){
            const { accesstoken } = req.headers
            
            if(!accesstoken) throw new Error("User not authorized")

            const { userId, collegeId } = jwt.verify(accesstoken.split(" ")[1], process.env.JWT_SECRET)
            
            const donationSaved = await new Donation({
                amount: paystackResponse.data.data.amount / 100,
                paymentReference: paystackResponse.data.data.reference,
                userId,
                collegeId,
            }).save()
        }
        
        res.status(paystackResponse.status).json({message: paystackResponse.data.message, status: paystackResponse.data.status})
    }catch(err){
        console.log(err)
        res.status(err.status || 500).json({message: "An error occured", error: err})
    }
})

module.exports = {
    verifyTransaction
}