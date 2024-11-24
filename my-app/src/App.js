import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file first!');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('voiceFile', file);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="App">
      <div className="upload-container">
        <h2>Voice File Uploader</h2>
        <form onSubmit={handleUpload}>
          <div className="file-input-container">
            <input
              type="file"
              accept=".mp3,.wav,.opus"
              onChange={handleFileChange}
              id="fileInput"
            />
            <label htmlFor="fileInput" className="file-label">
              {file ? file.name : 'Choose a file'}
            </label>
          </div>
          <button type="submit" className="upload-btn" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
        {message && <p className={`message ${message.includes('error') ? 'error' : 'success'}`}>{message}</p>}
      </div>
    </div>
  );
}

export default App;
