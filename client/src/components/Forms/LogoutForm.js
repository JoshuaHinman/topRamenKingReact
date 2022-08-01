const LogoutForm = (props) => {

    const URL = "/users/logout";
    const submitForm = (event) => {
      event.preventDefault();
      fetch(URL, {method: 'post'})
      .then(r => console.log(r))
      .then((d) => {
          props.setLoggedIn({username: null, id: null, signupDate: null});
          props.close('Logged Out.');
      })
      .catch(e => console.log(e))
    }

    return (
        <form onSubmit={submitForm}>
            <fieldset>
                <legend>Logout?</legend>
                <input type="submit" value="Confirm"/>
            </fieldset>
        </form>
    )
}

export default LogoutForm;