import React, { useState } from 'react';
import '../projects.css'

function UpdateProjectModal({ isOpen, onClose }) {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState();

  const handleTitleChange = (e) => {

    setTitle(e.target.value);

  };

  
  const handleSubmit = () => {

    
    onClose();

  };

  if (!isOpen) {

    return null;

  }

  return (

    <div className="modal">

      <div className="modal-content">

        <h2>Update Project</h2>

        <div className="modal-input">

          <label htmlFor="title">Title:</label>

          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter project title"
          />

        </div>

        
        <div className="modal-input">

          <label htmlFor="imageFile">Image:</label>

            <input
              type="file"
              id="imageFile"
              accept="image/*"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            
            />

        </div>

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>

      </div>
    </div>

  );
}

export default UpdateProjectModal;
