import {useRef, useEffect, useState} from 'react'
import Review from './Review.js';

const ReviewsDisplay = ({reviews, setReviews, onEdit, allowScrollLoading, loggedIn}) => {
    const [loading,setLoading] = useState(false);
    const lastItemRef  = useRef(null);
    const [page, setPage] = useState(1);

    const imgSrcString = (image) => {
      //convert image data to dataUrl
      return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
  }
    useEffect(() => {
      if (allowScrollLoading === false) setPage(-1);
    },[allowScrollLoading])

    useEffect (() => {
      const loadPage = () => {
        fetch(`/reviews/page/${page}`)
        .then(response => response.json())
        .then((data) => {
          if (data.length > 0) {
            data = data.map((review) => {
              review.image[0] = imgSrcString(review.image[0]);
              return review;
            })
            data.reverse();
            setReviews(reviews.concat(data));
            setPage(page + 1)
          } else {
            setPage(-1); //end scroll loading
          }
          setLoading(false);
        });
      }
          const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          console.log('lastitemRef:' + lastItemRef.current.textContent + " entry:" + entry.target.textContent);
          if (entry.isIntersecting && page > -1) {
            setLoading(true);
              //fetch
              loadPage();
          }
          console.log('intersecting' + entry.isIntersecting);
        });

        //reset page display on new or edited post
        if (reviews.length === 0 && allowScrollLoading) setPage(1);
      
        //observe last item
        const last = lastItemRef.current;
        console.log('last:' + last);
        if (last) observer.observe(last);
      
        return () => {
        //remove observer on unmount
        if (last) observer.unobserve(last);
        }
      },[reviews, page, setReviews]);

    return (
        <div className="reviews-display">
          {reviews.map((review, idx, arr) => 
               <Review key={review._id} review={review} onEdit={onEdit} loggedIn={loggedIn}/>)}    
          <p ref={lastItemRef}>{loading && "Loading.."}.</p>
        </div>
    )
}

export default ReviewsDisplay;