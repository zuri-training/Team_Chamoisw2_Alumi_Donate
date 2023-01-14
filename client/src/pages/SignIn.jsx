import React,{ useState, useLayoutEffect } from 'react';
import useAuth from './../hooks/auth'
import LoginImage from './../assets/images/Secure-login.svg'
import './styles/signin.scss'
import { Link, useNavigate } from 'react-router-dom'


const SignIn = () => {
  const [formValues, setFormValues] = useState({ email: '', password: ''});
  const { loginUser, userIsAuth }  = useAuth()
  const navigate = useNavigate() 

  useLayoutEffect(() => {
    if(userIsAuth()){
      navigate('/dashboard')
    }
  },[navigate])

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginUser(formValues)
  }

  return (
    <div className="sign-in row justify-content-center text-left mb-5">
     <div className='col-md-10 col-sm-12 d-flex flex-column justify-content-sm-center justify-content-md-start align-items-sm-center align-items-md-start mt-1'>
     <h4>Welcome</h4>
     <p>Input email and password to login into your account</p>
     </div>
     <div className="col-md-5 col-sm-12 d-flex align-items-center justify-content-md-end justify-content-sm-center">
      <div className='row'>
        <div className='col-12'>
          <form onSubmit={(e) => handleSubmit(e)} className="w-100" autoComplete="off">
          <input
            type="email"
            className='form-control mb-3 w-100'
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            className='form-control mb-3 w-100'
            name="password"
            placeholder="Password"
            value={formValues.confirmPassword}
            onChange={handleChange}
            autoComplete="off"
          />
          <div className='row mb-5'><div className='col-12 d-flex justify-content-between'><span><input type={"checkbox"} /> Remember me</span> <span>Forgot Password?</span></div></div>
          <button type='submit' className='btn btn-lg login-button'>Login</button>
          </form>
        </div>
        <div className='col-12'>
          <div className='text-start mt-3'>Don't have an account? <Link to="/signup">Sign up</Link></div>
        </div>
      </div>
      </div>
      <div className="col-md-5 d-flex align-items-end d-sm-none d-xs-none d-md-flex">
      <img src={LoginImage} alt="secure-login" style={{width: "100%", height: "100vh"}} />
      </div>
    </div>
    
  )
};

export default SignIn;