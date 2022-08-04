const FormInput = ({type, value, setter}) => {

    const syncInput = (event) => {
        event.preventDefault();
        setter(event.target.value);
    }
    return (
        (type === 'textarea') ?
        <textarea value={value} onChange={syncInput}/> :
        <input type={type} value={value} onChange={syncInput}/>
    )
}

export default FormInput;