import {useState, useRef} from 'react'

const MyComponent = () => {
    const previewRef = useState(null);
    return (
        <div id="photo-controls">
            <label htmlFor="photo" className="large-button">Add Photo...</label>
            <input type="file" id="photo" name="photo"/>
            <span>Image will crop to square shape</span>
            <input type="button" id="rotate-clockwise" value="Rotate ↷90°"/>
            <div id="cropped-frame">
                <canvas id="preview-image" ref={previewRef}></canvas>
            </div>
            <div>
                <input type="submit" id="submitPost" value="DONE"/>
            </div>
        </div>
    )
}

export default MyComponent;