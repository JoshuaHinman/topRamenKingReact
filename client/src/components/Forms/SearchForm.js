import {useState} from 'react'
import FormInput from './FormInput.js'

const SearchForm = ({close, reviews, setReviews, setScrollLoading}) => {

    const [searchQuery, setSearchQuery] = useState('');
    
    const URL = "/reviews/search/";

    const imgSrcString = (image) => {
        //convert image data to dataUrl
        return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
    }

    const submitForm = (event) => {
        event.preventDefault();
        fetch(URL + searchQuery)
        .then(res => res.json())
        .then((data) => {
            data = data.map((review) => {
                review.image[0] = imgSrcString(review.image[0]);
                return review;
              })
            setReviews(data);
            if (data.length > 0) {
                setScrollLoading(false);
                close();
            } else {
                close('No matching results');
            }
        })
        .catch(e => {
            console.log(e);
            close('Network error');
        });
    }

    return (
        <form onSubmit={submitForm}>
            <fieldset>
                <legend>Search</legend>
                <FormInput type="text" value={searchQuery} setter={setSearchQuery}/><br/>
                <input type="submit" value="Submit"/>
            </fieldset>
        </form>
    )
}

export default SearchForm;