import React, { useState, useEffect } from "react";
import "./SingleGE.css";
import generalEvents from "../../../Assets/Events/general_events.jpg";
// import EventsRegModal from '../Events-Modal/Event-Reg-Modal'
import { RiDeleteBin7Fill } from "react-icons/ri";
import { BsPencil } from "react-icons/bs";
import UpdateGenModal from "../General-Events/updateProject-Modal/updateProject";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function SingleGE() {
  const [updateGEId, setupdateGEId] = useState(null);

  const [EventModalOpen, setEventModalOpen] = useState(false);

  const openEventModal = (GeID) => {
    setupdateGEId(GeID);

    setEventModalOpen(true);
  };

  const closeEventModal = () => {
    setEventModalOpen(false);
  };

  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [singGe, setSingGe] = useState();
  const [errMsg, seterrMsg] = useState();
  const { id } = useParams();
  // console.log(singGe)

  useEffect(() => {
    const SingleGe = async () => {
      try {
        setLoading(true);

        const singleGeEvent = await axios.get(
          `http://localhost:3005/api/clergy/events/singleevent/${id}`
        );

        const singleEve = singleGeEvent.data.singleEvent;

        setSingGe(singleEve);

        setLoading(false);
      } catch (err) {
        // console.log(err)
        seterrMsg("Cannot fetch Data at this time");
        setLoading(false);
      }
    };

    SingleGe();
  }, [id]);

  const [errDelete, seterrDelete] = useState();

  const handleDelete = async () => {
    try {
      setLoading(true);

      const token = Cookies.get().clergyToken;

      const deleteEvent = await axios.delete(
        `http://localhost:3005/api/clergy/events/deleteevent/${singGe._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request header
          },
        }
      );

      setLoading(false);
      // console.log(deleteEvent)
      toast.success("Event deleted successfully");

      setTimeout(() => {
        navigate("/general-events");
      }, 1000);
    } catch (err) {
      // console.log(err)
      seterrDelete("Cannot delete the Event at this time, refresh the page");
      setLoading(false);
    }
  };

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
          url: "http://localhost:3005/api/clergy/auth/verify",
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

  return (
    <>
      <section className="single-Events">
        {Loading ? (
          <AiOutlineLoading3Quarters className="loading-icon" />
        ) : (
          <>
            {singGe ? (
              <div className="single-events-container">
                <div className="img-cont">
                  <img
                    src={singGe.image}
                    alt="single-image"
                    className="single-image-event"
                  />
                </div>

                <p className="events-title-single">
                  Event Title:{" "}
                  <span className="events-desc-p-">{singGe.title} </span>
                </p>
                <p className="events-title-single">
                  Event Category:{" "}
                  <span className="events-desc-p-">{singGe.category} </span>
                </p>
                <p className="events-title-single">
                  Event Description:{" "}
                  <span className="events-desc-p-">{singGe.description}</span>
                </p>

                <div className="up-del-single">
                  <BsPencil
                    className="up-icon--sing-update"
                    title="update"
                    onClick={() => openEventModal(singGe._id)}
                  />

                  {Loading ? (
                    <AiOutlineLoading3Quarters className="loading-icon" />
                  ) : (
                    <RiDeleteBin7Fill
                      className="up-icon--sing"
                      title="delete"
                      onClick={handleDelete}
                    />
                  )}
                  {errDelete && <p className="error-msg">{errDelete}</p>}
                </div>
              </div>
            ) : (
              <p>{errMsg}</p>
            )}
          </>
        )}
      </section>

      <UpdateGenModal
        isOpen={EventModalOpen}
        onClose={closeEventModal}
        GeId={updateGEId}
        eventToken={Cookies.get().clergyToken}
      />
    </>
  );
}

export default SingleGE;
