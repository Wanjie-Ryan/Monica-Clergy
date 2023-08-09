import React, {useState, useEffect} from 'react'
import './SingleGE.css'
import generalEvents from '../../../Assets/Events/general_events.jpg'
// import EventsRegModal from '../Events-Modal/Event-Reg-Modal'
import {RiDeleteBin7Fill} from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import UpdateGenModal from '../General-Events/updateProject-Modal/updateProject'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import { AiOutlineLoading3Quarters} from "react-icons/ai";
import Cookies from 'js-cookie'



function SingleGE (){

  const [updateGEId, setupdateGEId] = useState(null);

    const [EventModalOpen, setEventModalOpen] = useState(false);

    const openEventModal = (GeID) => {

        setupdateGEId(GeID);

        setEventModalOpen(true);
    };

    const closeEventModal = () => {

        setEventModalOpen(false);

    }; 

    const [Loading, setLoading] = useState(false)
    const [singGe, setSingGe] = useState()
    const [errMsg, seterrMsg] = useState()
    const {id} = useParams()
    console.log(singGe)

    useEffect(()=>{

        const SingleGe = async()=>{

            try{

                setLoading(true)

                const singleGeEvent = await axios.get(`http://localhost:3005/api/clergy/events/singleevent/${id}`)

                const singleEve = singleGeEvent.data.singleEvent

                setSingGe(singleEve)

                setLoading(false)


            }

            catch(err){

                console.log(err)
                seterrMsg('Cannot fetch Data at this time')
                setLoading(false)

            }




        }

        SingleGe()



    },[id])

    return(

        <>


            <section className="single-Events">

                {Loading ? (

                    <AiOutlineLoading3Quarters className="loading-icon" />

                ):(
                    <>

                            {singGe? (
                                <div className="single-events-container">

                                    <div className='img-cont'>

                                        <img src ={singGe.image}  alt ='single-image' className='single-image-event'/>


                                    </div>

                                    <p className='events-title-single'>Event Title:  <span className="events-desc-p-">{singGe.title} </span></p>
                                    <p className='events-title-single'>Event Description:  <span className="events-desc-p-">{singGe.description}</span></p>

                                    <div className="up-del-single">
                                                
        
                                        <BsPencil className='up-icon--sing-update' title='update' onClick ={()=>openEventModal(singGe._id)}  />
                                        <RiDeleteBin7Fill className='up-icon--sing' title='delete'/>
                                        

                                    </div>


                                 </div>
                            ):(
                                <p>{errMsg}</p>
                            )}
                      

                    </>

                )
                }


            </section>


            <UpdateGenModal

                isOpen={EventModalOpen}
                onClose={closeEventModal}
                GeId={updateGEId}
                eventToken= {Cookies.get().clergyToken}    
            />
        
        
        
        </>


    )
}


export default SingleGE