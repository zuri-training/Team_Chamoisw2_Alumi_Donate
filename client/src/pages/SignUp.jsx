import React, { useEffect, useLayoutEffect, useState } from 'react';
import useColleges from '../hooks/colleges';
import useAuth from './../hooks/auth';

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
  },[])

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Firstname Lastname"
        value={formValues.fullName}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
      />
       <input
        type="text"
        name="phoneNumber"
        placeholder="Phone number"
        value={formValues.phoneNumber}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.password}
        onChange={handleChange}
      />
      <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm password"
        value={formValues.confirmPassword}
        onChange={handleChange}
      />
      <select 
        name='collegeId'
        value={formValues.collegeId}
        onChange={handleChange}>
        <option>Choose your Alma Mater</option>
          {
            colleges.length > 0 && colleges.map(college => (<option value={college._id} key={college._id}>{college.name} ({college.location})</option>))
          }
      </select>
      <select 
        name='gradYear'
        value={formValues.gradYear}
        onChange={handleChange}>
        <option>Select Year of Graduation</option>
          {
            years.length > 0 && years.map(year => (<option value={year} key={year}>{year}</option>))
          }
      </select>
      <button type='submit'>Signup</button>
    </form>
  )
}

export default SignUp;
