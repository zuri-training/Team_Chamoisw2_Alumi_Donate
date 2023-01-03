import React from 'react'
import { useNavigate } from 'react-router-dom'
import AboutUsImage from './../assets/images/aboutUsImage.svg'
import LearnMoreImage from './../assets/images/learnmore.svg'
import FaqsImage from './../assets/images/faqs.svg'
import FeaturesImage from './../assets/images/features.svg'
import './styles/aboutus.scss'

const AboutUs = () => {
  const navigate = useNavigate()

  return (
    <>
      <main className='container'>
        <section className='row justify-content-center site-text-color'>
          <div className='col-9'>
            <h5>Who We Are</h5>
            <h4 className='mt-3'>We are a platform that helps alumnis give back to their Alma-Mater.</h4>
            <h3 className='mt-5' style={{ fontWeight: 400 }}>
            Alumni donate is a donation platform that is designed to connect organisations like colleges
            with their past students through funds. We are committed to keeping alma mater in the minds 
            of their students and helping colleges raises funds for the improvement of their institutions.
            </h3>
          </div>
        </section>

        {/* First image on page */}
        <section className='row mt-5'>
          <img src={AboutUsImage} alt="about us" />
        </section>

        <section className='row justify-content-center site-text-color'>
          <h2>We are trusted, secure and efficient.</h2>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <div className='row justify-content-around'>
              <div className='col-2 d-flex align-items-center text-end num-donations mx-1'>1m+</div>
              <div className='col-8 d-flex align-items-center text-start'>we have raised over 1m donations in over 30 countries around the world.</div>
            </div>
          </div>
          <div className='col-lg-4 col-md-6 col-sm-12'>
            <div className='row justify-content-around'>
              <div className='col-2 d-flex align-items-center text-end rating mx-1'>#1</div>
              <div className='col-8 d-flex align-items-center text-start'>we are rated #1 on forbes list on best school donation platforms.</div>
            </div>
          </div>
        </section>

        {/* Signin and Signup button */}
        <section className='row justify-content-start'>
          <div className='col-md-3 col-sm-12 col-xs-12 col-lg-2 d-flex justify-content-xs-center justify-content-sm-center justify-content-lg-start mx-0 px-0'><button className="btn site-text-color bg-white border rounded p-5" onClick={() => navigate('/login')}>Sign-in</button></div>
          <div className='col-md-3 col-sm-12 col-xs-12 col-lg-2 d-flex justify-content-sm-center justify-content-lg-start mx-0 px-0'><button className="btn site-bg-color text-white border rounded p-5" onClick={() => navigate('/signup')}>Sign-up</button></div>
        </section>

        {/* Learn more about us */}
        <section className='row my-5 justify-content-between learn-more'>
          <h1 className='site-text-color text-start'>Learn more about us</h1>
          <div className="col-md-3 mb-4"><img src={LearnMoreImage} className="w-100" alt="learn more" /><h2 className='text-md-start text-sm-center site-text-color'>Learn more...</h2></div>
          <div className="col-md-3 mb-4"><img src={FaqsImage} className="w-100" alt="faqs" /><h2 className='text-md-start site-text-color'>Faqs</h2></div>
          <div className="col-md-3 mb-4"><img src={FeaturesImage} className="w-100" alt="features" /><h2 className='text-md-start text-sm-center site-text-color'>Features...</h2></div>
        </section>
      </main>
    </>
  )
}

export default AboutUs
