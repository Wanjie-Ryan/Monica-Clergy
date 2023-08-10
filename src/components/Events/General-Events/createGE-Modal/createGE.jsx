import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";

function CreateProjectModal({ isOpen, onClose }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState([]);
  const [acDate, setAcDate] = useState();
  const [regDate, setRegDate] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState();

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleActualDate = (e) => {
    setAcDate(e.target.value);
  };

  const handleRegDate = (e) => {
    setRegDate(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const currentDate = new Date().toISOString().slice(0, 10);
  // console.log(currentDate)

  // console.log(acDate)

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !image ||
      !acDate ||
      !regDate ||
      !selectedCategory ||
      !description
    ) {
      toast.error("Please fill in all the field");
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get().clergyToken;

      const formData = new FormData();
      formData.append("file", image);

      formData.append("upload_preset", "g1e9sjte");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
        formData
      );

      const GEData = {
        title: title,
        image: imageData.data.secure_url,
        ActualDate: acDate,
        DeadlineDate: regDate,
        category: selectedCategory,
        description: description,
      };

      const CreateGEdata = await axios.post(
        "https://monica-server.onrender.com/api/clergy/events/createevent",
        GEData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(CreateGEdata)

      toast.success("Event has been created successfully");

      setLoading(false);
    } catch (err) {
      // console.log(err)
      setErrMsg("Sorry, could not be able to create the Event");
      setLoading(false);
    }

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmit}>
        <h2>Create Event</h2>

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
      </form>
    </div>
  );
}

export default CreateProjectModal;
