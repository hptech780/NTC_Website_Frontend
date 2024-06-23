import React from 'react';
 import AboutUs from './Aboutus';
 import Showcase from './Showcase';
 import EventCard from './EventCard';
 import ExecutiveTeam from './ExecutiveTeam';
 import Contactus from './Contactus';

// import './HeroSection.css'; // Assuming custom styles

const HeroSection = () => {
  return (
    <>
    <section id="hero" className="d-flex align-items-center justify-content-center bg-gray-100 py-8">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6 d-flex flex-column justify-content-center pt-4 pt-lg-0 order-2 order-lg-1">
            <h1>"Empowering Innovation, Connecting Minds: Welcome to Nepal Tek!"</h1>
            <h2>Join our community of Nepali tech enthusiasts and ignite your digital journey!</h2>
            <div className="d-flex justify-content-center justify-content-lg-start">
              <a href="#about" className="btn-get-started scrollto">More About Us</a>
            </div>
            <div className="social-media mt-5 d-flex justify-content-center">
              <a href="#"><i className="fab fa-facebook fa-2x"></i></a>
              <a href="#"><i className="fab fa-instagram fa-2x"></i></a>
              <a href="#"><i className="fab fa-twitter fa-2x"></i></a>
              <a href="#"><i className="fab fa-discord fa-2x"></i></a>
              <a href="#"><i className="fab fa-linkedin fa-2x"></i></a>
            </div>
          </div>
          {/* <div className="col-lg-6 order-1 order-lg-2 hero-img">
            <img src="assets/img/hero-img.png" className="img-fluid animated" alt="Hero" />
          </div> */}
        </div>
      </div>

      
    </section>

<AboutUs />
<br />
<Showcase />
{<h3>Events</h3>}
<EventCard />
<br /> <hr />
<h3>Team</h3>
<ExecutiveTeam />


<Contactus />
</>
  );
};

export default HeroSection;
