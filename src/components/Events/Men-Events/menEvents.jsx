import React,{useState, useEffect} from 'react'
import generalEvents from '../../../Assets/Events/general_events.jpg'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'
import CreateMensModal from '../Men-Events/createGE-Modal/createGE'
import axios from "axios";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


function MenEvents (){


    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const navigate = useNavigate()

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

      const [currentEvents, setCurrentEvents] = useState([]);
      const [upcomingEvents, setUpcomingEvents] = useState([]);
      const [pastEvents, setPastEvents] = useState([]);
      const [loading, setLoading] = useState(false);
      const [errMsg, seterrMsg] = useState();

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
    
    
    


    return(

        <>


            <section className="general-events">

                <p className='gen-title'>Events for Men</p>
                {/* <p className='event-desc'>These are the events that the Men are involved in</p> */}

                    <div className="search-add">

                        <div className="search">


                            <input type='text' placeholder='search by name of event'/>

                            <BsSearch className='search-icon'/>

                        </div>

                        <div className="add" onClick={openModal}>

                            <p className='add-p'>Create Mens' Event</p>
                            <BiAddToQueue className='add-icon' />
                            


                        </div>

                    </div>

                <div className='all-events'>

                    <div className="all-events-container">

                        <p className='upcoming-title'>Current Events</p>


                        <div className='upcoming-events'>


                            <div className="upcoming-events-container">

                                <div className='img-cont'>
                                    
                                    <img src ={generalEvents} alt =''  className='img-events'/>
                                    <Link to = '/men-events/:id' className='explore'>Explore</Link>

                                </div>


                                <p className='event-title'>Event Title:</p>
                                <p className='event-title'>Event Description:</p>

                            </div>

                            

                            
                        
                        </div>


                        <p className='upcoming-title'>Upcoming Events</p>

                        <div className='upcoming-events'>

                            <div className="upcoming-events-container">

                                <div className='img-cont'>
                                        
                                    <img src ={generalEvents} alt =''  className='img-events'/>
                                    <Link to = '/men-events/:id' className='explore'>Explore</Link>

                                </div>


                                <p className='event-title'>Event Title:</p>
                                <p className='event-title'>Event Description:</p>
                                <p>Actual Date for Event:</p>
                                <p>Registration Deadline:</p>

                            </div>

                            

                                   
                        </div>


                        <p className='upcoming-title'>Past Events</p>

                        <div className='upcoming-events'>

                            <div className="upcoming-events-container">

                                <div className='img-cont'>
                                        
                                    <img src ={generalEvents} alt =''  className='img-events'/>
                                    <Link to = '/men-events/:id' className='explore'>Explore</Link>

                                </div>


                                <p className='event-title'>Event Title:</p>
                                <p className='event-title'>Event Description:</p>
                                

                            </div>


                                
                        </div>

                    </div>

                </div>

            </section>
        
            <CreateMensModal isOpen={isModalOpen} onClose={closeModal} />

        
        </>
    )
}


export default MenEvents