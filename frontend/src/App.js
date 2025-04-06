import React, { useState } from 'react';
import './App.css';
import cartoonFood from './cartoon_food.jpg'; // Main image

function App() {
  const [showCards, setShowCards] = useState(0); // State to toggle views

  const [submittedLink, setSubmittedLink] = useState(''); // State to store the submitted link
  const [submittedDiet, setSubmittedDiet] = useState('');
  const [submittedCity, setSubmittedCity] = useState(''); // State to store the submitted link
  const [submittedState, setSubmittedState] = useState('');
  const [submittedCuisine, setSubmittedCuisine] = useState(''); // State to store the submitted link
  const [submittedPrice, setSubmittedPrice] = useState('');
  const [inputValue, setInputValue] = useState(''); // State to track the input field value
  const [inputDiet, setInputDiet] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [inputState, setInputState] = useState('');
  const [inputCuisine, setInputCuisine] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [reviewData, setReviewData] = useState('')
  const [menuData, setMenuData] = useState('')
  const [holisticSearchData, setHolisticSearchData] = useState('')



  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update the input field value
    
  };

  const handleDietChange = (event) => {
    setInputDiet(event.target.value);
  }

  const handleCityChange = (event) => {
    setInputCity(event.target.value);
  }

  const handleStateChange = (event) => {
    setInputState(event.target.value);
  }

  const handleCuisineChange = (event) => {
    setInputCuisine(event.target.value);
  }

  const handlePriceChange = (event) => {
    setInputPrice(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setSubmittedLink(inputValue); // Store the submitted link
    setSubmittedDiet(inputDiet)
    setSubmittedCity(inputCity);
    setSubmittedState(inputState);
    setSubmittedCuisine(inputCuisine);
    setSubmittedPrice(inputPrice);
    setInputValue(''); // Clear the input field
    setInputDiet('');
    setInputCity('')
    setInputState('')
    setInputCuisine('')
    setInputPrice('')
  };

  const handleButtonClick = () => {
    setShowCards(1); // Show the 3 cards and hide the current content
  };

  const handleBackButtonClick = () => {
    setShowCards(0); // Hide the 3 cards and show the current content
  }

  const handleReviewsClick = () => {
    setShowCards(2); // Show the reviews section
  }

  const handleBackReviewsClick = () => {
    setShowCards(1); // Hide the reviews section
  }

  const handleMenuClick = () => {
    setShowCards(3); // Show the menu section
  }
  const handleBackMenuClick = () => {
    setShowCards(1); // Hide the menu section
  }
  const handleHolisticClick = () => {
    setShowCards(4); // Show the holistic section
  }
  const handleBackHolisticClick = () => {
    setShowCards(1); // Hide the holistic section
  }

  const review = async() => {
    const requestData = {
      submittedLink: inputValue,
      submittedDiet: inputDiet
    }
    try {
      const response = await fetch('https://127.0.0.1:500/review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response){
        throw new Error("Network response was not ok")
      }
      const data = await response.json();
      console.log('Response from Flask:', data);

      setReviewData(data);
    } catch (error){
      console.error('Error fetching data from Flask:', error)
    }
  }

  const menu = async() => {
    const requestData = {
      submittedLink: inputValue,
      submittedDiet: inputDiet
    }
    try {
      const response = await fetch('https://127.0.0.1:500/menu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response){
        throw new Error("Network response was not ok")
      }
      const data = await response.json();
      console.log('Response from Flask:', data);

      setMenuData(data);
    } catch (error){
      console.error('Error fetching data from Flask:', error)
    }

  }

  const holistic = async() => {
    const requestData = {
      submittedDiet: inputDiet,
      submittedCity: inputCity,
      submittedState: inputState,
      submittedCuisine: inputCuisine,
      submittedPrice: inputPrice
    }
    try {
      const response = await fetch('https://127.0.0.1:500/holistic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
      if (!response){
        throw new Error("Network response was not ok")
      }
      const data = await response.json();
      console.log('Response from Flask:', data);

      setHolisticSearchData(data);
    } catch (error){
      console.error('Error fetching data from Flask:', error)
    }
  }

  if (showCards === 0){
    return (
      <div className="App">
      
        <div className="bod">
        
        <div className="split-screen">
          {/* Left Section */}
          <div className="left-section">
            <div className="content-wrapper">
              <h1 className="hero-title">Sustenance Sentry</h1>
              <p className="hero-subtitle">
                Your trusted platform for restaurant insights and analytics.
              </p>
              <button className="cta-button" onClick={handleButtonClick}>
                Get Started
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="right-section">
            <div className="image-wrapper">
              <img src={cartoonFood} alt="Cartoon Food" className="main-image" />
            </div>
          </div>
          

        </div>
        <div className="card-container"><div className="card"><h2>Contact Us</h2><p>The team behind Sustenance Sentry is determined to help our community and protect our health, especially when it comes to dietary restrictions.For any questions about who we are or what we do, please reach out to us at <br></br><a class = "email" href="mailto:asuresh952@student.fuhsd.org"> asuresh952@student.fuhsd.org </a></p></div><div className="card"><h2>Technology</h2><p>At Sustenance Sentry, we are pushing for technology to fill the gaps in society. Using our all new webscraping services through various different applications, like BeautifulSoup and ScrapFly, as well as our utilization of Next-Gen AI models, combined with a sleek efficiency only possible through React and Flask frameworks, we fill the need that others simply can't.</p></div><div className="card"><h2>FAQs</h2><h4> 1. Is this service completely free? </h4><p class = "answers"> Yep! Completely free for everyone to use without any login required -- our mission is to help the most amount of people as possible without any limitations!</p><h4> 2. How do you get your data? Can I trust it?</h4><p class = "answers"> We utilize our webscraping services from reputable reviewers such as Yelp to compile a list of all the reviews and the menu items to determine the dietary-restriction friendliness of certain restaurants.</p><h4> 3. I don't know where I want to eat before I find out what I am able to eat. Is there an option for me to learn about which restaurants fit me before choosing? </h4><p class = "answers"> Yes! We have our software algorithms to filter based on your preferences a list of highly recommended food sources, available at any price.</p></div><div className="card"><h2>Our Mission</h2><p>Here at Sustenance Sentry, we are committed to helping our community, through the food we eat. Sustanence Sentry is the only product that scrapes data from primary sources to compile information about dietary restrictions in restaurants -- information that is often difficult to acquire, to protect the lives of every person dealing with some form of restriction on what they can eat. This all stems from a personal level -- as individuals who ourselves struggle to find available spots far removed from the restraints of containing a certain food, we know just how real the struggle is for people sufferingg from allergies or looking to match their unique diets. </p></div></div>
      </div>
    </div>
    );
  } else if (showCards === 1){
    return (
      <div className="App">
        
        <div className = "bod">
        
        <div className="card-container">
          
          <div className="card" id="review" onclick= {handleReviewsClick}>
            <h2>Reviews Search</h2>
            <p>Search through all the dietary information provided via reviews from people who have already been and know exactly what's what.</p>
            <button className="cta-button" id = "reviewbtn" onClick={handleReviewsClick}> Go! </button>
          </div>
          <div className="card" id="menu" onclick= {handleMenuClick}>
            <h2>Menu Search</h2>
            <p>Peruse through the menu and discover data about the extent of accessibility that the menus provide. </p>
            <button className="cta-button" onClick={handleMenuClick}> Go! </button>
          </div>
          <div className="card" id="holistic" onclick= {handleHolisticClick}>
            <h2>Holistic Search</h2>
            <p>Don't have a restaurant in mind? Click here and discover ratings of the top 30 yelp reviewed restaurants for a cuisine in a fitting price range. Know exactly where to go for the cuisine that floats your boat!</p>
            <button className="cta-button" onClick={handleHolisticClick}> Go! </button>
          </div>
        </div>
        </div>
        

        <button className="cta-button" onClick={handleBackButtonClick}>
          Back
        </button>
      </div>
      
    );
  } else if (showCards === 2){
    return (
      <div className="App">
  {/* Top Section */}
  <div className="unique-top-section">
    <h1>Submit a Website -- Reviews</h1>
    <p>
      Enter a website link below to analyze its reviews and gather information.
    </p>
    <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="unique-input-field"
            placeholder="Enter website link here for the restaurant page (yelp only)"
            value={inputValue}
            onChange={handleInputChange} // Track input changes
            required
          />
          <br></br>
          <br></br>
          <input
            type="string"
            className="unique-input-field"
            placeholder="Enter dietary restriction here"
            value={inputDiet}
            onChange={handleDietChange}
            required
            />
          <button type="submit" className="unique-cta-button" onClick={review}>
            Submit
          </button>
        </form>
  </div>

  {/* Bottom Section */}
  <div className="unique-bottom-section">
    {reviewSearchData (
          <p>
            <strong> Data: </strong> {reviewSearchData}
          </p>
        )}
    {/* Empty for now */}
  </div>
      <button className="cta-button" onClick={handleBackReviewsClick}>
          Back
        </button>
    </div>
    );
  } else if (showCards === 3){
    return (
      <div className="App">
  {/* Top Section */}
  <div className="unique-top-section">
    <h1>Submit a Website -- Menu</h1>
    <p>
      Enter the restaurant home page below to analyze its contents regarding the menu.
    </p>
    <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            className="unique-input-field"
            placeholder="Enter website link here for the restaurant page (yelp only)"
            value={inputValue}
            onChange={handleInputChange} // Track input changes
            required
          />
          <br></br>
          <br></br>
          <input
            type="string"
            className="unique-input-field"
            placeholder="Enter dietary restriction here"
            value={inputDiet}
            onChange={handleDietChange}
            required
            />
          <button type="submit" className="unique-cta-button" onclick={menu}>
            Submit
          </button>
        </form>
  </div>

  {/* Bottom Section */}
  <div className="unique-bottom-section">
    {menuSearchData (
          <p>
            <strong> Data: </strong> {menuSearchData}
          </p>
        )}
    {/* Empty for now */}
  </div>
      <button className="cta-button" onClick={handleBackMenuClick}>
          Back
        </button>
    </div>
    );

  } else {
    return (
      <div className="App">
  {/* Top Section */}
  <div className="unique-top-section">
    <h1> Holistic Search</h1>
    <p>
      Enter the specifications below to display the result of the holistic search. 
    </p>
    <form onSubmit={handleFormSubmit}>
            <input
            type="string"
            className="unique-input-field"
            placeholder="Enter dietary restriction here"
            value={inputDiet}
            onChange={handleDietChange}
            required
            />
            <br></br>
            <br></br>
            <input
            type="text"
            className="unique-input-field"
            placeholder="Enter the city for this search"
            value={inputCity}
            onChange={handleCityChange} // Track input changes
            required
          />
          <br></br>
            <br></br>
            <input
            type="text"
            className="unique-input-field"
            placeholder="Enter the state for this search"
            value={inputState}
            onChange={handleStateChange} // Track input changes
            required
          />
          <br></br>
            <br></br>
            <input
            type="text"
            className="unique-input-field"
            placeholder="Enter the cuisine for this search"
            value={inputCuisine}
            onChange={handleCuisineChange} // Track input changes
          />
          <br></br>
            <br></br>
            <input
            type="text"
            className="unique-input-field"
            placeholder="Enter the max price range (on a scale of 1-4) for this search"
            value={inputPrice}
            onChange={handlePriceChange} // Track input changes
          />
          <button type="submit" className="unique-cta-button" onclick={holistic}>
            Submit
          </button>
        </form>
  </div>

  {/* Bottom Section */}
  <div className="unique-bottom-section">
    {holisticSearchData (
          <p>
            <strong> Data: </strong> {holisticSearchData}
          </p>
        )}
    {/* Empty for now */}
  </div>
      <button className="cta-button" onClick={handleBackMenuClick}>
          Back
        </button>
    </div>
    );
  }
}

export default App;