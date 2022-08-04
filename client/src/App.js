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
  const [flashMessage, setFlashMessage] = useState('');


   const onEdit = (review) => {
    setEditReview(review);
    console.log(editReview);
    openModal("edit-post-modal");
   }

   const onDelete = (reviewId) => {
    fetch(`/reviews/delete/${reviewId}`, {method: 'post'})
    .then(_ => {
        //filter review with matching _id out of review array
        setReviews(reviews.filter((review) => {
          return (reviewId === review._id) ? false : true;
        }));
        //set flash message
        setFlashMessage("Review Deleted");
        closeModal("flash-message-modal");
    })
    .catch(err => console.log(err));
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
      <ModalDisplay flashMessage={flashMessage} setFlashMessage={setFlashMessage} activeModal={activeModal} closeModal={closeModal} loggedIn={loggedIn} setLoggedIn={setLoggedIn} reviews={reviews} setReviews={setReviews} editReview={editReview} setScrollLoading={setScrollLoading}/>
      <ReviewsDisplay flashMessage={flashMessage} setFlashMessage={setFlashMessage} onDelete={onDelete} reviews={reviews} setReviews={setReviews} onEdit={onEdit} allowScrollLoading={scrollLoading} loggedIn={loggedIn}/>
    </div>
  );
}

export default App;
