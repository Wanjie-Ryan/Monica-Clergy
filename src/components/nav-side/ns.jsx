import React from 'react'
import './ns.css'
import {RiMenu5Fill} from 'react-icons/ri'
import {AiOutlineEye,AiOutlineMessage} from 'react-icons/ai'
import Avatar from '../../Assets/DefaultAvatar.png'
import {BiBell,BiStore,BiCategory,BiCopy} from 'react-icons/bi'
import {BsSearch,BsFileBarGraph} from 'react-icons/bs'
// import watu from '../../assets/Watugot.png'
import {GoHome} from 'react-icons/go'
import {FcApproval} from 'react-icons/fc'
import {HiOutlineUsers} from 'react-icons/hi'
import {PiFlagPennant} from 'react-icons/pi'
import {CgNotes} from 'react-icons/cg'
import {RiSettingsLine} from 'react-icons/ri'
import {LiaKeySolid,LiaMoneyBillSolid} from 'react-icons/lia'




function NavSide(){

    return(

        <>

            <main id='main'>



                <aside className='aside'>

                    <div className="aside-container">

                        <div className="aside-img">

                            {/* <img src ={watu} alt= 'watugot' className='aside-logo'/> */}
                            
                        </div>

                        
                        <div className="aside-details">

                            <div className='dash'>

                                <GoHome className='dash-icon'/>
                                <p className='dash-p'>Dashboard</p>


                            </div>

                            <div className='others-aside'>

                                <FcApproval className='others-icon'/>
                                <p className='others-p'>Approval</p>

                            </div>

                            <div className='others-aside'>

                                <HiOutlineUsers className='others-icon'/>
                                <p className='others-p'>Users</p>

                            </div>

                            <div className='others-aside'>

                                <BiStore className='others-icon'/>
                                <p className='others-p'>Stores</p>

                            </div>

                            <div className='others-aside'>

                                <HiOutlineUsers className='others-icon'/>
                                <p className='others-p'>Watizens</p>

                            </div>

                            <div className='others-aside'>

                                <BiCategory className='others-icon'/>
                                <p className='others-p'>Categories</p>

                            </div>

                            <div className='others-aside'>

                                <BsFileBarGraph className='others-icon'/>
                                <p className='others-p'>Piactivity</p>

                            </div>

                            <div className='others-aside'>

                                <PiFlagPennant className='others-icon'/>
                                <p className='others-p'>Flagged</p>

                            </div>

                            <div className='others-aside'>

                                <CgNotes className='others-icon'/>
                                <p className='others-p'>Notification</p>

                            </div>

                            <div className='others-aside'>

                                <CgNotes className='others-icon'/>
                                <p className='others-p'>Messages</p>

                            </div>

                            <div className='others-aside'>

                                <BiCopy className='others-icon'/>
                                <p className='others-p'>Featured</p>

                            </div>

                            <div className='others-aside'>

                                <RiSettingsLine className='others-icon'/>
                                <p className='others-p'>Settings</p>

                            </div>

                            <div className='others-aside'>

                                <LiaKeySolid className='others-icon'/>
                                <p className='others-p'>Permissions</p>

                            </div>

                            <div className='others-aside'>

                                <LiaMoneyBillSolid className='others-icon'/>
                                <p className='others-p'>Bills & Payments</p>

                            </div>

                            <div className='others-aside'>

                                <CgNotes className='others-icon'/>
                                <p className='others-p'>Reports</p>

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


                <nav className='nav'>

                    <div className="main-nav">

                        <div className="menu-toggle">

                            <RiMenu5Fill className='menu'/>

                        </div>

                        <div className="nav-details">

                            <div className="search">


                                <input type='text' placeholder='search anything here'/>

                                <BsSearch className='search-icon'/>

                            </div>

                            <div className="bell">

                                <BiBell className='icon-icon'/>


                            </div>

                            <div className="bell">

                                <AiOutlineMessage className='icon-icon'/>


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