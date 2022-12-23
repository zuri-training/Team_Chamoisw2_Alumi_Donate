import React, { useEffect, useLayoutEffect, useState } from 'react';
import useColleges from '../hooks/colleges';
import useAuth from './../hooks/auth';
import SignupImage from './../assets/images/signup-image.svg';
import './styles/signup.scss'
import Header from './components/Header';
import Footer from './components/Footer';

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
  const [years, setYears] = useState([]);
  const [colleges, setColleges] = useState([])
  const { signupUser } = useAuth();
  const { getColleges } = useColleges()

  useLayoutEffect(() => {
    const yearsArr = []
    for(let x=1000; x < 2200; x++){
      yearsArr.push(x)
    }
    setYears(yearsArr)
  }, [])

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
    
    signupUser(formValues)
  }

  return (
    <section className='signup-page'>
    <Header />
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
        className="form-control">
        <option>Choose your Alma Mater</option>
          {
            colleges.length > 0 && colleges.map(college => (<option value={college._id} key={college._id}>{college.name} ({college.location})</option>))
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
      <button type='submit' className='btn btn-lg w-100 signup-button'>Signup</button>
    </form>
    </div>
    </div>
    <Footer />
    </section>
  )
}

export default SignUp;
