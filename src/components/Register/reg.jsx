import React, {useState, useContext, useEffect} from 'react'
import './reg.css'
import {AiOutlineEye} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import view from '../../Assets/homeImages/view 2.jpg'
import {BsFillPersonFill,BsTelephone} from 'react-icons/bs'
import {MdEmail} from 'react-icons/md'
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {CgProfile} from 'react-icons/cg'
import {useNavigate} from 'react-router-dom'
import {RegContext} from '../../context/RegContext'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register (){


    const navigate = useNavigate()
    const [name, setName] = useState()
    const [image,setImage] = useState()
    const [email, setEmail] = useState()
    const [contact, setContact] = useState('+254')
    const [pwd, setPwd] = useState()
    const [Loading, setLoading] = useState(false)
    

    const {staff, loading, error, dispatch} = useContext(RegContext)


    const handleName = (e)=>{

        setName(e.target.value)
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

    const handleRegistration  = async(e)=>{

        e.preventDefault()

        if(!name || !email || !contact || !pwd){

            toast.error('Please fill in all the fields.');
            return
            
        }

        setLoading(true)

        dispatch({type:'regStart'})

        try{

            const formData = new FormData()
            formData.append('file', image)

            formData.append('upload_preset', 'nthqh135')
            const imageData = await axios.post('https://api.cloudinary.com/v1_1/djgk2k4sw/image/upload', formData)

            console.log(imageData)

            const submissionData = {

                name:name,
                image:imageData.data.secure_url,
                email:email,
                tel:contact,
                password:pwd
            }


            const registerData =  await axios.post('http://localhost:3005/api/clergy/auth/register', submissionData)

            console.log(registerData)

            dispatch({type:'regComplete', payload:registerData.data})

            toast.success('Registration Successful');


        }

        catch(err){



        }








    }


    


    return(

        <>

        <section className='register'>

            <div className='register-container'>

                <div className="container-title">

                    <img src={view} alt="view" className='view'/>
                    <h2 className='title-watugot'>ACK St.Moinca's Church Admin Registration</h2>


                </div>

                <form className="container-title" onSubmit ={handleRegistration}>

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
                                onChange = {(e)=>{setImage(e.target.files[0])}}
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

                        <button type='submit'>Register</button>

                </form>

                <p className='account'>Already have an account? <Link to ='/login' className='sign-link'><span className='sign-up'>Sign In</span></Link></p>


            </div>




        </section>
    
    
    
    </>


  )
}

export default Register