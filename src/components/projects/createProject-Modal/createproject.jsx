import React, { useState } from "react";
import "../projects.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function CreateProjectModal({ isOpen, onClose, token }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [errmsg, seterrMsg] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmitProject = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error("Please fill in all the field");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", image);

      formData.append("upload_preset", "pq4z6rjr");

      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
        formData
      );

      const projectData = {
        title: title,
        image: imageData.data.secure_url,
        description: description,
      };

      const ProjectSubdata = await axios.post(
        "https://monica-server.onrender.com/api/clergy/projects/createproject",
        projectData,
        config
      );

      // console.log(ProjectSubdata)

      toast.success("Project has been created successfully");

      setLoading(false);
    } catch (err) {
      // console.log(err)
      seterrMsg(err.response.data.message);
      setLoading(false);
    }

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <form className="modal-content" onSubmit={handleSubmitProject}>
        <h2>Create Project</h2>

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

        <button type="submit">
          {loading ? (
            <AiOutlineLoading3Quarters className="loading-icon" />
          ) : (
            "Submit"
          )}
        </button>
        <button onClick={onClose}>Cancel</button>
        {errmsg ? <p className="error-msg">{errmsg}</p> : ""}
      </form>
    </div>
  );
}

export default CreateProjectModal;
