import React, { useState, useEffect } from "react";
import "./Ge.css";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import CreateGEModal from "../General-Events/createGE-Modal/createGE";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function GeneralEvents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errMsg, seterrMsg] = useState();

  // console.log(currentEvents);
  // console.log(upcomingEvents);
  // console.log(pastEvents);

  function formatCountdown(deadlineDate) {
    const deadline = new Date(deadlineDate);
    const currentTime = new Date();
    const timeDifference = deadline - currentTime;

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const FetchGenEvents = async () => {
      try {
        setLoading(true);
        const FetchedProjects = await axios.get(
          "http://localhost:3005/api/clergy/events/allevents"
        );
        const Loopdates = FetchedProjects.data.AllEvents;

        // console.log(Loopdates)

        const currentEventsArr = [];
        const upcomingEventsArr = [];
        const pastEventsArr = [];
        const currentDate = new Date().toISOString().slice(0, 10);

        Loopdates.forEach((dates) => {
          const actualDates = dates.ActualDate;
          const RegDates = dates.DeadlineDate;

          if (currentDate === actualDates) {
            currentEventsArr.push(dates);
          } else if (RegDates < actualDates) {
            upcomingEventsArr.push(dates);
          } else if (currentDate > actualDates) {
            pastEventsArr.push(dates);
          }
        });

        // console.log(actualDates)
        // console.log(RegDates)

        setCurrentEvents(currentEventsArr);
        setUpcomingEvents(upcomingEventsArr);
        setPastEvents(pastEventsArr);

        setLoading(false);
      } catch (err) {
        // console.log(err);
        setLoading(false);
        seterrMsg("Error fetching events.");
      }
    };

    FetchGenEvents();
  }, []);

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

  const [searchEvent, setsearchEvent] = useState();
  const [searchErr, setsearchErr] = useState();
  const [searchGen, setsearchGen] = useState([]);
  const [searchmsg, setsearchmsg] = useState();
  // console.log(searchGen)
  // console.log(searchmsg)

  const handleSearch = (e) => {
    setsearchEvent(e.target.value);
  };

  const searchFunc = async () => {
    try {
      setLoading(true);

      const searchGE = await axios.get(
        `http://localhost:3005/api/clergy/events/searchevent?searchTerm=${searchEvent}`
      );

      // console.log(searchGE)
      setsearchGen(searchGE.data.foundEvents);
      setsearchmsg(searchGE.data.msg);

      setLoading(false);
    } catch (err) {
      // console.log(err)
      setsearchErr("Cannot search for a general event currently");
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      searchFunc();
    }
  };

  return (
    <>
      <section className="general-events">
        <p className="gen-title">Events</p>
        {/* <p className='event-desc'>These are events that involve the whole of the church</p> */}

        <div className="search-add">
          <div className="search">
            <input
              type="text"
              placeholder="search by name of event"
              value={searchEvent}
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
            />

            <BsSearch className="search-icon" onClick={searchFunc} />
          </div>

          <div className="add" onClick={openModal}>
            <p className="add-p">Create Event</p>
            <BiAddToQueue className="add-icon" />
          </div>
        </div>

        <div className="all-events">
          <div className="all-events-container">
            {loading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : (
              <>
                {searchGen.length > 0 ? (
                  <div className="upcoming-events">
                    {searchGen.map((searchevent, index) => (
                      <div className="upcoming-events-container" key={index}>
                        <p className="upcoming-title">Searched Events</p>
                        <div className="img-cont">
                          <img
                            src={searchevent.image}
                            alt=""
                            className="img-events"
                          />
                          <Link
                            to={`/general-events/${searchevent._id}`}
                            className="explore"
                          >
                            Explore
                          </Link>
                        </div>
                        <p className="event-title">
                          Event Title:{" "}
                          <span className="events-desc-p-">
                            {searchevent.title}
                          </span>
                        </p>
                        <p className="event-title">
                          Event Description:{" "}
                          <span className="events-desc-p-">
                            {searchevent.description}
                          </span>
                        </p>
                        {/* <p>
                          Actual Date for Event:{searchGen.ActualDate.slice(0, 10)}
                        </p> */}
                        {/* <p>Registration Deadline:{event.ActualDate.slice(0, 10)}</p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="current-events-p">
                    {searchGen?.length <= 0
                      ? "The event searched for has not been found"
                      : { searchErr }}
                  </p>
                )}
              </>
            )}

            <p className="upcoming-title">Current Events</p>

            {loading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : (
              <>
                {currentEvents.length > 0 ? (
                  <div className="upcoming-events">
                    {currentEvents.map((event, index) => (
                      <div className="upcoming-events-container" key={index}>
                        <div className="img-cont">
                          <img
                            src={event.image}
                            alt=""
                            className="img-events"
                          />
                          <Link
                            to={`/general-events/${event._id}`}
                            className="explore"
                          >
                            Explore
                          </Link>
                        </div>
                        <p className="event-title">
                          Event Title:{" "}
                          <span className="events-desc-p-">{event.title}</span>
                        </p>
                        <p className="event-title">
                          Event Category:{" "}
                          <span className="events-desc-p-">{event.category}</span>
                        </p>
                        <p className="event-title">
                          Event Description:{" "}
                          <span className="events-desc-p-">
                            {event.description}
                          </span>
                        </p>
                        <p>
                          Actual Date for Event:{event.ActualDate.slice(0, 10)}
                        </p>
                        {/* <p>Registration Deadline:{event.ActualDate.slice(0, 10)}</p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="current-events-p">
                    There are no current events
                  </p>
                )}
              </>
            )}

            <p className="upcoming-title">Upcoming Events</p>

            {loading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : (
              <>
                {upcomingEvents.length > 0 ? (
                  <div className="upcoming-events">
                    {upcomingEvents.map((event, index) => (
                      <div className="upcoming-events-container" key={index}>
                        <div className="img-cont">
                          <img
                            src={event.image}
                            alt=""
                            className="img-events"
                          />
                          <Link
                            to={`/general-events/${event._id}`}
                            className="explore"
                          >
                            Explore
                          </Link>
                        </div>
                        <p className="event-title">
                          Event Title:{" "}
                          <span className="events-desc-p-">{event.title}</span>
                        </p>
                        <p className="event-title">
                          Event Category:{" "}
                          <span className="events-desc-p-">{event.category}</span>
                        </p>
                        <p className="event-title">
                          Event Description:{" "}
                          <span className="events-desc-p-">
                            {event.description}
                          </span>
                        </p>
                        <p>
                          Actual Date for Event:
                          <span className="actual-dates">
                            {event.ActualDate.slice(0, 10)}
                          </span>
                        </p>
                        <p className="event-title">
                          Registration Deadline:{" "}
                          <span className="event-deadline">
                            {event.DeadlineDate.slice(0, 10)} (
                            {formatCountdown(event.DeadlineDate)})
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="current-events-p">
                    There are no current events
                  </p>
                )}
              </>
            )}

            <p className="upcoming-title">Past Events</p>

            {loading ? (
              <AiOutlineLoading3Quarters className="loading-icon" />
            ) : (
              <>
                {pastEvents.length > 0 ? (
                  <div className="upcoming-events">
                    {pastEvents.map((event, index) => (
                      <div className="upcoming-events-container" key={index}>
                        <div className="img-cont">
                          <img
                            src={event.image}
                            alt=""
                            className="img-events"
                          />
                          <Link
                            to={`/general-events/${event._id}`}
                            className="explore"
                          >
                            Explore
                          </Link>
                        </div>
                        <p className="event-title">
                          Event Title:{" "}
                          <span className="events-desc-p-">{event.title}</span>
                        </p>
                        <p className="event-title">
                          Event Category:{" "}
                          <span className="events-desc-p-">{event.category}</span>
                        </p>
                        <p className="event-title">
                          Event Description:{" "}
                          <span className="events-desc-p-">
                            {event.description}
                          </span>
                        </p>
                        <p>
                          Actual Date for Event:
                          <span className="actual-dates">
                            {event.ActualDate.slice(0, 10)}
                          </span>
                        </p>
                        {/* <p>Registration Deadline:<span className='reg-dates'>{event.ActualDate.slice(0, 10)}</span></p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="current-events-p">There are no Past events</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      <CreateGEModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default GeneralEvents;
