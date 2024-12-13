import React, { useState } from 'react';

function App() {
    const [image, setImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [gemstoneType, setGemstoneType] = useState('');

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };

    const handleVerify = async () => {
        const formData = new FormData();
        formData.append('image', image);

        const response = await fetch('http://localhost:5000/predict', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setGemstoneType(data.gemstoneType);
        setUploadedImage(data.imagePath);
    };
    return (
      <div style={{ padding: '20px' }}>
          <h1>Gemstone Identifier</h1>
          <input type="file" onChange={handleImageUpload} />
          <button onClick={handleVerify}>Verify</button>
          {gemstoneType && (
              <div>
                  <h2>Predicted Gemstone: {gemstoneType}</h2>
                  <img src={`http://localhost:5000${uploadedImage}`} alt="Uploaded Gemstone" style={{ maxWidth: '300px' }} />
              </div>
          )}
      </div>
  );
}

export default App;
