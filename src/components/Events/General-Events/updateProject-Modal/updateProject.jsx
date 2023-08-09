import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function UpdateProjectModal({ isOpen, onClose, eventToken, GeId }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleCategoryChange = (e)=>{

    setSelectedCategory(e.target.value)
  }
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image || !description) {
      toast.error("Please fill in all the details");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${eventToken}`,
      },
    };

    try {
      setLoading(true);

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
        `http://localhost:3005/api/clergy/events/updateevent/${GeId}`,
        GEUpdateData,
        config
      );

      // console.log(GEventsUpdateData)

      toast.success("General Event was uploaded successfully");

      setLoading(false);
    } catch (err) {
      // console.log(err)
      seterrMsg("Failed to update the event");
      setLoading(false);
    }

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Update Event</h2>

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
          <label htmlFor="eventCategory">Event Category:</label>
  
            <select
              id="eventCategory"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
            <option value="">Select event category</option>
            <option value="kids">Kids</option>
            <option value="youths">Youths</option>
            <option value="men">Men</option>
            <option value="ladies">Ladies</option>
            <option value="teens">Teens</option>
          </select>

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

        <button onClick={handleSubmit}>
          {loading ? (
            <AiOutlineLoading3Quarters className="loading-icon" />
          ) : (
            "Submit"
          )}
        </button>
        <button onClick={onClose}>Cancel</button>
        {errMsg ? <p className="error-msg">{errMsg}</p> : ""}
      </div>
    </div>
  );
}

export default UpdateProjectModal;
