import NavbarButton from './NavbarButton.js'

const Navbar = ({openModal, loggedIn, setLoggedIn}) => {    

    return (
      <>
        <div className="navbar">
          <NavbarButton label="Home" type="link" data=".home"/>
          <NavbarButton label="Search" type="modal" data="search-modal" onclick={openModal}/>
          <NavbarButton label="Post" type="modal" data="create-post-modal" onclick={openModal}/>
          {(loggedIn && loggedIn.username) ?
            <>
              <NavbarButton label="Profile" type="modal" data="profile-modal" onclick={openModal}/>
              <NavbarButton label="Log Out" type="modal" data="logout-modal" onclick={openModal} logout={setLoggedIn}/>
            </> :
            <>	
              <NavbarButton label="Sign Up" type="modal" data="signup-modal" onclick={openModal}/>
              <NavbarButton label="Log In" type="modal" data="login-modal" onclick={openModal}/>
            </>
          }
        </div>
      </>
    )
}

export default Navbar;