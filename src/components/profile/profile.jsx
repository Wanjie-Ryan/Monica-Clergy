import React, { useState, useEffect } from "react";
import "./profile.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (
        !Cookies.get().clergyToken ||
        Cookies.get().clergyToken === undefined
      ) {
        navigate("/login");
      } else {
        const token = Cookies.get().clergyToken;

        const res = await axios({
          method: "get",
          url: "https://monica-server.onrender.com/api/clergy/auth/verify",
          headers: { Authorization: "Bearer " + token },
          data: {},
        });

        if (res.data.type !== "success") {
          navigate("/login");
        }
      }
    };

    checkAuth();
  }, [navigate]);

  const LogDetails = JSON.parse(localStorage.getItem("clergyLoginDetails"));

  // console.log(LogDetails)
  let image;
  let id;

  if (LogDetails) {
    image = LogDetails.image;
    id = LogDetails.id;
  }

  const [name, setName] = useState();
  const [images, setImages] = useState();
  //   const [pwd, setPwd] = useState()
  const [loading, setLoading] = useState(false);
  const [updateErr, setupdateErr] = useState();

  const handleName = (e) => {
    setName(e.target.value);
  };

  //   const handlePwd = (e)=>{

  //     setPwd(e.target.value)
  //   }

  const handleUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", images);

      formData.append("upload_preset", "nthqh135");
      const imageData = await axios.post(
        "https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload",
        formData
      );

      // console.log(formData)
      const token = Cookies.get().clergyToken;

      const updateData = {
        name: name,
        image: imageData.data.secure_url,
      };

      const updateUser = await axios.patch(
        `https://monica-server.onrender.com/api/clergy/auth/update/${id}`,
        updateData,

        { headers: { Authorization: `Bearer ${token}` } }
      );

      // console.log(updateUser)

      const details = {
        id: updateUser.data.updateClergy._id,
        image: updateUser.data.updateClergy.image,
        name: updateUser.data.updateClergy.name,
      };

      localStorage.removeItem("clergyLoginDetails");

      localStorage.setItem("clergyLoginDetails", JSON.stringify(details));

      setLoading(false);

      toast.success("Details have been updated successfully");
    } catch (err) {
      // console.log(err)
      setupdateErr("Failed to update your details, try again");
      setLoading(false);
    }
  };

  const getCookie = Cookies.get("clergyToken");
  //   console.log(getCookie)

  const handleLogout = () => {
    Cookies.remove("clergyToken");

    navigate("/login");
  };

  return (
    <>
      <section className="profile">
        <div className="profile-container">
          <div className="profile-title">
            <img src={image} alt="avatar" className="logo-profile" />
          </div>

          <form className="update" onSubmit={handleUpdate}>
            <div className="pwd update-pwd">
              <label className="update-text">Change Name</label>

              <input
                type="text"
                placeholder="Enter Your Name"
                className="pwd-input"
                value={name}
                onChange={handleName}
              />
            </div>

            <div className="pwd update-pwd">
              <label className="update-text">Change Photo</label>
              <input
                type="file"
                id="imageFile"
                accept="image/*"
                className="pwd-input"
                onChange={(e) => {
                  setImages(e.target.files[0]);
                }}
              />
            </div>

            {/* <div className='pwd update-pwd'>

                                <label className='update-text'>Change Password</label>
                                <input type='password' placeholder='Password' className='pwd-input' value={pwd} onChange={handlePwd} />

                                <AiOutlineEye className='pwd-icon'/>
                            </div> */}

            <div className="update-pwd">
              <button type="submit">
                {loading ? (
                  <AiOutlineLoading3Quarters className="loading-icon" />
                ) : (
                  "Update Details"
                )}
              </button>

              <button type="submit" onClick={handleLogout}>
                <BiPowerOff className="prof-icon" /> Log Out
              </button>
            </div>

            {updateErr && <p className="error-msg">{updateErr}</p>}
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
