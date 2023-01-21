const { handleAsync, handleResponse, createApiError, verifyJwtToken } = require("../utils/helpers")
const axios = require('axios')
const Donation = require('./../models/donationsModel')
const College = require('./../models/collegeModel')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const verifyTransaction = handleAsync(async(req,res) => { 
        const { authorization } = req.headers

        if(!authorization) throw createApiError("User not authorized", 401)
        
        let tokenPayload = null

        try{
            tokenPayload = verifyJwtToken(authorization)
        }catch(err){
            throw createApiError(err.message, 401)
        }

        const { userId, collegeId } = tokenPayload

        // Get the reference from the url params
        const reference = req.params.reference

        const paystackResponse = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`,{
            headers:{
                "Authorization": `Bearer ${process.env.PAYSTACK_SECRET}`
            }
        })
        
        if(paystackResponse.data.status === true && paystackResponse.data.data.status === 'success'){

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