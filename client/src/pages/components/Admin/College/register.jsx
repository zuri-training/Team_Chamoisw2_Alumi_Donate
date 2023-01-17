import { useState, useEffect, useMemo, useLayoutEffect } from "react";
import useColleges from "../../../../hooks/colleges";
import SimpleReactValidator from 'simple-react-validator';
import useBanks from "../../../../hooks/banks";
import { useLocation } from "react-router-dom";

const RegisterCollegePage = () => {
    const { registerCollege, verifyAccountDetails } = useColleges()
    const { getBanks } = useBanks()
    const [banks, setBanks] = useState(null)
    const [formValidator, setFormValidator] = useState(null)
    const [formValues, setFormValues] = useState({
        name: '',
        location: '',
        email: '',
        phoneNumbers: '',
        accountName: '',
        accountNumber: '',
        bankId: ''
    })
     
    useLayoutEffect(() => {
        setFormValidator(new SimpleReactValidator({
            element: message => <div className="text-danger mb-3">{message}</div>,
            validators: {
                phoneNumbers: {  // name the rule
                    message: 'The phone numbers must be valid phone numbers(e.g 08012345678 ) and must be separated by a newline (i.e For multiple phone numbers).',
                    rule: (val, params, validator) => {
                    return new RegExp('^((0(7|8|9){1}(0|1){1}[0-9]{8})([\n]{1})?){1,}$').test(val)
                    },
                    required: true  // optional
                }
            }
        }))
    }, [])

    // Fetch all registered banks
    useEffect(() => {
        (async () => {
            const response = await getBanks()

            setBanks(prevList => {
                return response
            })
        })()
    }, [])

    const triggerValidationByFocus = () => {
        const element = document.querySelector('.name')
        element.focus({focusVisible: false})

        // Simulate an empty character being typed
        setFormValues({...formValues, name: `${formValues.name} `})

        // Simulate removal of empty character
        setFormValues({...formValues, name: `${formValues.name.trim()}`})
    }

    // Validate account details
    const validateAccountDetails = async () => {
        const { accountName, accountNumber, bankId } = formValues

        // Any error that may occur from this request has been caught and handled
        // in the verifyAccountDetails hook
        return await verifyAccountDetails({ accountName, accountNumber, bankId })
    }

    const handleChange = async (e) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleRegFormSubmit = async (e) => {
        e.preventDefault()
        
        // Validate account details
        const accountValid = await validateAccountDetails()

        if(!accountValid) return

        if (formValidator.allValid()) {

            await registerCollege(formValues)

        } else {
            formValidator.showMessages();
            window.scrollTo(0,0)
            triggerValidationByFocus()
        }
    }
   
    return (
        <section className="row mb-5">
            {
                formValidator && Boolean(banks)
                && <div className="offset-1 col-10">
                    <h3>Register a new College (Institution)</h3>
                    <br/>
                    <form onSubmit={handleRegFormSubmit} className="text-start">
                        <label htmlFor="name" className="form-label"><strong>College(Institution) Name</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100 name'
                            name="name"
                            placeholder="Name"
                            value={formValues.name}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('name')}}
                        />
                        {formValidator.message('name', formValues.name, 'required|string|min:3')}

                        <label htmlFor="location" className="form-label"><strong>Location</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="location"
                            placeholder="Location"
                            value={formValues.location}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('location')}}
                        />
                        {formValidator.message('location', formValues.location, 'required|string|min:3')}

                        <label htmlFor="email" className="form-label"><strong>Email</strong></label>
                        <input
                            type="email"
                            className='form-control mb-3 w-100'
                            name="email"
                            placeholder="Email"
                            value={formValues.email}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('email')}}
                        />
                        {formValidator.message('email', formValues.email, 'required|email')}

                        <label htmlFor="phoneNumbers" className="form-label"><strong>Phone numbers (11 digits, press enter key to enter multiple numbers)</strong></label>
                        <textarea 
                            rows={3} 
                            className='form-control mb-3 w-100'
                            name="phoneNumbers"
                            value={formValues.phoneNumbers}
                            onChange={handleChange}
                            onBlur={() => {formValidator.showMessageFor('phoneNumbers')}}
                            placeholder="Press the enter key to provide multiple numbers" />
                        {formValidator.message('phoneNumbers', formValues.phoneNumbers, 'required|phoneNumbers')}

                        {/* Account details */}
                        <h3>Account Details</h3>
                        
                        <label htmlFor="accountName" className="form-label"><strong>Account Name</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="accountName"
                            placeholder="Account name"
                            value={formValues.accountName}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('accountName')}}
                        />
                        {formValidator.message('accountName', formValues.accountName, 'required|alpha_num_dash_space|min:3')}

                        <label htmlFor="accountNumber" className="form-label"><strong>Account Number</strong></label>
                        <input
                            type="text"
                            minLength={10}
                            maxLength={10}
                            className='form-control mb-3 w-100'
                            name="accountNumber"
                            placeholder="Account number"
                            value={formValues.accountNumber}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('accountNumber')}}
                        />
                        {formValidator.message('accountNumber', formValues.accountNumber, 'required|string|min:10|max:10')}

                        <label htmlFor="bankCode" className="form-label"><strong>Bank</strong></label>
                        <select
                            className='form-control mb-3 w-100'
                            name="bankId"
                            placeholder="Select Bank"
                            value={formValues.bankId}
                            onChange={handleChange}
                            autoComplete="off">
                            {
                                <option value=''>Select Bank</option>
                            }
                            {
                                banks.length > 0 && banks.map(bank => (<option key={bank.code} value={ bank._id }>{ bank.name }</option>))
                            }
                        </select>

                        <button className="btn btn-large btn-success" type="submit">Submit</button>
                    </form>
                </div>
            }
        </section>
    )
}

export default RegisterCollegePage