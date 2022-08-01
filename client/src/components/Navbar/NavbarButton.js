const NavbarButton = (props) => {
    return (
        <>
        {props.type === 'link' ?
            <a className="navbar-button" href={props.data}>{props.label}</a>
        :   // props.type === modal
            <div className="navbar-button" onClick={(e) => props.onclick(props.data)}>{props.label}</div>} 
        </>  
    )
}

export default NavbarButton;