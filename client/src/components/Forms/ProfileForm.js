const ProfileForm = ({loggedIn}) => {
    return (
        <form action="#" method="post" id="profileForm" className="modal-form">
            <fieldset>
                <legend>Profile</legend>
                    <p>{loggedIn.username}</p>
                    <p>User since: {loggedIn.signupDate}</p>
                    <p>Posts: {loggedIn.postCount}</p>
            </fieldset>
        </form>
    )
}

export default ProfileForm;