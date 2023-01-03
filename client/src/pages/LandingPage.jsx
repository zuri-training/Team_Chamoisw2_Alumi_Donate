import React from 'react';
import heroBlue from './../assets/images/heroBlue.svg';
import heroDonate from './../assets/images/heroDonate.svg'
import heroDonateBg from './../assets/images/heroDonateBg.svg'
import testimonial1 from './../assets/images/testimonial1.svg'
import testimonial2 from './../assets/images/testimonial2.svg'
import graduation from './../assets/images/graduation.svg'
import map from './../assets/images/map.svg'
import './../pages/styles/landingpage.scss'
import 'bootstrap/dist/css/bootstrap.min.css'

const LandingPage = () => {
  return <>
      <main className='w-100 mb-5 mx-0'>
        {/* Hero */}
       <section className='row mx-0'>
        <div className='hero-div offset-md-2 col-md-4 px-0 mr-0 d-flex justify-content-center align-items-center position-relative flex-column '>
          <img src={heroBlue} alt="hero-left" className='img-fluid' style={{ width: "100%", height: "100%", zIndex: 1 }} />
          <div className='text-div w-100 p-5'>
            <h3 className='alma-mater-text'>GIVING BACK TO YOUR ALMA MATER</h3>
            <p>Just got easier. With this platform where you are able to give back to your former institution in a few steps without hassle. Want to know how</p>
            <button className='get-started-button'>Get started</button>
          </div>
        </div>

        <div className='col-md-4 position-relative d-flex align-items-center px-0 mx-0'>
          <img src={heroDonate} alt="hero-right" className='img-fluid position-absolute' style={{ zIndex:2 }} />
          <img src={heroDonateBg} alt="hero-right-bg" className='img-fluid position-relative' style={{ zIndex:1 }} />
        </div>
       </section>
        <br />
        {/* Our mission and testimonials */}
        <section className='row our-mission align-items-center flex-column mt-3 py-3 mx-0'>
          <h2 className='mt-3'>Our Mission</h2>
          <div className='row justify-content-around mt-5'>
            <div className="col-sm-4 col-lg-3 d-flex flex-column align-items-center mb-5"><span className='mission-number'>01</span><div className='mission-text'>To help institutions reach their project targets by connecting them to their Alumnis who would want to be a part of these projects.</div></div>
            <div className="col-sm-4 col-lg-3 d-flex flex-column align-items-center mb-5"><span className='mission-number'>02</span><div className='mission-text'>To ensure that 10,000 Nigerian students get scholarships through the fundings generated  from this platform.</div></div>
            <div className="col-sm-4 col-lg-3 d-flex flex-column align-items-center mb-5"><span className='mission-number'>03</span><div className='mission-text'>To help Alumnis,  make donations to their Alma-Mater Hassle-free, through verified source</div></div>
          </div>

          {/* Learn more button */}
          <div className='row mt-5 justify-content-center'><button className='learn-more'>Learn more</button></div>

          {/* Testimonial header */}
          <div className='row mt-5 justify-content-center'>
            <h3>Testimonials</h3>
            <h5>Here are what has been said about us</h5>
            <br />
            <strong></strong><strong></strong><strong></strong>
          </div>
          
          <div className='row testimonial justify-content-center mt-4' style={{ maxHeight: "64rem" }}>
            <div className="col-sm-12 col-md-6 col-lg-3 mb-5 mx-3 box d-flex flex-column justify-content-between align-items-center h-100">
              
              <p style={{ height: "16rem" }}>The Alumni Donation platform helped us get off the ground with our project. After the donation $60,000 in funding from Alumni of our Institution from all over the world. Your help was instrumental in this success Of our Lecture halls project.</p>
              <br /> <img src={testimonial1} alt="testimonial1" className='img-fluid'/>
              
            </div>

            <div className="col-sm-12 col-md-6 col-lg-3 mb-5 mx-3 box d-flex flex-column justify-content-between align-items-center h-100">
              
              <p style={{ height: "16rem" }}>Your generosity and commitment is exactly the kind of community involvement we need to keep The Nigerian Universities going strong. The many scholarships, grants, and financial aid opportunities to University students are a testament to the support of the alumni, of the University.</p>
              <br /><img src={testimonial2} alt="testimonial2" className="img-fluid" />
              
            </div>
          </div>
        </section>

        <section className='row mt-5 mx-0 make-a-difference justify-content-center align-items-center flex-column'>
          <h2 className='my-5'>Make a difference</h2>
          <div className="row justify-content-evenly">
            <div className='col-md-4 offset-md-1 d-flex align-items-center px-2'><p className='font-bold'>You Can Help A lot of People By Donating A little. Your level of commitment can be as much or as little as you like when helping your institution handle projects. There are many benefits your donations can offer, such as developing your skills, enhancing employability, promoting your institution and keeping in touch with fellow alumni and scholars at the same time supporting a cause you care about.</p></div>
            <div className='col-md-4'><img src={graduation} alt='graduation' className='img-fluid' /></div>
          </div>
          <br />
          <h2 className='my-5'>Donations to all Universities in Nigeria</h2>
          <div className="row justify-content-evenly">
            <div className='col-md-4 offset-md-1 d-flex align-items-center px-2'><p className='font-bold'>You can find every Nigerian university on our platform, we are changing the ways you can give back and get involved. We will be providing a platform for you to connect and network with you institution and their alumni body across the country.</p></div>
            <div className='col-md-4'><img src={map} alt='donation' className='img-fluid' /></div>
          </div>
        </section>
      </main>  
  </>;
};

export default LandingPage;
