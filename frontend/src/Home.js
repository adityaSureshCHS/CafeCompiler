import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import React from 'react';
import './App.css';
import cartoonFood from './cartoon_food.jpg'; // Main image
const Home = () => {
    

    const handleButtonClick = () => {
        const navigate = useNavigate();
        navigate('/hub'); // Navigate to the new page
    };
    return (
        <div className="App">
      <div className="split-screen">
        {/* Left Section */}
        <div className="left-section">
          <div className="content-wrapper">
            <h1 className="hero-title">Sustenance Sentry</h1>
            <p className="hero-subtitle">
              Your trusted platform for restaurant insights and analytics.
            </p>
            <button className="cta-button" onClick={handleButtonClick}>Get Started</button>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="image-wrapper">
            <img src={cartoonFood} alt="Cartoon Food" className="main-image" />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="card-container">
        <div className="card">
          <h2>Contact Us</h2>
          <p>
            The team behind Sustenance Sentry is determined to help our community and protect our health, especially when it comes to dietary restrictions.

            For any questions about who we are or what we do, please reach out to us at <br></br><a class = "email" href="mailto:asuresh952@student.fuhsd.org"> asuresh952@student.fuhsd.org </a>
          </p>
        </div>
        
        <div className="card">
          <h2>Technology</h2>
          <p>At Sustenance Sentry, we are pushing for technology to fill the gaps in society. Using our all new webscraping services through various different applications, like BeautifulSoup and ScrapFly, as well as our utilization of Next-Gen AI models, combined with a sleek efficiency only possible through React and Flask frameworks, we fill the need that others simply can't.</p>
        </div>
        <div className="card">
          <h2>FAQs</h2>
          <h4> 1. Is this service completely free? </h4>
          <p class = "answers"> Yep! Completely free for everyone to use without any login required -- our mission is to help the most amount of people as possible without any limitations!</p>
          <h4> 2. How do you get your data? Can I trust it?</h4>
          <p class = "answers"> We utilize our webscraping services from reputable reviewers such as Yelp to compile a list of all the reviews and the menu items to determine the dietary-restriction friendliness of certain restaurants.</p>
          <h4> 3. I don't know where I want to eat before I find out what I am able to eat. Is there an option for me to learn about which restaurants fit me before choosing? </h4>
          <p class = "answers"> Yes! We have our software algorithms to filter based on your preferences a list of highly recommended food sources, available at any price.</p>
        </div>
        <div className="card">
          
          <h2>Our Mission</h2>
          <p>Here at Sustenance Sentry, we are committed to helping our community, through the food we eat. Sustanence Sentry is the only product that scrapes data from primary sources to compile information about dietary restrictions in restaurants -- information that is often difficult to acquire, to protect the lives of every person dealing with some form of restriction on what they can eat. This all stems from a personal level -- as individuals who ourselves struggle to find available spots far removed from the restraints of containing a certain food, we know just how real the struggle is for people suffernig from allergies or looking to match their unique diets. </p>
        </div>
      </div>
    </div>
    );
  };
  
  export default Home;
  