import React from 'react';



const AboutUs = () => {
  return (
    <section id="introduction" className="bg-gray-100 p-8">
      <div className="container mx-auto flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 lg:pr-8">
          <div className="mb-8 lg:mb-0">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4"><a href="#" className="btn-about-us">ABOUT US</a></h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              "At Nepal Tek, we're more than just a community; we're a gathering of minds fueled by a shared passion for technology.
              We come together to collaborate, learn, and innovate. Through workshops, events, and shared experiences,
              we strive to cultivate an environment where ideas flourish and boundaries are pushed.
              Join us in shaping the future of tech in Nepal and beyond."
            </p>
            <h3 className=" mb-2"><span className="underline">OUR OBJECTIVES</span></h3>
            <ol className="list-decimal pl-6">
              <li className="mb-2">Promote Learning</li>
              <li className="mb-2">Cultivate Innovation</li>
              <li className="mb-2">Facilitate Collaboration</li>
            </ol>
          </div>
        </div>
        <div className="mb-8 w-full lg:w-1/2 lg:mb-0 flex justify-center">
          <div className="intro-image-card border-2 border-gray-300 rounded-lg overflow-hidden shadow-lg">
            <img src="resources/img/event-banners/community_announcement.jpg" alt="NTC Image" className="w-full lg:w-90 h-auto transition duration-300 transform hover:scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
