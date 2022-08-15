import AppContext from '../../AppContext.js'
import {useContext} from 'react'

const ProfileForm = () => {
  const ctx = useContext(AppContext);
  return (
   <form action="#" method="post" id="profileForm" className="modal-form">
      <fieldset>
        <legend>Profile</legend>
        <p>{ctx.loggedIn.username}</p>
        <p>User since: {ctx.loggedIn.signupDate}</p>
        <p>Posts: {ctx.loggedIn.postCount}</p>
      </fieldset>
    </form>
  )
}

export default ProfileForm;