import React, { useState } from 'react';

function App() {
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [gemstoneType, setGemstoneType] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
        setErrorMessage('');
    };

    const handleVerify = async () => {
        if (!image) {
            setErrorMessage("Please upload an image before verifying.");
            return;
        }

        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch: ${response.statusText}`);
            }

            const data = await response.json();

            if (data.error) {
                throw new Error(data.error);
            }

            setGemstoneType(data.gemstoneType);
            setUploadedImage(data.imagePath);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ textAlign: 'center' }}>Gemstone Identifier</h1>
            <div style={{ marginBottom: '20px', textAlign: 'center' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button 
                    onClick={handleVerify} 
                    style={{ marginLeft: '10px', padding: '5px 10px', cursor: 'pointer' }}>
                    Verify
                </button>
            </div>
            {errorMessage && (
                <div style={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                </div>
            )}
            {gemstoneType && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <h2>Predicted Gemstone Type: {gemstoneType}</h2>
                    <img 
                        src={`http://localhost:5000${uploadedImage}`} 
                        alt="Uploaded Gemstone" 
                        style={{ maxWidth: '300px', marginTop: '10px' }} 
                    />
                </div>
            )}
        </div>
    );
}

export default App;
