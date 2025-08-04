import React, { useState } from "react"; 

const ImageUpload = () => {
    const [image, setImage] = useState(null); 
    const handleChange= (event) => {
        const file = event.target.files[0]; 

        if (!file || !file.type.startsWith("image/")){
            alert("Please upload valid image file"); 
            return; 
        }
        setImage(file); 
    }; 

    const handleUpload = () => {
        if (!image) {
            alert("No image selected"); 
            return; 
        }
    }; 

    return (
        <div className = "upload-img-container">
            <h2>Upload and Preview</h2>
            <input type = "file" accept= "image/*" onChange={handleChange}/>
            {image &&(
                <div className="preview-selection">
                    <img src = {URL.createObjectURL(image)}
                    alt ="preview" className = "preview-img"/>
                    <div>
                        <button className ="upload-img-btn" onClick={handleUpload}>Upload</button>
                    </div>
                </div> 
                
            )}
        </div>
    );
};

export default ImageUpload; 