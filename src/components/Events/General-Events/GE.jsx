import React, { useState, useEffect } from "react";
import "./Ge.css";
import generalEvents from "../../../Assets/Events/general_events.jpg";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { BiAddToQueue } from "react-icons/bi";
import CreateGEModal from "../General-Events/createGE-Modal/createGE";
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

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

  console.log(currentEvents);
  console.log(upcomingEvents);
  console.log(pastEvents);

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

  return (
    <>
      <section className="general-events">
        <p className="gen-title">General Events</p>
        {/* <p className='event-desc'>These are events that involve the whole of the church</p> */}

        <div className="search-add">
          <div className="search">
            <input type="text" placeholder="search by name of event" />

            <BsSearch className="search-icon" />
          </div>

          <div className="add" onClick={openModal}>
            <p className="add-p">Create General Event</p>
            <BiAddToQueue className="add-icon" />
          </div>
        </div>

        <div className="all-events">
          <div className="all-events-container">
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
                          Event Title: {event.title}
                        </p>
                        <p className="event-title">
                          Event Description: {event.description}
                        </p>
                        <p>Actual Date for Event:{event.ActualDate}</p>
                        <p>Registration Deadline:{event.DeadlineDate}</p>
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
                          Event Title: {event.title}
                        </p>
                        <p className="event-title">
                          Event Description: {event.description}
                        </p>
                        <p>Actual Date for Event:{event.ActualDate}</p>
                        <p>Registration Deadline:{event.DeadlineDate}</p>
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
                          Event Title: {event.title}
                        </p>
                        <p className="event-title">
                          Event Description: {event.description}
                        </p>
                        <p>Actual Date for Event:{event.ActualDate}</p>
                        <p>Registration Deadline:{event.DeadlineDate}</p>
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
          </div>
        </div>
      </section>

      <CreateGEModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}

export default GeneralEvents;
