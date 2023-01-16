import { useState, useMemo } from "react"
import useBanks from "../../../../hooks/banks"
import SimpleReactValidator from "simple-react-validator"

const RegisterBankPage = () => {
    const { registerBank } = useBanks()
    const [formValues, setFormValues] = useState({
        name: '',
        slug: '',
        code: ''
    })
 
    const formValidator = useMemo(() => (new SimpleReactValidator({
        element: message => <div className="text-danger mb-3">{message}</div>,
        validators: {
            bank_slug: {  // name the rule
              message: 'The slug must be made up of three or more capital letters',
              rule: (val, params, validator) => {
                return val.length > 0 ? validator.helpers.testRegex(val,/^[A-Z]{3,}$/): true
              }
            }
        }
    })), [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormValues(prev => ({
            ...prev,
            [name] : value
        }))
    }

    const handleBankFormSubmit = async (e) => {
        e.preventDefault()
        
        if (formValidator.allValid()) {
            
            await registerBank(formValues)

        } else {
            formValidator.showMessages();

            window.scrollTo(0,0)
        }
    }

    return (
            <div className="col-md-9 col-sm-12">
                    <h3>Add a Bank</h3>
                    <form onSubmit={handleBankFormSubmit} className="text-start">
                        <label htmlFor="name" className="form-label"><strong>Name</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="name"
                            placeholder="Name"
                            value={formValues.name}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('name')}}
                        />
                        {formValidator.message('name', formValues.name, 'required|alpha_num_space|min:3,string')}

                        <label htmlFor="slug" className="form-label"><strong>Slug (optional)</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="slug"
                            placeholder="Slug"
                            value={formValues.slug}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('slug')}}
                        />
                        {formValidator.message('slug', formValues.slug, 'bank_slug')}

                        <label htmlFor="code" className="form-label"><strong>Code</strong></label>
                        <input
                            type="text"
                            className='form-control mb-3 w-100'
                            name="code"
                            placeholder="Code"
                            value={formValues.code}
                            onChange={handleChange}
                            autoComplete="off"
                            onBlur={() => {formValidator.showMessageFor('code')}}
                        />
                        {formValidator.message('code', formValues.code, 'required|string|min:3,string')}

                        <button className="btn btn-large btn-success" type="submit">Submit</button>
                    </form>
                </div>
        
    )
}

export default RegisterBankPage