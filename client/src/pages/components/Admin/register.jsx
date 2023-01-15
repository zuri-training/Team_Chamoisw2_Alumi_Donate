import { useState, useLayoutEffect } from "react";
import SimpleReactValidator from 'simple-react-validator';
import useAuth from "../../../hooks/auth";
import { Toast } from "../ToastAlert";

const RegisterAdminPage = () => {
    const [formValidator, setFormValidator] = useState(null)
    const { registerAdmin, userIsAdmin, adminExists: adminExistsFunc } = useAuth()
    const [adminExists] = useState(userIsAdmin())
    const [formValues, setFormValues] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: ''
    })

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
                },
            }
        }))
    }, [])

    const triggerValidationByFocus = () => {
        const element = document.querySelector('.fullName')
        element.focus({focusVisible: false})

        // Simulate an empty character being typed
        setFormValues({...formValues, fullName: `${formValues.fullName} `})

        // Simulate removal of empty character
        setFormValues({...formValues, fullName: `${formValues.fullName}`})
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const passwordsMatch = () => {
        return formValues.password === formValues.confirmPassword
    }

    const handleAdminFormSubmit = async (e) => {
        e.preventDefault()
        
        if(!passwordsMatch()){
            Toast.fire({
                icon: 'error',
                title: 'Passwords do not match'
            })
            return
        }else if (formValidator.allValid()) {

            await registerAdmin(formValues)

        } else {
            formValidator.showMessages();
            window.scrollTo(0,0)
            triggerValidationByFocus()
        }
    }
   
    return (
        <section className="col-md-9">
        <div className="row justify-content-md-center mb-5">
        
            {
                // This condition checks to see if an admin has been registered
                // If yes, check to see if admin is authenticated and load form if true
                // This gives the admin the ability to register another admin
                
                // If no admin has been registered too, load the registration form.
                
                formValidator && ( userIsAdmin() || !adminExists)
                && <div className="col-md-7 col-sm-12">
                    <h3>Add new admin</h3>
                    <form onSubmit={handleAdminFormSubmit} className="text-start">
                        <label htmlFor="fullName" className="form-label"><strong>Full Name</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100 name'
                            name="fullName"
                            placeholder="FullName"
                            value={formValues.fullName}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('email')}}
                        />
                        {formValidator.message('email', formValues.email, 'required|email')}

                        <label htmlFor="phoneNumber" className="form-label"><strong>Phone number(11 digits)</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="phoneNumber"
                            placeholder="Phone number"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
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
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <label htmlFor="confirmPassword" className="form-label"><strong>Confirm Password</strong></label>
                        <input
                            type="password"
                            className='form-control mb-3 w-100'
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formValues.confirmPassword}
                            onChange={handleChange}
                            autoComplete="off"
                        />

                        <button className="btn btn-large btn-success" type="submit">Submit</button>
                    </form>
                </div>
            }
            </div>
        </section>
    )
}

export default RegisterAdminPage