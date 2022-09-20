import {useState, useContext} from 'react'
import AppContext from '../../AppContext.js'
import FormInput from './FormInput.js'

const LoginForm = ({close}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [formFeedback, setFormFeedback] = useState('');
    const ctx = useContext(AppContext);
    const URL = "/users/login";

    const handleFeedback =(message) => {
      if (message.includes('username'))
          setFormFeedback('username');
      else if (message.includes('password'))
          setFormFeedback('password');
  }
    const submitForm = (event) => {
      event.preventDefault();
      fetch(URL,
            {method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({username: username, password: password})
            })
      .then(res => res.json())
      .then((data) =>{
        if (data.message) {
          handleFeedback(data.message);
        } else {
          data.signupDate = data.signupDate.split('T')[0];
          ctx.setLoggedIn({...data});
          close();
        }
      })
      .catch(e => console.log(e))
    }

    return ( 
      <form onSubmit={submitForm}>
      <legend>Log in - <small>guests can log in with "guest" : "pass"</small></legend>
        <label htmlFor="username">Username</label><br/>
        <FormInput id="username" name="username" type="text" value={username} setter={setUsername} /><br/>
        {formFeedback === 'username' && <small className="validation-error">User name not found</small>}<br/>
        <label htmlFor="password">Password</label><br/>
        <FormInput id="password" name="password" type="password" value={password} setter={setPassword} /><br/>
        {formFeedback === 'password' && <small className="validation-error">Wrong password</small>}<br/>
        <input type="submit" value="Submit"/>
      </form>
    );
}

export default LoginForm;
