import {useState, useEffect} from 'react'
import FormInput from './FormInput.js'
import RatingController from './RatingController.js'
import FileInput from '../ImageLoader/FileInput.js'


const EditPostForm = ({close, review, setReviews}) => {
    const [title, setTitle] = useState(review.title); 
    const [subtitle, setSubtitle] = useState(review.subtitle); 
    const [text, setText] = useState(review.text); 
    const [ratingsArray, setRatingsArray] = useState(review.ratings);
    const [imageSrc, setImageSrc] = useState(null);

    const URL = `/reviews/edit/${review._id}`;

    useEffect(() => {
        window.scrollTo(0, 0);
    },[])

    const getRatings = (ratings, icons) => {
        const newRatings = ratings.map((rating, idx) => {
            return {rating: rating, icon: icons[idx]}
        });
        console.log(newRatings);
        setRatingsArray(newRatings);
    }


    const getImage = (canvas) => {
        canvas.toBlob(async function(blob) {
            const imgBlob = await new File([blob], 'fileName.png', {type:'image/png', lastModified:new Date()}); //blob to file object
            setImageSrc(imgBlob);
        });
    }

    const submitForm = (event) => {
      event.preventDefault();
      var data = new FormData();
      data.append("title", title);
      data.append("subtitle", subtitle);
      data.append("text", text);
      data.append("ratings", JSON.stringify(ratingsArray));
      data.append("file", imageSrc);
      fetch(URL,
          { method: 'post',
            body: data
          })
      .then(res => res.json())
      .then(data => {
          console.log(data);
          //reset page
          setReviews([]);
          close('Post edited');
      })
      .catch(e => console.log(e))
    }


    return (
        <div id="post-layout" autofocus>
            <form encType="multipart/form-data" id="post-form-data">
                <fieldset>
                    <h3>Edit Review</h3>
                    <label htmlFor="title">Title</label><br/>
                    <FormInput type="text" name="title" value={title} setter={setTitle} autocomplete="off"/><br/>
                    <label htmlFor="subtitle">Subtitle</label><br/>
                    <FormInput type="text" name="subtitle" value={subtitle} setter={setSubtitle} autocomplete="off"/><br/>
                    <label htmlFor="text">Text</label><br/>
                    <FormInput type="textarea" name="text" value={text} setter={setText} autocomplete="off"/><br/>
                    <label htmlFor="rating">Rating </label>
                    <RatingController getRatings={getRatings} initRatings={review.ratings}/>
                    </fieldset>
            </form>
            <div></div><br/>
            <FileInput getImage={getImage} fileObj={review.image[0]}/>
            <div className="done-button" onClick={submitForm}>Done</div>
        </div>
    )
}

export default EditPostForm;