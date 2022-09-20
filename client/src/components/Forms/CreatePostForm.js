import {useState, useContext} from 'react'
import AppContext from '../../AppContext.js'
import FormInput from './FormInput.js'
import RatingController from './RatingController.js'
import FileInput from '../ImageLoader/FileInput.js'


const CreatePostForm = ({close}) => {
    const [title, setTitle] = useState(''); 
    const [subtitle, setSubtitle] = useState(''); 
    const [text, setText] = useState(''); 
    const [ratingsArray, setRatingsArray] = useState([]);
    const [imageSrc, setImageSrc] = useState();
    const [validateMessage, setValidateMessage] = useState([]);
    const ctx = useContext(AppContext);

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

    const validateData = (data) => {
        const message = [];
        const title = data.get('title');
        const image = data.get('file');
        console.log(title)
        if(!title) {
          message.push('Your post needs a title');
        }
        if(image === "undefined") {
          message.push('Your post needs a photo');
        }
        if (message.length > 0) {
          console.log(message);
          setValidateMessage(message);
          return false;
        } else {
          console.log('no errors')
          return true;
        }
    }

    const submitForm = (event) => {
      event.preventDefault();
      var data = new FormData();
      data.append("title", title);
      data.append("subtitle", subtitle);
      data.append("text", text);
      data.append("ratings", JSON.stringify(ratingsArray));
      data.append("file", imageSrc);
      if (validateData(data)) {
        fetch(URL,
            { method: 'post',
              body: data
            })
        .then(res => res.json())
        .then((res) => {
            console.log(res);
            //reset page
            ctx.setReviews([]);
            close("New post created");
        })
        .catch(e => console.log(e))
      }
    }


    return (
         ctx.loggedIn.username ?
            (<div id="post-layout">
                <form encType="multipart/form-data" id="post-form-data">
                    <fieldset>
                        <h3>Post A Review</h3>
                        <label htmlFor="title">Title</label><br/>
                        <FormInput type="text" name="title" value={title} setter={setTitle} autocomplete="off"/><br/>
                        <label htmlFor="subtitle">Subtitle</label><br/>
                        <FormInput type="text" name="subtitle" value={subtitle} setter={setSubtitle} autocomplete="off"/><br/>
                        <label htmlFor="text">Text</label><br/>
                        <FormInput type="textarea" name="text" value={text} setter={setText} autocomplete="off"/><br/>
                        <label htmlFor="rating">Rating </label>
                        <RatingController getRatings={getRatings}/>
                        </fieldset>
                </form>
                <div></div><br/>
                <FileInput getImage={getImage}/>
                {validateMessage.map((message) => <p key={message} className="validation-error">{message}</p>)}
                <div className="done-button" onClick={submitForm}>Done</div>
            </div>) : 
            <>
              <p>You need to login to post a review</p>
              <p>Sign up to create a new profile</p>
              <p>or simply log in with "guest" : "pass"</p>
            </>
    )
}

export default CreatePostForm;

