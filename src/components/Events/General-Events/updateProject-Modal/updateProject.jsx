import React, { useState } from 'react';
// import '../projects.css'
import axios from 'axios'



function UpdateProjectModal({ isOpen, onClose,eventToken }) {

  const [title, setTitle] = useState('');
  const [image, setImage] = useState()
  const [description, setDescription] = useState('');
  const [loading, setLoading]= useState(false)
  const [errMsg, seterrMsg] = useState()

  const handleTitleChange = (e) => {

    setTitle(e.target.value);

  };

  const handleDescriptionChange = (e) => {

    setDescription(e.target.value);

  };

  const handleSubmit = async(e) => {

    e.preventdefault()

    const config = {
      headers: {
        Authorization: `Bearer ${eventToken}`,
      },
    };

    try{

      setLoading(true)

      const formData = new FormData();
      formData.append("file", image);

      formData.append("upload_preset", "g1e9sjte");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
        formData
      );

      const GEUpdateData = {
        title: title,
        image: imageData.data.secure_url,
        description: description,
      };

      const GEventsUpdateData = await axios.patch(
        `http://localhost:3005/api/clergy/events/updateevent/${}`,
        GEUpdateData,
        config
      );


    }

    catch(err){

      console.log(err)

    }

    
    onClose();

  };

  if (!isOpen) {

    return null;

  }

  return (

    <div className="modal">

      <div className="modal-content">

        <h2>Update General Event</h2>

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

export default UpdateProjectModal;
