import DonateSchoolImage from './../../../assets/images/donateschoolimage.svg'
import './../../styles/donatecomponent.scss'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { SET_DONATION_AMOUNT } from './../../../redux/actions'


const DonateNow = () => {
    const [amountToDonate, setAmountToDonate] = useState(1000)
    const [anonymousAlumni, setAnonymousAlumni] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const deactivateLastSelectedAmount = () => {
        document.querySelector('.selected-amount').classList.remove('selected-amount')
    }

    const activateNewSelectedAmount = (e) => {
        e.target.classList.add('selected-amount')
    }

    const setEnterDonationInputValue = (amount) => {
        document.querySelector('.enter-donation input').value = amount
    }

    const handleDonationAmount = (e) => {
        deactivateLastSelectedAmount()

        activateNewSelectedAmount(e)
        
        const selectedAmount = e.target.innerText.split('').slice(1).join('')

        setEnterDonationInputValue(selectedAmount)
        
        setAmountToDonate(selectedAmount)   
    }

    const navigateToCheckoutPage = () => {
        navigate(`/dashboard/donate/checkout`)
    }

    const saveDonationAmount = () => {
        dispatch({
            type: SET_DONATION_AMOUNT,
            payload: {
                amountToDonate,
                anonymousAlumni
            }
        })

        navigateToCheckoutPage()
    }

    const handleSetAnonymous = (e) => {
        setAnonymousAlumni(e.target.checked)
    }

    return (
        <div className='row'>
            <div className="col-md-12 py-3 my-3 px-5" style={{ background: "#838EAB" }}>
                <div className="row justify-content-start mb-3">
                    <Link to="/dashboard" className='w-auto'>
                        <button className="btn btn-lg site-bg-color text-white">Return to institution</button>
                    </Link>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        <img src={DonateSchoolImage} alt="Donate to school" />
                    </div>
                    <div className="col-md-6 text-white">
                        {/* <p>
                        You’ re supporting the development of the new college laboratory at Bowen University. 

                        The new project is a 10,000 capacity building, hoping to be completed for next session.
                        </p> */}
                    </div>
                </div>

                {/* Select Payment */}
                <div className='row select-payment'>
                    <h2 className='text-start'>Select Payment</h2>
                    <div className='row mt-5 justify-content-around'>
                        <div className="col-md-2"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$20</button></div>
                        <div className="col-md-2"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$50</button></div>
                        <div className="col-md-2"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$100</button></div>
                        <div className="col-md-2"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$200</button></div>
                        <div className="col-md-2"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$500</button></div>
                    </div>

                    <div className="row justify-content-around mt-3">
                        <div className="col-md-4 d-flex justify-content-end"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$600</button></div>
                        <div className="col-md-3"><button className="btn bg-white px-5 py-2" onClick={handleDonationAmount}>$800</button></div>
                        <div className="col-md-4 d-flex justify-content-start"><button className="btn bg-white px-5 py-2 selected-amount" onClick={handleDonationAmount}>$1000</button></div>
                    </div>
                </div>

                {/* Enter donation */}
                <div className="row mt-5 enter-donation justify-content-center">
                    <h5 className='text-start'>Enter Donation</h5>
                    <div className='row bg-white enter-amount align-items-center rounded fs-2'>
                        <div className="col-1">$</div>
                        <div className="col-11"><input type="number" className="w-100 border border-0 outline-0" placeholder='0.00' style={{textAlign: 'right'}} value={amountToDonate} onChange={(e) => setAmountToDonate(e.target.value)} /></div>
                    </div>
                </div>

                {/* Tip Alumni Donate */}
                {/* <div className='row mt-5'>
                    <h5 className='text-start mx-0 px-0'>Tip Alumni_Donate</h5>
                    <p className='mx-0 px-0 text-start'>Alumni_donate has 0% platform fee for institutions. Alunmi_donate will continue offering its services thanks to donors who will leave an optional fee.</p>
                </div> */}

                {/* Subscription options */}
                <div className="row mt-5">
                    <div className="col-12 d-flex justify-content-start">
                        <input type="checkbox" onChange={e => handleSetAnonymous(e)}/> &nbsp;Don’t display my name publicly on the fundraiser.
                    </div>
                    <div className="col-12 d-flex justify-content-start">
                        <input type="checkbox"/> &nbsp;Get occassional updates on the activities of your institution. You may unsubscribe at any time.
                    </div>
                </div>

                {/* Your Donation */}
                <div className="row mt-5 border-secondary border-top border-bottom">
                    <div className="col-12">
                        <h2 className="site-text-color text-start">Your Donation</h2>
                    </div>
                    <div className="col-12 d-flex justify-content-between fs-3"><span>Total payment</span><span><strong>${amountToDonate}</strong></span></div>
                </div>

                {/* Proceed Button */}
                <div className='row justify-content-center mt-3'>
                    <button onClick={saveDonationAmount} className='btn btn-lg border-top-left-radius border-bottom-right-radius site-bg-color text-white w-75 proceed-button'>Proceed</button>
                </div>

                {/* Terms and Privacy */}
                <p className='mt-4'>By continuing you agree with our <strong>terms</strong> and <strong>privacy notice</strong></p>
            </div>
        </div>
           
    )

}

export default DonateNow;