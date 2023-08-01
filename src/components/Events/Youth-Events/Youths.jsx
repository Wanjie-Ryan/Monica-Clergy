import React from 'react'
// import './Teens.css'
import generalEvents from '../../../Assets/Events/general_events.jpg'
import {Link} from 'react-router-dom'
 


function YouthEvents (){

    return(

        <>


            <section className="general-events">

                <p className='gen-title'>Events for Youths</p>
                <p className='event-desc'>These are the events that the Youths are involved in</p>

                <div className='all-events'>

                    <div className="all-events-container">

                        <p className='upcoming-title'>Current Events</p>


                        <div className='upcoming-events'>


                            <div className="upcoming-events-container">

                                <div className='img-cont'>
                                    
                                    <img src ={generalEvents} alt =''  className='img-events'/>
                                    <Link to = '/youth-events/:id' className='explore'>Explore</Link>

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
                                    <Link to = '/youth-events/:id' className='explore'>Explore</Link>

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
                                    <Link to = '/youth-events/:id' className='explore'>Explore</Link>

                                </div>


                                <p className='event-title'>Event Title:</p>
                                <p className='event-title'>Event Description:</p>
                                

                            </div>


                                
                        </div>

                    </div>

                </div>

            </section>
        
        
        
        </>
    )
}


export default YouthEvents