import {useState} from 'react'
import FormInput from './FormInput.js'
import RatingController from './RatingController.js'
import FileInput from '../ImageLoader/FileInput.js'


const CreatePostForm = ({close, setReviews, loggedIn}) => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState(''); 
    const [text, setText] = useState(''); 
    const [ratingsArray, setRatingsArray] = useState([]);
    const [imageSrc, setImageSrc] = useState();

    const URL = "/reviews/create";

    const getRatings = (ratings, icons) => {
        const temp = ratings.map((rating, idx) => {
            return {rating: rating, icon: icons[idx]}
        });
        console.log(temp)
        setRatingsArray(temp);
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
      .then((res) => {
          console.log(res);
          //reset page
          setReviews([]);
          close("New post created");
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
                    <RatingController getRatings={getRatings}/>
                    <input type="submit" />
                </fieldset>
            </form>
            <div></div><br/>
            <FileInput getImage={getImage}/>
        </div>
    )
}

export default CreatePostForm;

