import React from 'react'
import './projects.css'
import {BsSearch} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'



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




                </div>



            </section>
        
        
        
        
        </>
    )
}

export default Projects