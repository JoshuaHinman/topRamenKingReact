import {useState} from 'react'
import FormInput from './FormInput.js'

const SignupForm = ({close}) => {

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
                close('Successfully signed up as ' + data.username);})
        .catch(e => console.log(e));
    }

    return (
        <form onSubmit={submitForm} id="signupForm" className="modal-form">
            <fieldset>
                <legend>Sign Up</legend>
                <label htmlFor="username">Username</label><br/>
                <FormInput type="text" id="username" name="username" value={username} setter={setUsername} autoComplete="off"/>
                {formFeedback === 'nameTaken' && <small className="validation-error">This user name has been taken</small>}<br/>
                <label htmlFor="password">Password</label><br/>
                <FormInput type="text" id="password" name="password" value={password} setter={setPassword} autoComplete="off"/><br/>
                <label htmlFor="email">Email</label><br/>
                <FormInput type="text" id="email" name="email" value={email} setter={setEmail} autoComplete="off"/>
                {formFeedback === 'emailTaken' && <small className="validation-error">This email is already in use</small>}<br/>
                <input type="submit" value="Submit"/>
            </fieldset>
        </form>
    )
}

export default SignupForm;