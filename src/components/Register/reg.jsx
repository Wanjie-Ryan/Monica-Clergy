import React, {useState} from 'react'
import './reg.css'
import {AiOutlineEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import view from '../../Assets/homeImages/view 2.jpg'
import {BsFillPersonFill,BsTelephone} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {CgProfile} from 'react-icons/cg'

function Register (){


    const [name, setName] = useState()
    const [image,setImage] = useState()
    const [email, setEmail] = useState()
    const [contact, setContact] = useState('+254')
    const [pwd, setPwd] = useState()

    const handleName = (e)=>{

        setName(e.target.value)
    }

    const handleImage = (e)=>{

        
    }

    const handleEmail = (e)=>{

        setEmail(e.target.value)
    }

    const handleContact =(phoneNumber)=>{

        setContact(phoneNumber)
    }

    const handlePwd = (e)=>{

        setPwd(e.target.value)
    }

    


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

                            <input type='text' placeholder='Enter Your Name' className='pwd-input' value ={name} onChange ={handleName} />

                            <BsFillPersonFill className='pwd-icon'/>

                        </div>

                        <div className="pwd">

                            <input
                                type="file"
                                id="imageFile"
                                accept="image/*"
                                className='pwd-input'
                                // onChange={handleImageChange}
                            />
                            
                            <CgProfile className='pwd-icon'/>

                        </div>


                        <div className='pwd'>

                            <input type='email' placeholder='Your Email Address' className='pwd-input' value={email} onChange={handleEmail} />

                            <MdEmail className='pwd-icon'/>

                        </div>

                        <div className='pwd'>

                            <PhoneInput  placeholder='Your Phone Number' className='pwd-input' onChange ={handleContact} value={contact} />

                            {/* <BsTelephone className='pwd-icon'/> */}
                        </div>

                        <div className='pwd'>

                            <input type='password' placeholder='Password' className='pwd-input' value ={pwd} onChange = {handlePwd} />

                            <AiOutlineEye className='pwd-icon'/>
                        </div>

                        {/* <p className='forgot'>Forgot Password?</p> */}

                    </div>

                    <Link to='/login'><button type='submit'>Register</button></Link>

                </form>

                <p className='account'>Already have an account? <Link to ='/login' className='sign-link'><span className='sign-up'>Sign In</span></Link></p>


            </div>




        </section>
    
    
    
    </>


  )
}

export default Register