import Modal from './Modal.js'
import SearchForm from '../Forms/SearchForm.js'
import LoginForm from '../Forms/LoginForm.js'
import LogoutForm from '../Forms/LogoutForm.js'
import SignupForm from '../Forms/SignupForm.js'
import ProfileForm from '../Forms/ProfileForm.js'
import CreatePostForm from '../Forms/CreatePostForm.js'
import EditPostForm from '../Forms/EditPostForm.js'
import AppContext from '../../AppContext.js'
import {useContext} from 'react'

const ModalDisplay = ({closeModal, activeModal, editReview, setScrollLoading}) => {
  const ctx = useContext(AppContext);
  const closeWithMessage = (message = null) => {
  //flash message modal is optional, modal will close if no message
    if (message) { 
      ctx.setFlashMessage(message);
      closeModal("flash-message-modal");
    } else {
      closeModal();
    }
  }
	const MODALS = [{label: "search-modal", component: <SearchForm close={closeWithMessage} setScrollLoading={setScrollLoading}/>},
									{label: "signup-modal", component: <SignupForm close={closeWithMessage}/>},
									{label: "profile-modal", component: <ProfileForm />},
									{label: "login-modal", component: <LoginForm  close={closeWithMessage}/>},
									{label: "logout-modal", component: <LogoutForm close={closeWithMessage}/>},
									{label: "create-post-modal", component: <CreatePostForm close={closeWithMessage}/>},
									{label: "edit-post-modal", component: <EditPostForm close={closeWithMessage} review={editReview}/>},
									{label: "flash-message-modal", component: <p>{ctx.flashMessage}</p>},
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