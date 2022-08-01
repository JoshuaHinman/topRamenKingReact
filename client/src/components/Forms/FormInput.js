const FormInput = (props) => {

    const syncInput = (event) => {
        event.preventDefault();
        props.setter(event.target.value);
    }
    return (
        <input type={props.type} value={props.value} onChange={syncInput}/>
    )
}

export default FormInput;