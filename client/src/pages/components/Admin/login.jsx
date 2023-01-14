import React,{ useState, useLayoutEffect } from 'react';
import useAuth from './../../../hooks/auth'
import { Link, useNavigate } from 'react-router-dom'

const AdminSignIn = () => {
  const [formValues, setFormValues] = useState({ email: '', password: ''});
  const { loginAdmin, adminExists: adminExistsFunc }  = useAuth()
  const [adminExists, setAdminExists] = useState(false);
  const navigate = useNavigate() 

  useLayoutEffect(() => {
    (async () => {
      setAdminExists(await adminExistsFunc())
    })()
  },[])

  const handleChange = e => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedIn = await loginAdmin(formValues)
    
    if(loggedIn) { 
      navigate('/admin')
    }
  }

  return (
    <div className="sign-in row justify-content-center my-5">
     <div className='col-md-7 col-sm-12 d-flex flex-column mt-1 align-items-center justify-content-center text-center'>
     <h4>Welcome</h4>
     <p>Input email and password to login into your account</p>
     </div>
     <div className='col-md-6'>
          <form onSubmit={(e) => handleSubmit(e)} autoComplete="off">
          <input
            type="email"
            className='form-control mb-3'
            name="email"
            placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
            autoComplete="off"
          />
          <input
            type="password"
            className='form-control mb-3'
            name="password"
            placeholder="Password"
            value={formValues.password}
            onChange={handleChange}
            autoComplete="off"
          />
          
          <button type='submit' className='btn btn-lg login-button'>Login</button>
          </form>
      </div>
        {/* If admin has not been registered, show the link for registration */}
        {
          !adminExists &&
          <div className='col-12'>
            <div className='text-center mt-3'>Don't have an account? <Link to="/admin/register">Register</Link></div>
          </div>
        }
      </div>
  )
};

export default AdminSignIn;