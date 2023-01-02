import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useColleges from '../hooks/colleges';
import useAuth from './../hooks/auth';
import useDonations from './../hooks/donations'
import SignupImage from './../assets/images/signup-image.svg';
import { RESET_DONATION_LINK } from './../redux/actions'
import './styles/signup.scss'

function SignUp() {
  const [formValues, setFormValues] = useState({
    fullName: '',
    collegeId: '',
    phoneNumber: '',
    gradYear: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [years, setYears] = useState([])
  const [colleges, setColleges] = useState([])
  const { signupUser } = useAuth()
  const { getColleges, getCollege } = useColleges()
  const { getDonationReduxData } = useDonations()
  const dispatch = useDispatch()
  const [formProcessing, setFormProcessing] = useState(false)

  useLayoutEffect(() => {
    const yearsArr = []
    for(let x=1900; x < 2200; x++){
      yearsArr.push(x)
    }
    setYears(yearsArr)
  }, [])

  useEffect(() => {
    
    // Check if the signup page is being accessed via a donation link
    if(getDonationReduxData().donationLink !== ''){
      (async () => {
        try {
          const response = await getCollege( getDonationReduxData().donationLink )
          const collegeFound = response.data.data.message
          
          if(collegeFound.length === 1){
            setColleges(collegeFound)
            setFormValues({ ...formValues, collegeId: collegeFound[0]._id })  
            //Remove the donationLink from redux store
            dispatch({ type: RESET_DONATION_LINK })

          }else{
            console.log(response.data)
          }
        } catch (error) {
          console.log(error)
        }
      })()  
    }else{
      (async () => {
        try {
          const response = await getColleges()
          setColleges(response.data.message)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  },[])

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setFormProcessing(prev => (true))
    await signupUser(formValues)
    setFormProcessing(prev => (false))
  }

  return (
    colleges.length > 0 &&
    <section className='signup-page'>
    <div className='row justify-content-center'>
      <div className="col-md-5 d-flex justify-content-end">
        <img src={SignupImage} alt="signup" style={{width: "100%", height: "100vh"}} />
      </div>
      <div className="col-md-5 d-flex flex-column justify-content-start">
        <h1 className='mt-5'>Sign up to Alumni Donate</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Firstname Lastname"
        value={formValues.fullName}
        onChange={handleChange} 
        className="form-control"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange} 
        className="form-control"
      />
       <input
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
        value={formValues.phoneNumber}
        onChange={handleChange} 
        className="form-control"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange} 
        className="form-control"
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formValues.confirmPassword}
        onChange={handleChange} 
        className="form-control"
      />
      <select 
        name='collegeId'
        value={formValues.collegeId}
        onChange={handleChange} 
        className="form-control"
        disabled={ colleges.length === 1 ? 'disabled': '' }>
        {/* 
          This college option is loaded if the signup page is accessed via a donation link
          (i.e The college donation link is same as the donation link used to access the website) 
        */}
        {
          colleges.length === 1 
          && <option value={colleges[0]._id} key={colleges[0]._id}>{colleges[0].name} ({colleges[0].location})</option>
        }
        { colleges.length > 1  && <option>Choose your Alma Mater</option> }
        {
          colleges.length > 1 && colleges.map(college => (<option value={college._id} key={college._id}>{college.name} ({college.location})</option>))
        }
      </select>
      <select 
        name='gradYear'
        value={formValues.gradYear}
        onChange={handleChange} 
        className="form-control">
        <option>Select Year of Graduation</option>
          {
            years.length > 0 && years.map(year => (<option value={year} key={year}>{year}</option>))
          }
      </select>
      {/* Terms and Conditions section */}
      <div className='row'>
        <div className='col-12 d-flex mb-2'>
          <input type="checkbox" className='mb-0' />&nbsp;&nbsp;<span> By registering, you are agreeing to our terms and conditions</span>
        </div>
      </div>
      <button type='submit' className='btn btn-lg w-100 signup-button' disabled={formProcessing? 'disabled':''}>Signup</button>
    </form>
    </div>
    </div>
    </section>
  )
}

export default SignUp;
