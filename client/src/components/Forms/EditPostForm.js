import {useState} from 'react'
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
        <div id="post-layout">
            <form onSubmit={submitForm} encType="multipart/form-data" id="post-form-data">
                <fieldset>
                    <h3>Post A Review</h3>
                    <label htmlFor="title">Title</label><br/>
                    <FormInput type="text" name="title" value={title} setter={setTitle} autocomplete="off"/>{title}<br/>
                    <label htmlFor="subtitle">Subtitle</label><br/>
                    <FormInput type="text" name="subtitle" value={subtitle} setter={setSubtitle} autocomplete="off"/>{subtitle}<br/>
                    <label htmlFor="text">Text</label><br/>
                    <FormInput type="text" name="text" value={text} setter={setText} autocomplete="off"/>{text}<br/>
                    <label htmlFor="rating">Rating </label>
                    <RatingController getRatings={getRatings} initRatings={review.ratings}/>
                    <input type="submit" />
                </fieldset>
            </form>
            <div></div><br/>
            <FileInput getImage={getImage} fileObj={review.image[0]}/>
        </div>
    )
}

export default EditPostForm;