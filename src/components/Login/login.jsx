import React from 'react'
import './login.css'
import {AiOutlineEye} from 'react-icons/ai'
import view from '../../Assets/homeImages/view 2.jpg'
import {MdEmail} from 'react-icons/md'
import {Link} from 'react-router-dom'

function Login (){

    return(

        <>

            <section className='login'>

                <div className='login-container'>

                        <div className="container-title">

                            <img src={view} alt="view" className='view'/>

                            <h2 className='title-watugot'>ACK St.Moinca's Church Admin LogIn</h2>



                        </div>

                        <form className="container-title">

                            <div className="input-details">

                                <div className='pwd'>

                                    <input type='email' placeholder='Your Email Address' className='pwd-input' />

                                    <MdEmail className='pwd-icon'/>

                                </div>

                                <div className='pwd'>

                                    <input type='password' placeholder='Password' className='pwd-input' />

                                    <AiOutlineEye className='pwd-icon'/>
                                </div>

                                {/* <p className='forgot'>Forgot Password?</p> */}

                            </div>

                            <Link to='/project'><button type='submit'>Sign In</button></Link>

                        </form>

                        <p className='account'>Don't have an account yet? <Link to ='/' className='sign-link'><span className='sign-up'>Sign Up</span></Link></p>


                </div>


            </section>

        
        
        
        </>
    )
}


export default Login