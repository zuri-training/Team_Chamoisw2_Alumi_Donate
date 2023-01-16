import { useState, useLayoutEffect } from "react"
import SimpleReactValidator from "simple-react-validator"
import useUserProfile from "../../../hooks/profile"
import useAuth from "../../../hooks/auth"
import { Toast } from "../ToastAlert"
import { useNavigate } from "react-router-dom"

const EditAdminPage = () => {
    const { getAdminReduxData } = useAuth()
    const { updateAdminDetails } = useUserProfile()
    const [formValidator, setFormValidator] = useState(null)
    const [formValues, setFormValues] = useState(null)  
    const navigate = useNavigate()

    useLayoutEffect(() => {
        const { _id, fullName, email, phoneNumber } = getAdminReduxData()
        
        setFormValues({ 
            _id,
            fullName,
            email,
            phoneNumber,
            password: '',
            confirmPassword: ''
        })
    }, [navigate])

    useLayoutEffect(() => {
        setFormValidator(new SimpleReactValidator({
            element: message => <div className="text-danger mb-3">{message}</div>,
            validators: {
                phoneNumber: {  // name the rule
                    message: 'The phone number must be a valid phone number(e.g 08012345678)).',
                    rule: (val, params, validator) => {
                    return new RegExp('^(0(7|8|9){1}(0|1){1}[0-9]{8}){1}$').test(val)
                    },
                    required: true  // optional
                }
            }
        }))
    }, [])

    const triggerValidationByFocus = () => {
        const element = document.querySelector('.fullName')
        element.focus({focusVisible: false})

        // Simulate an empty character being typed
        setFormValues(prevValues => ({...prevValues, fullName: `${prevValues.fullName} `}))

        // Simulate removal of empty character
        setFormValues(prevValues => ({...prevValues, fullName: `${prevValues.fullName.trim()}`}))
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const passwordsMatch = () => {
        return formValues.password === formValues.confirmPassword
    }

    const handleEditFormSubmit = async (e) => {
        e.preventDefault()
        
        if(!passwordsMatch()){
            Toast.fire({
                icon: 'error',
                title: 'Passwords do not match'
            })
            return
        }
        else if (formValidator.allValid()) {

            await updateAdminDetails(formValues)

        } else {
            formValidator.showMessages();
            window.scrollTo(0,0)
            triggerValidationByFocus()
        }
    }

    return (
        Boolean(formValues) &&
        <div className="col-md-9 col-sm-12 ">
            <div className="row">
            <h2>Edit Admin Details</h2>
            <form onSubmit={handleEditFormSubmit} className="text-start offset-md-2 col-md-8">
                <label htmlFor="fullName" className="form-label"><strong>Fullname</strong></label>
                <input
                    type="text"
                    className='form-control mb-3 w-100 fullName'
                    name="fullName"
                    placeholder="FullName"
                    value={formValues.fullName}
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('fullName')}}
                />
                {formValidator.message('fullName', formValues.fullName, 'required|string|min:3')}

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

                <label htmlFor="phoneNumber" className="form-label"><strong>Phone number (11 digits)</strong></label>
                <input
                    type="text"
                    className='form-control mb-3 w-100'
                    name="phoneNumber"
                    placeholder="Phone number"
                    value={formValues.phoneNumber}
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('phoneNumber')}}
                />
                {formValidator.message('phoneNumber', formValues.phoneNumber, 'required|phoneNumber')}

                <label htmlFor="password" className="form-label"><strong>Password</strong></label>
                <input
                    type="password"
                    className='form-control mb-3 w-100'
                    name="password"
                    placeholder="Password"
                    value={formValues.password}
                    onChange={handleEditChange}
                    autoComplete="off"
                />

                <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password</strong></label>
                <input
                    type="password"
                    className='form-control mb-3 w-100'
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formValues.confirmPassword}
                    onChange={handleEditChange}
                    autoComplete="off"
                />

                <button className="btn btn-large btn-success submit-update-button" type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default EditAdminPage