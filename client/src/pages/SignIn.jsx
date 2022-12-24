import React,{ useState } from 'react';
import useAuth from './../hooks/auth'
import LoginImage from './../assets/images/Secure-login.svg'
import './styles/signin.scss'
import Header from './../pages/components/Header'
import Footer from './../pages/components/Footer'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: '',
    password: ''
  });
  const [formSubmit, setFormSubmit] = useState(false)
  const { loginUser }  = useAuth()
  
  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmit(prev => (true))
    await loginUser(formValues)
    setFormSubmit(prev => (false))
  }

  return (
    <div className="sign-in row justify-content-center text-left">
     <Header />
     <div className='col-md-10 d-flex flex-column justify-content-start align-items-start mt-1'>
     <h4>Welcome</h4>
     <p>Input email and password to login into your account</p>
     </div>
     <div className="col-md-5 d-flex align-items-center justify-content-end">
      <div className='row'>
        <div className='col-12'>
          <form onSubmit={(e) => handleSubmit(e)} className="w-100">
          <input
            type="email"
            className='form-control mb-3 w-100'
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className='form-control mb-3 w-100'
            name="password"
            placeholder="Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
          />
          <div className='row mb-5'><div className='col-12 d-flex justify-content-between'><span><input type={"checkbox"} /> Remember me</span> <span>Forgot Password?</span></div></div>
          <button type='submit' className='btn btn-lg login-button' disabled={formSubmit ? 'disabled':''}>Login</button>
          </form>
        </div>
        <div className='col-12'>
          <div className='text-start mt-3'>Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
      </div>
      </div>
      <div className="col-md-5 d-flex align-items-end ">
      <img src={LoginImage} alt="secure-login" style={{width: "100%", height: "100vh"}} />
      </div>

      <Footer />
    </div>
    
  )
};

export default SignIn;