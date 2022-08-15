import {useState, useEffect} from 'react'

const RatingController = ({getRatings , initRatings = null}) => {
    const [ratings, setRatings] = useState([3]);
    const [icons, setIcons] = useState(["⭐"]);

    useEffect(() => {
        if (initRatings) {
            setRatings(initRatings.map((r) => r.rating));
            setIcons(initRatings.map((r) => r.icon));
        }
    },[])

    useEffect(() => {
        getRatings(ratings, icons);
        console.log(ratings, icons);
    },[ratings, icons])

    const changeRating = (event, idx) => {
        event.preventDefault();
        setRatings(ratings.map( (val, i) => i === idx ? event.target.value : val ));
    }

    const changeIcon = (event, idx) => {
        event.preventDefault();
        setIcons(icons.map( (val, i) => i === idx ? event.target.value : val ));
    }

    const halfIcon = (icon, number) => {
        if (Math.floor(number) < number) {
            return <span className="half-icon">{icon}<span className="half-icon-mask"></span></span>;
        }
    }

    const addRating = (event) => {
        event.preventDefault();
        if (ratings.length < 4) {
            setRatings(ratings.concat(3));
            setIcons(icons.concat("⭐"));
        }
    }

    const delRating = (event) => {
        event.preventDefault();
        if (ratings.length > 1) {
            setRatings(ratings.slice(0, -1));
            setIcons(icons.slice(0, -1));
        }
    }

    return (
        <>
            <div className="rating-controller">
                {ratings.map((rating, idx) => {
                    return (
                        <div key={"rating" + idx}>
                        <label htmlFor="icons">Choose an icon:</label>
                        <select name="icon" className="icon-selector"  autoComplete="off" value={icons[idx]} onChange={(e) => {changeIcon(e,idx)}}>
                            <option value="&#11088;">&#11088;</option>
                            <option value="&#129378;">&#129378;</option>
                            <option value="&#x1F35C;">&#x1F35C;</option>
                            <option value="&#128525;">&#128525;</option>
                            <option value="🌶️">🌶️</option>
                        </select>
                        <input type="range" className="rating-slider" name="rating" min="0" max="5" step=".5" value={rating} onChange={(e) => {changeRating(e,idx)}} />
                        <span>{icons[idx].repeat(rating)}{halfIcon(icons[idx], rating)}</span>
                        </div>
                    )
            })}
            </div>
            <div id="add-del-controls">
                <input type="button" value="+" id="add-button" disabled={ratings.length === 4} onClick={addRating}/>
                <input type="button" value="-" id="del-button" disabled={ratings.length === 1} onClick={delRating}/>
                <label htmlFor="del-button" id="add-del-label">
                    {(ratings.length < 4) && (ratings.length > 1) && "Add / Remove rating slider"}
                    {(ratings.length === 4) && "Remove rating slider"}
                    {(ratings.length === 1) && "Add rating slider"}            
                </label>
            </div>
        </>
    )
}

export default RatingController;