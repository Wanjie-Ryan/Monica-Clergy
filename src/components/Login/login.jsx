import React, {useState, useContext} from 'react'
import './login.css'
import {AiOutlineEye,AiOutlineLoading3Quarters} from 'react-icons/ai'
import view from '../../Assets/homeImages/view 2.jpg'
import {MdEmail} from 'react-icons/md'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {LogContext} from '../../context/LoginContext'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useNavigate} from 'react-router-dom'


function Login (){

    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()
    const [Loading, setLoading] = useState(false)
    const [errMsg, seterrMsg] = useState('')

    const {staff, loading, error, dispatch} = useContext(LogContext)

    const handleEmail = (e)=>{

        setEmail(e.target.value)
    }

    const handlePwd = (e)=>{

        setPwd(e.target.value)
    }

    const handleLogin = async(e)=>{

        e.preventDefault()

        if(!email || !pwd){

            toast.error("Please fill in all the fields.");
            return;
        }

        setLoading(true)

        dispatch({type:'logStart'})

        try{

            const loginData = {

                email:email,
                password:pwd
            }

            const Login =  await axios.post('http://localhost:3005/api/clergy/auth/login', loginData)

            console.log(Login)

            const loginDetails = {

                name:Login.data.clergyLogin.name,
                image:Login.data.clergyLogin.image,
                email:Login.data.clergyLogin.email,
            }

            localStorage.setItem('clergyLoginDetails', JSON.stringify(loginDetails))

            

            dispatch({type:'logComplete', payload:Login.data})

            toast.success("Login Successful");

            setLoading(false)





        }

        catch(err){

            console.log(err)
        }


    }





    return(

        <>

            <section className='login'>

                <div className='login-container'>

                        <div className="container-title">

                            <img src={view} alt="view" className='view'/>

                            <h2 className='title-watugot'>ACK St.Moinca's Church Admin LogIn</h2>



                        </div>

                        <form className="container-title" onSubmit={handleLogin}>

                            <div className="input-details">

                                <div className='pwd'>

                                    <input type='email' placeholder='Your Email Address' className='pwd-input' value={email} onChange={handleEmail} />

                                    <MdEmail className='pwd-icon'/>

                                </div>

                                <div className='pwd'>

                                    <input type='password' placeholder='Password' className='pwd-input' value={pwd} onChange={handlePwd} />

                                    <AiOutlineEye className='pwd-icon'/>
                                </div>


                            </div>

                            <button type='submit'>Sign In</button>

                        </form>

                        <p className='account'>Don't have an account yet? <Link to ='/' className='sign-link'><span className='sign-up'>Sign Up</span></Link></p>


                </div>


            </section>

        
        
        
        </>
    )
}


export default Login