import React, {useState} from 'react'
import './ns.css'
import {Link} from 'react-router-dom'
import SiteLogo from '../../Assets/favicon.jpg'
import {BiHome, BiSolidContact,BiMenu} from 'react-icons/bi'
import {FcGallery} from 'react-icons/fc'
import {MdOutlineRememberMe} from 'react-icons/md'
import {CgProfile} from 'react-icons/cg'
import {AiFillCloseCircle} from 'react-icons/ai'
import Favi from '../../Assets/DefaultAvatar.png'
import {GoHome} from 'react-icons/go'
import {CgNotes,CgEventbrite} from 'react-icons/cg'
import {GrProjects} from 'react-icons/gr'
import {FiLogOut} from 'react-icons/fi'

function Navbar() {

    const [showNav, setshowNav] = useState(false)

    const handleNav = ()=>{

        setshowNav(!showNav)
    }

    

        
        

  return (


    <>

        <nav className ='nav-main'>

            <div className="inner-nav">

                <div className="site-logo">

                    <div className="flip-box img-logo">

                        <div className="flip-box-inner">

                            <div className="flip-box-front">

                                <img className="logo" src={SiteLogo} alt="logo" />

                            </div> 

                            <div className="flip-box-back">
   
                                <p>Be Equipped For Ministry </p>
                                
                            </div> 

                        </div>

                    </div>



                </div>



                <div className="nav-details">

                    <div className="nav-links">

                        <div className='nav-links-inner remove'>

                            <Link to='/project' className='nav-p'><p className='nav-p'>Projects</p></Link>


                        </div>

                        <div className='nav-links-inner remove'>

                            <Link to='/events' className='nav-p'><p className='nav-p'>Events</p></Link>


                        </div>

                        <div className='announce remove'>

                            <Link to='/announce' className='nav-p'><p className='nav-p'>Announcements</p></Link>


                        </div>

                        <div className='nav-links-inner remove'>

                            <Link to='/feedback' className='nav-p'><p className='nav-p'>Feedbacks</p></Link>


                        </div>

                            <BiMenu className='icon-menu' onClick ={handleNav}/>
                        

                        <div className='announce-profile'>

                            <Link to='/profile' className='nav-p'>

                                <img src ={Favi} alt='img' className="logo" />
                                <p className='profile-name'>Hello, John Mureithi</p>


                            </Link>


                        </div>




                    </div>

                </div>

            </div>

        </nav>

        { showNav && (
        <aside className='side'>

            <div className="close-btn">

                <AiFillCloseCircle

                 className="close"
                 onClick ={handleNav}
                
                />

            </div>

            <div className="main-side">

                <div className="site-logo side-logo">

                    <div className="flip-box img-logo">

                        <div className="flip-box-inner">

                            <div className="flip-box-front">

                                <img className="logo" src={SiteLogo} alt="logo" />

                            </div> 

                            <div className="flip-box-back">

                                <p>Be Equipped For Ministry </p>
                                
                            </div> 

                        </div>

                    </div>

                </div>


                <div className="side-details">

                    <div className="aside-details">

                        <div className='dash'>

                            <GrProjects className='dash-icon'/>
                            <Link to ='/project' className='link-side' onClick ={handleNav}><p className='dash-p'>Projects</p></Link>

                        </div>

                        <div className='others-aside'>

                            <CgEventbrite className='others-icon'/>
                            <Link to ='/events' className='link-side' onClick ={handleNav}><p className='others-p'>Events</p></Link>

                        </div>


                        <div className='others-aside'>

                            <CgNotes className='others-icon'/>
                            <Link to ='/announce' className='link-side' onClick ={handleNav}><p className='others-p'>Announcements</p></Link>

                        </div>

                        <div className='others-aside'>

                            <CgNotes className='others-icon'/>
                            <Link to ='/feedback' className='link-side' onClick ={handleNav}><p className='others-p'>Feedbacks</p></Link>

                        </div>

                        <div className='others-aside'>

                            <FiLogOut className='others-icon'/>
                            <p className='others-p' onClick ={handleNav}>Logout</p>

                        </div>

                    </div>


                    <div className="aside-profile">

                        <div className="aside-avatar">

                            <Link to='/profile' onClick ={handleNav}><img src={Favi} alt='' /></Link>

                        </div>

                        <div className="user-details">

                            <p className='username'>Ryan Wanjie</p>
                            <p className='useremail'>ryan@gmail.com</p>

                        </div>


                    </div>

                </div>
   
            </div>

        </aside>
        
        )}


    
    
    </>


  )
}

export default Navbar