import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import churchview from '../../Assets/homeImages/church_view.jpg'
import GE from '../../Assets/Events/general_events.jpg'
import men from '../../Assets/Events/men.jpg'
import WE from '../../Assets/Events/women_events.jpg'
import './events.css'
import Youths from '../../Assets/homeImages/youth.jpg'
import kids from '../../Assets/homeImages/sunday school.jpg'
import axios from 'axios'

function Events (){


    return(


        <>

            <section className='projects'>

                <div className="projects-container">

                    <div className='add-events'><p className='add-p'>Events</p></div>

                    <div className="actual-projects">

                        <div className="project-img">

                            <p className='project-desc-events'>General Events</p>

                            <img src ={GE} alt='church' className='img-proj'/>


                            <div className="up-del">
                                
                                <Link to='/general-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>

                        <div className="project-img">

                            <p className='project-desc-events'>Events for Men</p>
                            <img src ={men} alt='church' className='img-proj'/>


                            <div className="up-del">
                                
                                <Link to='/men-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>

                        <div className="project-img">

                            <p className='project-desc-events'>Events for Ladies</p>
                            <img src ={WE} alt='church' className='img-proj'/>

                           

                            <div className="up-del">
                                
                                <Link to='/ladies-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>

                        <div className="project-img">

                            <p className='project-desc-events'>Events for Youths</p>
                            <img src ={Youths} alt='church' className='img-proj'/>

                            

                            <div className="up-del">
                                
                                <Link to='/youth-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>

                        <div className="project-img">

                            <p className='project-desc-events'>Events for Teens</p>
                            <img src ={churchview} alt='church' className='img-proj'/>

                            

                            <div className="up-del">
                                
                                <Link to='/teen-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>

                        <div className="project-img">

                            <p className='project-desc-events'>Events for Kids</p>
                            <img src ={kids} alt='church' className='img-proj'/>

                           
                            <div className="up-del">
                                
                                <Link to='/kids-events' className='links-events'><p className='see-more-events'>See More</p></Link>

                            </div>

                        </div>







                    </div>


                </div>





            </section>
           

        </>
    )
}

export default Events