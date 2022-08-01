import {useState} from 'react'
import FormInput from './FormInput.js'

const LoginForm = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
   
    const URL = "/users/login";
    const submitForm = (event) => {
      event.preventDefault();
      fetch(URL,
            {method: 'post',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({username: username, password: password})
            })
      .then(res => res.json())
      .then((data) =>{
        data.signupDate = data.signupDate.split('T')[0];
        props.setLoggedIn({...data});
        
        props.close();
      })
      .catch(e => console.log(e))
    }

    return ( 
      <form onSubmit={submitForm}>
        <FormInput id="username" type="text" value={username} setter={setUsername} />
        <p>{username}</p>
        <FormInput id="password" type="text" value={password} setter={setPassword} />
        <p>{password}</p>
        <button type="submit">Submit</button>
      </form>
    );
}

export default LoginForm;
