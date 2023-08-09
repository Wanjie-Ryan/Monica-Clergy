import React,{useState} from 'react'
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