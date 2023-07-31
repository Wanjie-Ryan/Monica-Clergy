import React, {useState} from 'react'
import './ns.css'
import {RiMenu5Fill} from 'react-icons/ri'
import {AiOutlineEye,AiOutlineMessage,AiOutlineClose} from 'react-icons/ai'
import Avatar from '../../Assets/DefaultAvatar.png'
import {BiBell,BiStore,BiCategory,BiCopy} from 'react-icons/bi'
import {BsSearch,BsFileBarGraph} from 'react-icons/bs'
import {GoHome} from 'react-icons/go'
import {FcApproval} from 'react-icons/fc'
import {HiOutlineUsers} from 'react-icons/hi'
import {PiFlagPennant} from 'react-icons/pi'
import {CgNotes,CgEventbrite} from 'react-icons/cg'
import {RiSettingsLine} from 'react-icons/ri'
import {LiaKeySolid,LiaMoneyBillSolid} from 'react-icons/lia'
import view from '../../Assets/homeImages/view 2.jpg'
import {GrProjects} from 'react-icons/gr'



function NavSide(){


    const [showside, setShowSide] = useState(false)

    const handleSide =()=>{

        setShowSide(!showside)
    }
   

    return(

        <>

            <main id='main'>



                <aside className='aside'>

                    <div className="aside-container">

                        <div className="aside-img">

                            
                            <img src={view} alt="view" className='view'/>
                            <AiOutlineClose className='close' onClick={handleSide}/>

                            
                        </div>

                        
                        <div className="aside-details">

                            <div className='dash'>

                                <GrProjects className='dash-icon'/>
                                <p className='dash-p'>Projects</p>


                            </div>

                            <div className='others-aside'>

                                <CgEventbrite className='others-icon'/>
                                <p className='others-p'>Events</p>

                            </div>


                            <div className='others-aside'>

                                <CgNotes className='others-icon'/>
                                <p className='others-p'>Announcements</p>

                            </div>

                            <div className='others-aside'>

                                <CgNotes className='others-icon'/>
                                <p className='others-p'>Feedbacks</p>

                            </div>
                            


                        </div>

                        <div className="aside-profile">

                            <div className="aside-avatar">

                             <img src={Avatar} alt='' className='avatar-img'/>

                            </div>

                            <div className="user-details">

                                <p className='username'>Ryan Wanjie</p>
                                <p className='useremail'>ryan@gmail.com</p>

                            </div>


                        </div>

                    </div>




                </aside>


                <nav className='nav' >

                    <div className="main-nav">

                        <div className="menu-toggle">

                            <RiMenu5Fill className='menu' onClick ={handleSide} />

                        </div>

                        <div className="nav-details">

                            {/* <div className="search">


                                <input type='text' placeholder='search anything here'/>

                                <BsSearch className='search-icon'/>

                            </div> */}

                            <div className="bell small-screen">

                                <BiBell className='icon-icon '/>


                            </div>

                            <div className="bell small-screen">

                                <AiOutlineMessage className='icon-icon '/>


                            </div>

                            <div className="avatar">

                                <img src={Avatar} alt='' className='avatar-img'/>


                            </div>

                        </div>




                    </div>
                    




                </nav>

            </main>

        
        
        
        </>
    )
}

export default NavSide