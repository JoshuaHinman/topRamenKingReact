const imgSrcString = (image) => {
    return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
}

const halfIcon = (icon, number) => {
    if (Math.floor(number) < number) {
        return <span className="half-icon">{icon}<span className="half-icon-mask"></span></span>;
    }
}

const Review = ({review, onclick, onEdit, loggedIn}) => {
    return (
            <div className="review-container">
                <main>
                    <div className="img-container">
                        <img alt="noodles" src={review.image[0]}/>
                    </div>
                    <div className="review-content">
                        <h1>{review.title}</h1>
                        <h2>{review.subtitle}</h2><br/>
                        <div className="rating">
                            {review.ratings.map((rating) => {
                                return (<div key={rating.icon + Math.floor(Math.random() * 1000)}>
                                    <p>{rating.icon.repeat(rating.rating)}
                                        {halfIcon(rating.icon, rating.rating)}</p>
                                </div>)
                                })}
                        </div>
                        <h4 >{review.text}</h4>
                    </div>
                    <p className="posted-by">Posted by {review.userid.username}</p>
                </main>
                <div className="edit-buttons">
                    {(loggedIn && (loggedIn.username === review.userid.username)) &&
                        <>
                            <div className="edit" onClick={()=> {onEdit(review)}}>Edit</div>
                            <div className="delete" onClick={()=> {console.log('delete')}}>Delete</div>
                        </>}
                </div>
            </div>
    )
}

export default Review;