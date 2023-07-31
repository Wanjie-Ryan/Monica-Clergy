import React from 'react'
import './reg.css'
import {AiOutlineEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import view from '../../Assets/homeImages/view 2.jpg'
import {BsFillPersonFill,BsTelephone} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'



function Register (){

    return(

        <>

        <section className='register'>

            <div className='register-container'>

                <div className="container-title">

                    <img src={view} alt="view" className='view'/>
                    <h2 className='title-watugot'>ACK St.Moinca's Church Admin Registration</h2>


                </div>

                <form className="container-title">

                    <div className="input-details">

                        <div className='pwd'>

                            <input type='text' placeholder='Enter Your Name' className='pwd-input' />

                            <BsFillPersonFill className='pwd-icon'/>

                        </div>


                        <div className='pwd'>

                            <input type='email' placeholder='Your Email Address' className='pwd-input' />

                            <MdEmail className='pwd-icon'/>

                        </div>

                        <div className='pwd'>

                            <input type='tel' placeholder='Your Phone Number' className='pwd-input' />

                            <BsTelephone className='pwd-icon'/>
                        </div>

                        <div className='pwd'>

                            <input type='password' placeholder='Password' className='pwd-input' />

                            <AiOutlineEye className='pwd-icon'/>
                        </div>

                        {/* <p className='forgot'>Forgot Password?</p> */}

                    </div>

                    <Link to='/dashboard'><button type='submit'>Register</button></Link>

                </form>

                <p className='account'>Already have an account? <Link to ='/login' className='sign-link'><span className='sign-up'>Sign In</span></Link></p>


            </div>




        </section>
    
    
    
    </>


  )
}

export default Register