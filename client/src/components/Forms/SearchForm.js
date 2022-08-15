import {useState, useContext} from 'react'
import AppContext from '../../AppContext.js'
import FormInput from './FormInput.js'

const SearchForm = ({close, setScrollLoading}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const ctx = useContext(AppContext);
  const URL = "/reviews/search/";

  const imgSrcString = (image) => {
    //convert image data to dataUrl
    return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
  }

  const submitQuery = (event) => {
    event.preventDefault();
    fetch(URL + searchQuery)
    .then(res => res.json())
    .then((data) => {
      data = data.map((review) => {
        review.image[0] = imgSrcString(review.image[0]);
        return review;
      })
      ctx.setReviews(data);
      if (data.length > 0) {
        setScrollLoading(false);
        close(`${data.length} results for "${searchQuery}"`);
      } else {
        setScrollLoading(true);
        close(`No matching results for "${searchQuery}"`);
      }
    })
    .catch(e => {
      console.log(e);
      close('Network error');
    });
  }

  return (
    <form onSubmit={submitQuery}>
      <fieldset>
        <legend>Search</legend>
        <FormInput type="text" value={searchQuery} setter={setSearchQuery}/><br/>
        <input type="submit" value="Submit"/>
      </fieldset>
    </form>
  )
}

export default SearchForm;