import './Css/App.css';
//import './Scss/App.scss';

import {useState, useEffect} from 'react'
import Title from './components/Title/Title.js'
import Navbar from './components/Navbar/Navbar.js'
import ModalDisplay from './components/Modals/ModalDisplay.js'
import ReviewsDisplay from './components/Reviews/ReviewsDisplay.js'

function App() {

  const [activeModal, setActiveModal] = useState('');
  const [loggedIn, setLoggedIn] = useState({username: null});
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [scrollLoading, setScrollLoading] = useState(true);

   const onEdit = (review) => {
    setEditReview(review);
    console.log(editReview);
    openModal("edit-post-modal");
   }
   
    const openModal = (modal) => { ///////////////////// open and close model could be replaced with
      setActiveModal(modal); ///////////////////////// a simple setModal call, probably
  };
   const closeModal = (nextModal = null) => {
     //nextModal arg will open another modal, default is NULL
     setActiveModal(nextModal);
   };

  return (
    <div className="App">
      <Title />
      {(loggedIn && loggedIn.username) && <p>Logged in as {loggedIn.username}</p>}
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} openModal={openModal}/>
      <ModalDisplay activeModal={activeModal} closeModal={closeModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} reviews={reviews} setReviews={setReviews} editReview={editReview} setScrollLoading={setScrollLoading}/>
      <ReviewsDisplay reviews={reviews} setReviews={setReviews} onEdit={onEdit} allowScrollLoading={scrollLoading} loggedIn={loggedIn}/>
    </div>
  );
}

export default App;
