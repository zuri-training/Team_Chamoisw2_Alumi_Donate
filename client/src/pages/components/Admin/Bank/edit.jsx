import { useState, useLayoutEffect } from "react"
import SimpleReactValidator from "simple-react-validator"
import { Toast } from "./../../ToastAlert"
import { useNavigate } from "react-router-dom"
import useBanks from "../../../../hooks/banks"

const EditBankPage = () => {
    const [formValidator, setFormValidator] = useState(null)
    const [formValues, setFormValues] = useState(null)
    const { getBankReduxData, updateBankDetails } = useBanks()


    useLayoutEffect(() => {
        const { _id, name, slug, code } = getBankReduxData()
        
        setFormValues({ 
            _id,
            name,
            slug,
            code
        })
    }, [])

    useLayoutEffect(() => {
        setFormValidator(new SimpleReactValidator({
            element: message => <div className="text-danger mb-3">{message}</div>,
        }))
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

            await updateBankDetails(formValues)

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
            <h2>Edit Bank Details</h2>
            <form onSubmit={handleEditFormSubmit} className="text-start offset-md-2 col-md-8">
                <label htmlFor="name" className="form-label"><strong>Name</strong></label>
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

                <label htmlFor="slug" className="form-label"><strong>Slug</strong></label>
                <input
                    type="text"
                    className='form-control mb-3 w-100'
                    name="slug"
                    placeholder="Slug"
                    value={formValues.slug}
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('slug')}}
                />
                {formValidator.message('slug', formValues.slug, 'required|string|min:3')}

                <label htmlFor="code" className="form-label"><strong>Code</strong></label>
                <input
                    type="text"
                    className='form-control mb-3 w-100'
                    name="code"
                    placeholder="Code"
                    value={formValues.code}
                    onChange={handleEditChange}
                    autoComplete="off"
                    onBlur={() => {formValidator.showMessageFor('code')}}
                />
                {formValidator.message('code', formValues.code, 'required|string|min:3')}

                <button className="btn btn-large btn-success submit-update-button" type="submit">Submit</button>
            </form>
            </div>
        </div>
    )
}

export default EditBankPage