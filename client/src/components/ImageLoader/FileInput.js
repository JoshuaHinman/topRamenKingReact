import {useState, useRef, useEffect} from 'react'

const FileInput = ({getImage, fileObj}) => {
	const [file, setFile] = useState(null);
    const [rotate, setRotate] = useState(0);
    const fullCanvasRef = useRef(document.createElement('canvas'));
    const fullCtxRef = useRef(fullCanvasRef.current.getContext('2d'));
    const croppedCanvasRef = useRef(null);
    const croppedCtxRef = useRef(null);

    useEffect(() => {
        croppedCtxRef.current = croppedCanvasRef.current.getContext('2d');
        fullCanvasRef.current.height = 800;
        fullCanvasRef.current.width = 800;
        if (fileObj) handleFiles(null, fileObj);
    },[])

    useEffect(() => {
        //scale, rotate, crop and copy image to canvas
        function transformAndRenderImage(image, canvas) { 
            let newSize, imageScale, imageX, imageY, croppedImage;
            //clear canvasess
            fullCtxRef.current.clearRect(0, 0, fullCanvasRef.current.width, fullCanvasRef.current.height);
            croppedCtxRef.current.clearRect(0, 0, fullCanvasRef.current.width, fullCanvasRef.current.height);
            //set canvas transform
            fullCtxRef.current.resetTransform();
            fullCtxRef.current.translate(fullCanvasRef.current.width / 2, fullCanvasRef.current.height / 2);
            fullCtxRef.current.rotate(rotate * Math.PI / 180);
            //calculate scaled image dimensions
            if (image.width > image.height) {       //wide image
                imageScale = canvas.width / image.width;
                newSize = image.height * imageScale;
                imageX = - (image.width / 2 * imageScale);
                imageY = - (image.height / 2 * imageScale);
            } else {                                //tall image
                imageScale = canvas.height / image.height;
                newSize = image.width * imageScale;
                imageX = - (image.width / 2 * imageScale);
                imageY = - (image.height / 2 * imageScale);
            }
            //render scaled image
            fullCtxRef.current.drawImage(image, imageX, imageY, image.width * imageScale, image.height * imageScale);
            //copy cropped image to screen
            croppedImage = fullCtxRef.current.getImageData((fullCanvasRef.current.width / 2) - (newSize / 2), (fullCanvasRef.current.height / 2) - (newSize / 2),
                                                newSize, newSize);
            croppedCanvasRef.current.width  = newSize;
            croppedCanvasRef.current.height = newSize;
            croppedCtxRef.current.putImageData(croppedImage, 0, 0);
        }

        if (file) {
            transformAndRenderImage(file , fullCanvasRef.current);
            getImage(croppedCanvasRef.current);
        }
    },[rotate, file])

    function rotateImage() {
        if (rotate === 270) {
            setRotate(0);
        } else {
            setRotate(rotate + 90);
        }
    };

    const imgSrcString = (image) => {
      return `data:image/${image.contentType};base64, ${image.data.toString('base64')}`;
    }

    const  handleFiles = (event, fileObj = null) => {
        if (event) event.preventDefault();
        const imageEl = new Image();
        let imageFile;
        let fileType;

        if (fileObj) {
          imageFile = fileObj;//imgSrcString(fileObj);
          //fileType = fileObj.contentType;
          imageEl.onload = function (event) {
            setFile(imageEl);
          }
          imageEl.src = imageFile;
        } else {
          imageFile = event.target.files[0];
          fileType = imageFile.type;
          if (fileType.match('image.*')) {
            const reader = new FileReader();
            reader.onload = function (event) {
                if (event.target.readyState === FileReader.DONE) {
                    imageEl.src = event.target.result;
                    imageEl.onload = function (event) {
                      setFile(imageEl);
                    }
                }
            }
            reader.readAsDataURL(imageFile);
          }
         }
        
    }

    return (
      <div className="image-loader">
        <label htmlFor="photo" className="photo-button">Add Photo...</label>
	      <input type="file" id="photo" onChange={ e => handleFiles(e)} />
        <canvas ref={croppedCanvasRef} width="300" height="300" style={{"width": "300px", "height":"300px"}}></canvas>
        <input type="button" value="Rotate 90°" onClick={rotateImage} />
      </div>
    )
}

export default FileInput;