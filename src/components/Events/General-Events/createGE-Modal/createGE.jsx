import React, { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';



function CreateProjectModal({ isOpen, onClose }) {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState([])
  const [acDate, setAcDate] = useState()
  const [regDate, setRegDate] = useState()
  const [description, setDescription] = useState('');

  const handleTitleChange = (e) => {

    setTitle(e.target.value);

  };

  const handleActualDate= (e)=>{

    setAcDate(e.target.value)
  }

  const handleRegDate = (e)=>{

    setRegDate(e.target.value)

  }

  const currentDate = new Date().toISOString().slice(0, 10);
  console.log(currentDate)

  console.log(acDate)

  const handleDescriptionChange = (e) => {

    setDescription(e.target.value);

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

        <h2>Create General Event</h2>

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
            // onChange={handleImageChange}
          />
          
        </div>

        <div className="modal-input">

          <label htmlFor="title">Actual Date for Event:</label>

          <input
            type="date"
            id="title"
            value={acDate}
            onChange={handleActualDate}
            min={currentDate}
            placeholder="Enter project title"
          />

        </div>

        <div className="modal-input">

          <label htmlFor="title">Registration Deadline for Event:</label>

          <input
            type="date"
            id="title"
            value={regDate}
            onChange={handleRegDate}
            min={currentDate}
            placeholder="Enter project title"
          />

        </div>

        

        <div className="modal-input">

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter project description (max-length: 50 words)"
          />

        </div>

        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Cancel</button>

      </div>
    </div>

  );
}

export default CreateProjectModal;
