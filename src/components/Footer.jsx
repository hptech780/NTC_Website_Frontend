import React from 'react';
//  
// import './Footer.css'; // Assuming custom styles

const Footer = () => {
  return (
    <footer className="primary-bg text-white p-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="text-lg font-semibold">About NTC</h3>
            <p>We are Nepal TeK Community (NTC), a student-driven tech community and forum at NCIT connecting NCITians and beyond.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <p>Email: <a href="mailto:tekcommunity@ncit.edu.np">tekcommunity@ncit.edu.np</a></p>
            <p>Phone: +977-9800000000</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/NepalTekComm" className="text-white hover:text-gray-300 social-icon">
                <img src="resources/img/icons/facebook.svg" alt="" className="w-6 h-6" />
              </a>
              <a href="https://www.twitter.com/NepalTekComm" className="text-white hover:text-gray-300 social-icon">
                <img src="resources/img/icons/twitter.svg" alt="" className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/NepalTekComm" className="text-white hover:text-gray-300 social-icon">
                <img src="resources/img/icons/linkedin.svg" alt="" className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/NepalTekComm" className="text-white hover:text-gray-300 social-icon">
                <img src="resources/img/icons/instagram.svg" alt="" className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-white-300 text-sm">&copy; {new Date().getFullYear()} Nepal TeK Community. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
