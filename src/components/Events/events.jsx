import React from 'react'
import {Link} from 'react-router-dom'
import churchview from '../../Assets/homeImages/church_view.jpg'
import GE from '../../Assets/Events/general_events.jpg'





function Events (){


    return(


        <>

            <section className='projects'>

                <div className="projects-container">

                    <div className="actual-projects">

                        <div className="project-img">

                            <img src ={GE} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>General Events</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Events for Men</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Events for Ladies</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Events for Youths</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Events for Teens</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Events for Kids</p>

                            </div>

                            <div className="up-del">
                                
                                <p>See More</p>

                            </div>

                        </div>







                    </div>


                </div>





            </section>
           

        </>
    )
}

export default Events