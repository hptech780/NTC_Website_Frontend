import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Aboutus from './components/Aboutus';
import EventCard from './components/EventCard';
import Showcase from './components/Showcase';
import Contactus from './components/Contactus';
import Footer from './components/Footer';
import ExecutiveTeam from './components/ExecutiveTeam';
import BlogComponent_01 from './components/BlogComponent';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BlogPosts from './components/BlogComponent_01.jsx';
import Blog from './components/BlogComponent';
import Login from './components/Login.jsx';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import AuthProvider from './components/AuthContext.jsx';
import Logout from './components/Logout.jsx';
import Upload from './components/UploadOne.jsx';
import AdminLogin from './components/AdminLogin.jsx';

const App = () => {
  const [isBlogVisible, setIsBlogVisible] = useState(false);
  const toggleBlogVisibility = () => {
    setIsBlogVisible(!isBlogVisible);
  };

  const domain = "dev-6jvj3wc7b5d83p0u.us.auth0.com";
  const clientId = "RKKPaMiQpupJDXafzRcox41hMv8j7ygg";

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
    <AuthProvider>
      <BrowserRouter>
      <div>
        <Navbar toggleBlogVisibility={toggleBlogVisibility} />
        {isBlogVisible && <BlogPosts />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/blogcomponent/:id" element={<Blog />} />
          <Route path="/" exact element={<HeroSection />} />
          <Route path="/blog" element={<BlogPosts />}
           />
            <Route path="/logout" element={<Logout />}

           />
            <Route path="/createBlog" element={<Upload />}
            />

<Route path="/login/admin" element={<AdminLogin />}
            />
        </Routes>
        
        <Footer />
      </div>
      </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>
  );
};

export default App;
