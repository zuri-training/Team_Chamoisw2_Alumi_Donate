import React, { useEffect, useState, useLayoutEffect, useMemo } from 'react'
import useUserProfile from './../../../../hooks/profile'
import useColleges from './../../../../hooks/colleges'
import useAuth from '../../../../hooks/auth'
import { PencilSquare, XCircle, HddFill, PersonBoundingBox, Link as LinkIcon } from 'react-bootstrap-icons'
import './../../../styles/profile.scss'
import { Toast } from '../../ToastAlert'
import { SET_DONATION_LINK } from '../../../../redux/actions'
import { useDispatch } from 'react-redux'
import useDonations from '../../../../hooks/donations'

const Profile = () => {
    const { getUserData, updateUserData } = useUserProfile()
    const [formValues, setFormValues] = useState(null)
    const [oldFormValues, setOldFormValues] = useState(null)
    const [years, setYears] = useState([]);
    const [colleges, setColleges] = useState([])
    const [formProcessing, setFormProcessing] = useState(false)
    const { getColleges } = useColleges()
    const { getDonationReduxData } = useDonations()
    const dispatch = useDispatch()

    useMemo(() => {
        (async () => {
            try{
                const userData = (await getUserData()).data   
                setFormValues({...userData, password: '', collegeId: userData.collegeId._id})
                setOldFormValues({...userData, password: ''})
            }catch(err){
                console.log(err)
            }
        })()
    }, [])

    // Rendered in graduation year dropdown
    useLayoutEffect(() => {
        const yearsArr = []
        for(let x=1900; x < 2200; x++){
          yearsArr.push(x)
        }
        setYears(yearsArr)
      }, [])
    
    // Fetches the list of all college institutions
    useEffect(() => {
        (async () => {
            try {
            const response = await getColleges()
            setColleges(response.data.message)
            } catch (error) {
            console.log(error)
            }
            
        })()
    },[getColleges])

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        setFormProcessing(prev => (true))
        let updatedValues = null
        updatedValues = await updateUserData(formValues)

        if(updatedValues){
            setOldFormValues({...updatedValues.data, password: ''})
            setFormValues({...updatedValues.data, password: ''})
            setFormProcessing(prev => (false))

            // Hides all the input fields of the form
            Object.keys(formValues).forEach(formKey => {
                hideInputBox(formKey)
            })

            // Updates the donation link
            dispatch({ type: SET_DONATION_LINK, payload: updatedValues.data.collegeId.donationLink })
        }else {
            setFormProcessing(prev => (false))

            // Hides all the input fields of the form
            Object.keys(formValues).forEach(formKey => {
                hideInputBox(formKey)
            })
        }
        
    }

    const resetFormValue = (inputTitle) => {
        setFormValues({...formValues, [inputTitle]: oldFormValues[inputTitle]})
    }

    const showInputBox = (inputTitle) => {
        document.querySelector(`section.${inputTitle}`).style.zIndex = 2;
        document.querySelector(`div.${inputTitle}`).style.zIndex = 1;
    }

    const hideInputBox = (inputTitle) => {
        document.querySelector(`section.${inputTitle}`).style.zIndex = 1;
        document.querySelector(`div.${inputTitle}`).style.zIndex = 2;

        resetFormValue(inputTitle)
    }

    const copyDonationLink = () => {
        const { donationLink } = getDonationReduxData()
        
        navigator.clipboard.writeText(`${process.env.REACT_APP_CLIENT_URL}/donate/${donationLink.replaceAll('"', '')}`);

        Toast.fire({
            icon: "success",
            title: "Donation link copied"
        })
    }

    return (
        Boolean(formValues) 
        && Boolean(oldFormValues) 
        && <div className='row mb-5 justify-content-around'>
            <h2 className='text-start'><PersonBoundingBox className="fs-2 site-text-color" /> My Profile</h2>
            <form onSubmit={handleSubmit} className="row d-flex flex-column" style={{ height: "25rem" }}>
                {/* Fullname */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='h-100 d-flex align-items-center position-absolute fullName w-50'>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Firstname Lastname"
                        value={formValues.fullName}
                        onChange={handleChange} 
                        className="form-control w-100 h-100"
                        style={{ zIndex: 1 }}
                        autoComplete="off"
                    />
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('fullName')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white fullName" style={{ zIndex: 2 }}><strong>Fullname: </strong> {oldFormValues.fullName} <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('fullName')}/> </div>
                </div>
                
                {/* Email */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='d-flex align-items-center position-absolute email w-50'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formValues.email}
                        onChange={handleChange} 
                        className="form-control w-100"
                        style={{ zIndex: 1 }}
                        autoComplete="off"
                    />
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('email')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white email" style={{ zIndex: 2 }}><strong>Email: </strong> {oldFormValues.email} <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('email')}/> </div>
                </div>

                {/* Phone number */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='d-flex align-items-center position-absolute phoneNumber w-50'>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formValues.phoneNumber}
                        onChange={handleChange} 
                        className="form-control w-100"
                        style={{ zIndex: 1 }}
                        autoComplete="off"
                    />
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('phoneNumber')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white phoneNumber" style={{ zIndex: 2 }}><strong>Phone-Number: </strong> {oldFormValues.phoneNumber} <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('phoneNumber')}/> </div>
                </div>

                {/* Password */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='d-flex align-items-center position-absolute password w-50'>
                    <input
                        type="password"
                        name="password"
                        placeholder="New password"
                        value={formValues.password}
                        onChange={handleChange} 
                        className="form-control w-100"
                        style={{ zIndex: 1 }}
                        autoComplete="off"
                    />
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('password')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white password" style={{ zIndex: 2 }}><strong>Change Password: </strong> <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('password')}/> </div>
                </div>

                {/* Year of graduation */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='d-flex align-items-center position-absolute gradYear w-50'>
                    <select 
                        name='gradYear'
                        value={formValues.gradYear}
                        onChange={handleChange} 
                        className="form-control w-100">
                        <option value={oldFormValues.gradYear}>{ oldFormValues.gradYear }</option>
                        {
                            years.length > 0 && years.map(year => (<option value={year} key={year}>{year}</option>))
                        }
                    </select>
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('gradYear')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white gradYear" style={{ zIndex: 2 }}><strong>Year of graduation: </strong> { oldFormValues.gradYear } <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('gradYear')}/></div>
                </div>

                {/* College Institution */}
                <div className='col-12 position-relative form-input-height'>
                    <section className='d-flex align-items-center position-absolute collegeId w-100'>
                    <select 
                        name='collegeId'
                        value={formValues.collegeId}
                        onChange={handleChange} 
                        className="form-control w-100">
                        <option value={oldFormValues.collegeId._id}>{ oldFormValues.collegeId.name }</option>
                        {
                            colleges.length > 0 && colleges.map(college => (<option value={college._id} key={college._id}>{college.name} ({college.location})</option>))
                        }
                    </select>
                    <XCircle className="mx-3 fs-4 text-danger" role="button" onClick={() => hideInputBox('collegeId')} />
                    </section>
                    <div className="w-100 h-100 position-absolute text-start bg-white collegeId" style={{ zIndex: 2 }}><strong>College (Institution): </strong> { oldFormValues.collegeId.name } <PencilSquare className="fs-5 text-info" role="button" onClick={() => showInputBox('collegeId')}/></div>
                </div>
                {/* Submit button */}
                <div className='col-12 position-relative d-flex justify-content-start align-items-start form-input-height'>
                    <button type='submit' className='btn btn-lg btn-success w-50 signup-button' disabled={formProcessing? 'disabled':''}> <HddFill className='mx-3 text-white'/> Update </button>
                </div>

                {/* Donation link button */}
                <div className='col-12 position-relative d-flex justify-content-start align-items-start form-input-height mt-3'>
                    <button type="button" className='btn btn-lg btn-outline-info w-50' onClick={copyDonationLink}><LinkIcon /> Copy donation link</button>
                </div>
            </form> 
            </div>
    )
}

export default Profile;