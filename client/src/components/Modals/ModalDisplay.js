import {useState} from 'react'
import Modal from './Modal.js'
import SearchForm from '../Forms/SearchForm.js'
import LoginForm from '../Forms/LoginForm.js'
import LogoutForm from '../Forms/LogoutForm.js'
import SignupForm from '../Forms/SignupForm.js'
import ProfileForm from '../Forms/ProfileForm.js'
import CreatePostForm from '../Forms/CreatePostForm.js'
import EditPostForm from '../Forms/EditPostForm.js'

const ModalDisplay = ({flashMessage, setFlashMessage, closeModal, loggedIn, setLoggedIn, activeModal, reviews, setReviews, editReview, setScrollLoading, addNewReview}) => {
    //console.log(editReview);
    const closeModalWithMessage = (message = null) => {
        //flash message modal is optional, modal will close if no message
        if (message) { 
            setFlashMessage(message);
            closeModal("flash-message-modal");
        } else {
            closeModal();
        }
    }
    const MODALS = [{label: "search-modal", component: <SearchForm close={closeModalWithMessage} reviews={reviews} setReviews={setReviews} setScrollLoading={setScrollLoading}/>},
                {label: "signup-modal", component: <SignupForm close={closeModalWithMessage}/>},
                {label: "profile-modal", component: <ProfileForm loggedIn={loggedIn}/>},
                {label: "login-modal", component: <LoginForm  close={closeModal} setLoggedIn={setLoggedIn}/>},
                {label: "logout-modal", component: <LogoutForm close={closeModalWithMessage} setLoggedIn={setLoggedIn}/>},
                {label: "create-post-modal", component: <CreatePostForm close={closeModalWithMessage} setReviews={setReviews} loggedIn={loggedIn}/>},
                {label: "edit-post-modal", component: <EditPostForm close={closeModalWithMessage} review={editReview} setReviews={setReviews}/>},
                {label: "flash-message-modal", component: <h4>{flashMessage}</h4>},
                {label: "confirm-delete-modal", component: <LogoutForm close={closeModalWithMessage} setLoggedIn={setLoggedIn}/>},
            ];

    return (
        <>
            {MODALS.map(modal => 
                (activeModal === modal.label) && <Modal key={modal.label} close={closeModal}>{modal.component}</Modal>
            )}
        </>
    )
}

export default ModalDisplay;