import React from 'react'
import './projects.css'
import {BsSearch,BsPencil} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import churchview from '../../Assets/homeImages/church_view.jpg'
import {RiDeleteBin7Fill} from 'react-icons/ri'


function Projects (){


    return(

        <>

            <section className='projects'>

                <div className="projects-container">

                    <div className="search-add">

                        <div className="search">


                            <input type='text' placeholder='search by name of project'/>

                            <BsSearch className='search-icon'/>

                        </div>

                        <div className="add">

                            <p className='add-p'>Create Project</p>
                            <BiAddToQueue className='add-icon'/>


                        </div>

                    </div>

                    <div className="actual-projects">

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Building a complex for the Youth</p>

                            </div>

                            <div className="up-del">
                                
                                <BsPencil className='up-icon' title='update'/>
                                <RiDeleteBin7Fill className='up-icon' title='delete'/>

                            </div>

                        </div>

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                        </div>

                        

                        



                    </div>


                </div>



            </section>
        
        
        
        
        </>
    )
}

export default Projects