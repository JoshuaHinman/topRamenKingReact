import {useState} from 'react'
import FormInput from './FormInput.js'

const SignupForm = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [formFeedback, setFormFeedback] = useState('');

    function handleFeedback(message) {
        if (message.includes('username'))
            setFormFeedback('nameTaken');
        else if (message.includes('email'))
            setFormFeedback('emailTaken');
    }
   
    const submitForm = (event) => {
        event.preventDefault();
        const URL = "/users/signup";
        fetch(URL,
            {method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password, email: email})
            })
        .then(res => res.json())
        .then((data) => {
            if (data.message)
                handleFeedback(data.message);
            else
                props.close('Successfully signed up as ' + data.username);})
        .catch(e => console.log(e));
    }

    return (
        <form onSubmit={submitForm} id="signupForm" className="modal-form">
            <fieldset>
                <legend>Sign Up</legend>
                <label htmlFor="username">Username</label><br/>
                <FormInput type="text" id="username" name="username" value={username} setter={setUsername} autoComplete="off"/>
                {formFeedback === 'nameTaken' && <span>This user name has been taken</span>}<br/>
                <label htmlFor="password">Password</label><br/>
                <FormInput type="text" id="password" name="password" value={password} setter={setPassword} autoComplete="off"/><br/>
                <label htmlFor="email">Email</label><br/>
                <FormInput type="text" id="email" name="email" value={email} setter={setEmail} autoComplete="off"/>
                {formFeedback === 'emailTaken' && <span>This email is already in use</span>}<br/>
                <input type="submit" value="Submit"/>
            </fieldset>
        </form>
    )
}

export default SignupForm;