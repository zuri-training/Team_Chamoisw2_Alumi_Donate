const { handleAsync, handleResponse, createApiError } = require("../utils/helpers")
const axios = require('axios')
const Donation = require('./../models/donationsModel')
const College = require('./../models/collegeModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const verifyTransaction = handleAsync(async(req,res) => {    
        // Get the reference from the url params
        const reference = req.params.reference

        const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{
            headers:{
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`
            }
        })
        
        if(paystackResponse.data.status === true && paystackResponse.data.data.status === 'success'){
            const { authorization } = req.headers

            if(!authorization) throw Error("User not authorized")

            const { userId, collegeId } = jwt.verify(authorization.split(" ")[1], process.env.JWT_SECRET)

           
            const session = await mongoose.startSession();

            session.startTransaction()

             // Run both queries below as a transaction
            try {
                await new Donation({
                    amount: paystackResponse.data.data.amount / 100,
                    paymentReference: paystackResponse.data.data.reference,
                    isAnonymous: req.body.anonymousAlumni,
                    collegeId,
                    userId,
                }).save()

                //Add the donation amount to the college's totalDonation amount
                await College.findByIdAndUpdate(collegeId, { '$inc' : { totalDonations: Number(paystackResponse.data.data.amount) / 100 } }).exec()
            
            
                // Commit the changes
                await session.commitTransaction();
            } catch (error) {
                // Rollback any changes made in the database
                await session.abortTransaction();
            
                throw createApiError('Some errors were encountered', 500)
                
            } finally {
                // Ending the session
                session.endSession();

                return res.status(200).json(handleResponse({message: paystackResponse.data.message, status: paystackResponse.data.status}))
            }
            
        }else{
           throw createApiError('Verification failed', 500)
        }
})

module.exports = {
    verifyTransaction
}