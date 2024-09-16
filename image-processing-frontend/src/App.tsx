import React, { useState } from 'react';
import { ImageProvider } from './context/ImageContext'; 
import ImagePreview from './components/ImagePreview';

const App: React.FC = () => {
    const [adjustments, setAdjustments] = useState({
        brightness: 1,
        contrast: 1,
        saturation: 1,
        rotation: 0
    });

    const [imageFile, setImageFile] = useState<File | null>(null); 
    const [imagePath, setImagePath] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [filename, setFilename] = useState<string | null>(null); 
    const [isPreviewReady, setIsPreviewReady] = useState(false);



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAdjustments(prev => ({
            ...prev,
            [name]: parseFloat(value)
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file); 
        }
    };

    // const handleSubmit = async () => {
    //     if (!imageFile) {
    //         alert("Please upload an image.");
    //         return;
    //     }

    //     // Create a FormData object to send image and adjustments to the backend
    //     // const formData = new FormData();
    //     // formData.append('image', imageFile);
    //     // formData.append('brightness', adjustments.brightness.toString());
    //     // formData.append('contrast', adjustments.contrast.toString());
    //     // formData.append('saturation', adjustments.saturation.toString());
    //     // formData.append('rotation', adjustments.rotation.toString());

    //     const formData = {
    //         filename: imagePath,
    //         format: 'jpeg',
    //         brightness: adjustments.brightness.toString(),
    //         contrast: adjustments.saturation.toString(),
    //         saturation: adjustments.saturation.toString(),
    //         rotation: adjustments.rotation.toString()
    //     };
    //     console.log("formData",formData);

    //     try {
    //         const response = await fetch('http://localhost:5000/api/preview', {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //         });

    //         const data = await response.json();
    //         console.log("Preview Image Path: ", data.previewPath);
           
    
    //     } catch (error) {
    //         console.error("Error uploading image:", error);
    //     }
    // };
    const upLoadImg = async () => {
        
        if (!imageFile) {
            alert("Please upload an image.");
            return;
        }

        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const response = await fetch('http://localhost:5000/api/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log("Preview Image Path: ", data.filename);
            
            setImagePath(data.filename);
        } catch (error) {
            console.error("Error uploading image:", error);
        }
    };

    const processImg = async () => {
        if (!imagePath) {
            alert("Please upload an image to process.");
            return;
        }

        
        const formData = {
            filename: imagePath,
            format: 'jpeg',
            brightness: adjustments.brightness.toString(),
            contrast: adjustments.saturation.toString(),
            saturation: adjustments.saturation.toString(),
            rotation: adjustments.rotation.toString()
        };
        console.log("formData",formData);
        

        try {
            const response = await fetch('http://localhost:5000/api/process', {
                method: 'POST',
                headers: {
                      'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            })
            const data = await response.json();
            if (data.image && data.format) {
                setIsPreviewReady(true);
                setPreviewImage(`data:image/${data.format};base64,${data.image}`);
                setFilename(data.filename);
            } else {
                console.error('Invalid response data:', data);
            }

           
        }  catch (error) {
            console.error('Error processing image:', error);
        }
    };
    const handleDownload = async () => {
        if (filename) {
            const requestData = {
                filename: filename
            };
            const response = await fetch('http://localhost:5000/api/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData),
            });

            const blob = await response.blob();
            const downloadURL = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = downloadURL;
            a.download = 'processedss-image.jpeg';
            document.body.appendChild(a);
            a.click();
            a.remove();
        }
    };

    return (
        <ImageProvider>
            <div className='container'>
            <h1>Image Processing Application</h1>

            <div className=' upload'>
            <input type="file"  accept="image/png, image/jpeg" onChange={handleImageUpload} />
            
            </div>
            <div className='add-img'>
            <button className='add-img-btn' onClick={upLoadImg}>UPLOAD</button>
            </div>
            <div className='process'>
            <div>
                <label>Brightness</label>
                <input type="range" name="brightness" min="0" max="2" step="0.1" value={adjustments.brightness} onChange={handleChange} />

                <label>Contrast</label>
                <input type="range" name="contrast" min="0" max="2" step="0.1" value={adjustments.contrast} onChange={handleChange} />

                <label>Saturation</label>
                <input type="range" name="saturation" min="0" max="2" step="0.1" value={adjustments.saturation} onChange={handleChange} />

                <label>Rotation</label>
                <input type="range" name="rotation" min="0" max="360" value={adjustments.rotation} onChange={handleChange} />
            </div>
            <ImagePreview adjustments={adjustments} />
            <button onClick={processImg}>PRIVIEW THE IMAGE</button>
            </div>
            
            {/* <div className='priview'>
            <button onClick={handleSubmit}>PRIVIEW THE IMAGE</button>
            </div> */}
            
           <div className='priviewed-images'>
                <div>
                {previewImage && <img src={previewImage} alt="Processed Image" />}
                </div>

                {isPreviewReady &&(<button className='dwld-btn' onClick={handleDownload}>Download Processed Image</button>)}
           </div>
            {/* <DownloadButton downloadImgs={downloadImg} /> */}
        </div>
        </ImageProvider>
        
    );
};

export default App;
