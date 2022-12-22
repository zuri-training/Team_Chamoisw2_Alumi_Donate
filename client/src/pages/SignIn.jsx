import React,{ useState } from 'react';
import useAuth from './../hooks/auth'

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });

  const { loginUser }  = useAuth()
  
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async e => {
    e.preventDefault();
    
    loginUser(formValues)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formValues.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formValues.confirmPassword}
        onChange={handleChange}
      />
      
      <button type='submit'>Login</button>
      </form>
  )
};

export default SignIn;