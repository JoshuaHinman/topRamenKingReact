import {useState} from 'react'

const imgSrcString = (image) => {
    return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
}

const halfIcon = (icon, number) => {
    if (Math.floor(number) < number) {
        return <span className="half-icon">{icon}<span className="half-icon-mask"></span></span>;
    }
}

const Review = ({review, onEdit, onDelete, loggedIn}) => {
    const [deleteClick, setDeleteClick] = useState(false);

    return (
            <div className="review-container">
                <main>
                    <div className="img-container">
                        <img alt="noodles" src={review.image[0]}/>
                    </div>
                    <div className="review-content">
                        <h2>{review.title}</h2>
                        <h3>{review.subtitle}</h3><br/>
                        <div className="rating">
                            {review.ratings.map((rating) => {
                                return (<div key={rating.icon + Math.floor(Math.random() * 1000)}>
                                    <p className="rating-display">{rating.icon.repeat(rating.rating)}
                                        {halfIcon(rating.icon, rating.rating)}</p>
                                </div>)
                                })}
                        </div>
                        <h5>{review.text}</h5>
                        <p className="posted-by">Posted by {review.userid.username}</p>

                    </div>
                </main>
                <div className="edit-ui">
                    {loggedIn && (loggedIn.username === review.userid.username) &&
                        (deleteClick === false ?
                        <>
                            <button className="edit-ui-button" onClick={()=> {setDeleteClick(true)}}>Delete</button>
                            <button className="edit-ui-button" onClick={()=> {onEdit(review)}}>Edit</button>
                        </> :
                        <>
                            <p>Delete this review?</p>
                            <button className="edit-ui-button" onClick={() => {setDeleteClick(false)}}>No</button>
                            <button className="edit-ui-button" onClick={() => {onDelete(review._id)}}>Yes</button>
                        </>
                        )
                    }
                </div>
            </div>
    )
}

export default Review;