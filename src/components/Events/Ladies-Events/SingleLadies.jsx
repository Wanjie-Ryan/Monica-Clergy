import React, {useState} from 'react'
// import './SingleKids.css'
import generalEvents from '../../../Assets/Events/general_events.jpg'
// import EventsRegModal from '../Events-Modal/Event-Reg-Modal'




function SingleLadies (){

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

                    <p className='events-title-single'>Events Title:</p>
                    <p className='events-title-single'>Events Description:</p>

                    <button className='event-reg-btn' onClick={openEventModal}>Register for Event</button>


                </div>


            </section>


            {/* <EventsRegModal

                isOpen={EventModalOpen}
                onClose={closeEventModal}
                

            />
         */}
        
        
        </>


    )
}


export default SingleLadies