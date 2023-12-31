import React, { useState } from "react";
import "../projects.css";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateProjectModal({ isOpen, onClose, projectId, token }) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !image) {
      toast.error("Please fill in all the fields");
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

      const projectUpdateData = {
        title: title,
        image: imageData.data.secure_url,
      };

      const UpdateData = await axios.patch(
        `https://monica-server.onrender.com/api/clergy/projects/updateproject/${projectId}`,
        projectUpdateData,
        config
      );

      // console.log(UpdateData)

      toast.success("Project has been updated successfully");

      setLoading(false);
    } catch (err) {
      // console.log(err)
      seterrMsg(err.response.data.error);
      setLoading(false);
    }

    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <form className="modal-content">
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

export default UpdateProjectModal;
