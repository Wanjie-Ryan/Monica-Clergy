import React, {useState, useEffect} from 'react'
import './projects.css'
import {BsSearch,BsPencil} from 'react-icons/bs'
import {BiAddToQueue} from 'react-icons/bi'
import {Link} from 'react-router-dom'
import churchview from '../../Assets/homeImages/church_view.jpg'
import {RiDeleteBin7Fill} from 'react-icons/ri'
import CreateProjectModal from '../projects/createProject-Modal/createproject'
import UpdateProjectModal from '../projects/updateProject-Modal/updateProject'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'


function Projects (){

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    // cbjdbjsdsd

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [updateModalOpen, setupdateModalOpen] = useState(false);

    const UpdateopenModal = () => {
        setupdateModalOpen(true);
    };

    const UpdatecloseModal = () => {
        setupdateModalOpen(false);
    };

    const navigate = useNavigate()

    useEffect(()=>{

        const checkAuth = async()=>{

            if(!Cookies.get().clergyToken || Cookies.get().clergyToken === undefined){

                navigate('/login')

            }

            else{

                const token = Cookies.get().clergyToken

                const res = await axios({method:'get', url:'http://localhost:3005/api/clergy/auth/verify', headers:{Authorization:'Bearer ' + token}, data:{}})

                    if (res.data.type !== 'success') {

                        navigate('/login')

                    }


            }

            
            
        }
        
        checkAuth()


    },[navigate])



    return(

        <>

            <section className='projects'>

                <div className="projects-container">

                    <div className="search-add">

                        <div className="search">


                            <input type='text' placeholder='search by name of project'/>

                            <BsSearch className='search-icon'/>

                        </div>

                        <div className="add" onClick={openModal}>

                            <p className='add-p'>Create Project</p>
                            <BiAddToQueue className='add-icon' />


                        </div>

                    </div>

                    <div className="actual-projects">

                        <div className="project-img">

                            <img src ={churchview} alt='church' className='img-proj'/>

                            <div className="img-text">

                                <p className='project-desc'>Building a complex for the Youth</p>

                            </div>

                            <div className="up-del">
                                
                                <BsPencil className='up-icon' title='update' onClick={UpdateopenModal}/>
                                <RiDeleteBin7Fill className='up-icon' title='delete'/>

                            </div>

                        </div>

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

                        

                        



                    </div>


                </div>



            </section>
        
        
            <CreateProjectModal isOpen={isModalOpen} onClose={closeModal} token={Cookies.get().clergyToken}/>
            <UpdateProjectModal isOpen ={updateModalOpen} onClose ={UpdatecloseModal}/>
        
        
        </>
    )
}

export default Projects