import { useState, useLayoutEffect, useEffect } from "react"
import useColleges from "../../../../hooks/colleges"
import useBanks from "../../../../hooks/banks"
import SimpleReactValidator from "simple-react-validator"

const EditCollegePage = () => {
    const { updateCollege, getCollegeReduxData } = useColleges()
    const { getBanks } = useBanks()
    const [banks, setBanks] = useState([])
    const [formValidator, setFormValidator] = useState(null)
    const [formValues, setFormValues] = useState(null)  

    useLayoutEffect(() => {
        const { _id, name, location, contact, accountDetails } = getCollegeReduxData()
        
        setFormValues({ 
            _id,
            name,
            location,
            email: contact && contact.email ? contact.email : '',
            phoneNumbers: contact && contact.phoneNumbers ? contact.phoneNumbers.join('/n') : '',
            accountName: accountDetails && accountDetails.name ? accountDetails.name : '',
            accountNumber: accountDetails && accountDetails.number ? accountDetails.number : '',
            bankId: accountDetails && accountDetails.bank ? accountDetails.bank : ''
        })
    }, [])

    useLayoutEffect(() => {
        setFormValidator(new SimpleReactValidator({
            element: message => <div className="text-danger mb-3">{message}</div>,
            validators: {
                phoneNumbers: {  // name the rule
                    message: 'The phone numbers must be valid phone numbers(e.g 08012345678 )\n and must be separated by a newline\n(i.e For multiple phone numbers).',
                    rule: (val, params, validator) => {
                        return new RegExp('^((0(7|8|9){1}(0|1){1}[0-9]{8})([\n]{1})?){1,}$').test(val)
                    },
                    required: true  // optional
                },
                accountNumber: {  // name the rule
                    message: 'The account number must be made up of 10 or more numbers',
                    rule: (val, params, validator) => {
                        return new RegExp('^[0-9]{10,}$').test(val)
                    },
                    required: true  // optional
                }
            }
        }))
    }, [])

    // Fetch all registered banks and set the default bank id to be the id of the first bank in "response" array
    useEffect(() => {
        (async () => {
            const response = await getBanks()

            setFormValues(prevValues => ({
                ...prevValues,
                bankId: prevValues.bankId ? prevValues.bankId : response[0]._id
            }))

            setBanks(response)
        })()
    }, [])

    const triggerValidationByFocus = () => {
        const element = document.querySelector('.name')
        element.focus({focusVisible: false})

        // Simulate an empty character being typed
        setFormValues(prevValues => ({...prevValues, name: `${prevValues.name} `}))

        // Simulate removal of empty character
        setFormValues(prevValues => ({...prevValues, name: `${prevValues.name}`}))
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault()
        
        if (formValidator.allValid()) {
           
            await updateCollege(formValues)

        } else {
            formValidator.showMessages();
            window.scrollTo(0,0)
            triggerValidationByFocus()
        }
    }

    return (
        Boolean(formValues) &&
        <div className="offset-1 col-10">
            <h2>Edit College Details</h2>
            <form onSubmit={handleEditFormSubmit} className="text-start">
                <label htmlFor="name" className="form-label"><strong>College(Institution) Name</strong></label>
                <input
                    type="text"
                    className='form-control mb-3 w-100 name'
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleEditChange}
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
                    onChange={handleEditChange}
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
                    onChange={handleEditChange}
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
                    onChange={handleEditChange}
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
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('accountName')}}
                />
                {formValidator.message('accountName', formValues.accountName, 'required|alpha_num_dash_space|min:3')}

                <label htmlFor="accountNumber" className="form-label"><strong>Account Number</strong></label>
                <input
                    type="number"
                    minLength={10}
                    maxLength={10}
                    className='form-control mb-3 w-100 acc-number'
                    name="accountNumber"
                    placeholder="Account number"
                    value={formValues.accountNumber}
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('accountNumber')}}
                />
                {formValidator.message('accountNumber', formValues.accountNumber, 'required|accountNumber')}

                <label htmlFor="bankCode" className="form-label"><strong>Bank</strong></label>
                <select
                    className='form-control mb-3 w-100'
                    name="bankId"
                    placeholder="Select Bank"
                    value={formValues.bankId}
                    onChange={handleEditChange}
                    autoComplete="off">
                    {/* The currently selected bank for the college is made to appear first */}
                    {
                        banks.length > 0 && banks.map(bank => (bank._id === formValues.bankId ? <option key={bank.code} value={ bank._id }>{ bank.name }</option> : ''))
                    }
                    {/* Other banks are listed here */}
                    {
                        banks.length > 0 && banks.map(bank => (bank._id !== formValues.bankId ? <option key={bank.code} value={ bank._id }>{ bank.name }</option> : ''))
                    }
                </select>

                <button className="btn btn-large btn-success submit-update-button" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default EditCollegePage