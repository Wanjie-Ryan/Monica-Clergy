import React, {useState} from 'react'
import './SingleGE.css'
import generalEvents from '../../../Assets/Events/general_events.jpg'
// import EventsRegModal from '../Events-Modal/Event-Reg-Modal'
import {RiDeleteBin7Fill} from 'react-icons/ri'
import {BsPencil} from 'react-icons/bs'
import UpdateGenModal from '../General-Events/updateProject-Modal/updateProject'


function SingleGE (){

    const [EventModalOpen, setEventModalOpen] = useState(false);

    const openEventModal = () => {

        setEventModalOpen(true);
    };

    const closeEventModal = () => {

        setEventModalOpen(false);

    }; 

    return(

        <>


            <section className="single-Events">

                <div className="single-events-container">

                    <div className='img-cont'>

                        <img src ={generalEvents}  alt ='single-image' className='single-image-event'/>


                    </div>

                    <p className='events-title-single'>Event Title:</p>
                    <p className='events-title-single'>Event Description:</p>

                    <div className="up-del-single">
                                
                        <BsPencil className='up-icon' title='update' onClick ={openEventModal} />
                        <RiDeleteBin7Fill className='up-icon' title='delete'/>


                    </div>


                </div>


            </section>


            <UpdateGenModal

                isOpen={EventModalOpen}
                onClose={closeEventModal}
                
            />
        
        
        
        </>


    )
}


export default SingleGE