import './Css/App.css';

import {useState} from 'react'
import Title from './components/Title/Title.js'
import Navbar from './components/Navbar/Navbar.js'
import ModalDisplay from './components/Modals/ModalDisplay.js'
import ReviewsDisplay from './components/Reviews/ReviewsDisplay.js'
import AppContext from './AppContext.js';

function App() {

  const [activeModal, setActiveModal] = useState('');
  const [loggedIn, setLoggedIn] = useState({username: null});
  const [reviews, setReviews] = useState([]);
  const [editReview, setEditReview] = useState(null);
  const [scrollLoading, setScrollLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const contextObj = {
    loggedIn: loggedIn, setLoggedIn: setLoggedIn,
    reviews: reviews, setReviews: setReviews,
    flashMessage: flashMessage, setFlashMessage: setFlashMessage,
    activeModal: activeModal, setActiveModal: setActiveModal
  }


   const onEdit = (review) => {
    setEditReview(review);
    console.log(editReview);
    setActiveModal("edit-post-modal");
   }

   const onDelete = (reviewId) => {
    fetch(`/reviews/delete/${reviewId}`, {method: 'post'})
    .then(_ => {
      //filter review with matching _id out of review array
      setReviews(reviews.filter((review) => {
        return (reviewId === review._id) ? false : true;
      }));
      //show flash message
      setFlashMessage("Review Deleted");
      setActiveModal("flash-message-modal");
    })
    .catch(err => console.log(err));
   }

  return (
    <div className="App">
      <Title />
      {(loggedIn && loggedIn.username) && <p className="login">Logged in as {loggedIn.username}</p>}
      <AppContext.Provider value={contextObj}>
        <Navbar openModal={setActiveModal}/>
        <ModalDisplay activeModal={activeModal}
                      closeModal={setActiveModal}
                      editReview={editReview}
                      setScrollLoading={setScrollLoading}/>
        <ReviewsDisplay onDelete={onDelete}
                        onEdit={onEdit}
                        allowScrollLoading={scrollLoading}/>
      </AppContext.Provider>
    </div>
  );
}

export default App;
