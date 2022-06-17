import React, { useState, useEffect } from 'react';



import AuctionItem from './AuctionItem';
import Navbar from './Navbar';
import Footer from './Footer';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  //
  const closeDate = new Date(2022, 6, 15, 14, 0, 0);
  //

  const [items, setItems] = useState([]);
  const [loggedIn, setLoggedIn] = useState();
  const [userDetails, setuserDetails] = useState(null);
  console.log(loggedIn);

  const getAll = () => {
    fetch('/all')
      .then((res) => res.json())
      .then((data) => setItems(data));
  };

  //candidate for useEffect?
  const isLoggedIn = () => {
    fetch('/loggedin')
      .then((res) => res.json())
      .then((data) => { 
        setuserDetails(data.data);
              setLoggedIn(data.login) 
      console.log("called from children", data.data);
            });
            
  };

  const logout = () => {
    console.log("Looks like i am logging out");
    fetch("/logout", {method: 'POST'});
    const f  = () => {
      fetch('/loggedin')
      .then(res => res.json())
      .then(data => {
        setLoggedIn(data.login);
        setuserDetails(null);
      })
    };
    f();
  }

  useEffect(() => {
    getAll();
    isLoggedIn();
  }, []);

  const sendBid = (itemID) => {
    let newBid = items.filter((items) => items.id === itemID);
    const { bids, price } = newBid[0];
    let increase = 0;

    switch (true) {
      case price < 10:
        increase = 1;
        break;
      case price < 50:
        increase = 2;
        break;
      case price < 100:
        increase = 5;
        break;
      case price < 500:
        increase = 10;
        break;
      case price < 1000:
        increase = 25;
        break;
      case price < 10000:
        increase = 100;
        break;
      default:
        increase = 500;
    }

    let updatedBid = {
      bids: bids + 1,
      price: price + increase,
      id: itemID,
      highBidderID: loggedIn.id,
    };

    fetch('/bid', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedBid),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        getAll(); //this makes it refresh immediately - ok tho?
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  const deleteItem = (id) => {
    fetch('/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: id,
    })
      .then((response) => response)
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
    getAll();
  };

  const todayDate = new Date();

  return (

    <div>
      <Navbar user={userDetails} logout = {logout} loggedIn= {loggedIn} />
      <div className='container '>
        <div className='container'>
          <h4 className='text-center'>WELCOME TO AUCTIONMANIA</h4>
          <h5 className='text-center'>
            {todayDate.toLocaleString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })}
          </h5>
        </div>

        <div className='row '>
          {items
            .map((item, index) => (
              <AuctionItem
                key={item.key}
                id={item.id}
                title={item.title}
                bids={item.bids}
                price={item.price}
                highBidder={item.highBidder}
                highBidderId={item.highBidderId}
                seller={item.seller}
                date={item.dos}
                sellerId={item.sellerId}
                closeDate={closeDate}
                img={item.img}
                index={index}
                sendBid={sendBid}
                deleteItem={deleteItem}
                user={userDetails}
              />
            ))
            .sort()}
        </div>
      </div>
      <Footer />
    </div>
  
  );
};

export default App;
