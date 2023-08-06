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
import {  AiOutlineLoading3Quarters } from "react-icons/ai";


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

    const [loading, setLoading] = useState(false)
    const [errmsg, setErrmsg] = useState('')
    const [projects, setProjects] = useState([])


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

    useEffect(()=>{

        const fetchProjects = async()=>{

            try{

                setLoading(true)

                const FetchedProjects = await axios.get('http://localhost:3005/api/clergy/projects/getAllprojects')

                // console.log(FetchedProjects.data.AllProjects)

                const AllprojectsFetched = FetchedProjects.data.AllProjects


                setProjects(AllprojectsFetched)

                setLoading(false)


            }

            catch(err){

                console.log(err)

                setErrmsg('There was an error while fetching the data, refresh the page and try again')

            }
        }

        fetchProjects()




    },[])



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

                            {
                                loading ? (

                                    <AiOutlineLoading3Quarters className="loading-icon" />
                                ):

                                projects.length === 0 ?(

                                    <p>No projects Have been found</p>
                                ):(

                                    projects.map((project,index)=>(


                                <div className="project-img" key ={index}>

                                    <img src ={project.image} alt='church' className='img-proj'/>

                                    <div className="img-text">

                                        <p className='project-desc'>{project.title}</p>

                                    </div>

                                    <div className="up-del">
                                        
                                        <BsPencil className='up-icon' title='update' onClick={UpdateopenModal}/>
                                        <RiDeleteBin7Fill className='up-icon' title='delete'/>

                                    </div>

                                    {/* <p>{projects.description}</p> */}

                                </div>

                                ))

                            )
                            }

                            
                        
                        </div>
                    


                </div>



            </section>
        
        
            <CreateProjectModal isOpen={isModalOpen} onClose={closeModal} token={Cookies.get().clergyToken}/>
            <UpdateProjectModal isOpen ={updateModalOpen} onClose ={UpdatecloseModal}/>
        
        
        </>
    )
}

export default Projects