const Modal = (props) => {
    return (
        <>
            <div className="modal">
                {props.children}
                <div className="x-button" onClick={props.close}>X</div>
            </div>
        </>
    )
}

export default Modal;