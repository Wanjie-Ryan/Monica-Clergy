import React, {useState, useEffect} from 'react'
import './profile.css'
import Avatar from '../../Assets/DefaultAvatar.png'
import {AiOutlineEye} from 'react-icons/ai'
import {BiPowerOff} from 'react-icons/bi'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from "js-cookie";


function Profile (){

    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = async () => {
          if (
            !Cookies.get().clergyToken ||
            Cookies.get().clergyToken === undefined
          ) {
            navigate("/login");
          } else {
            const token = Cookies.get().clergyToken;
    
            const res = await axios({
              method: "get",
              url: "http://localhost:3005/api/clergy/auth/verify",
              headers: { Authorization: "Bearer " + token },
              data: {},
            });
    
            if (res.data.type !== "success") {
              navigate("/login");
            }
          }
        };
    
        checkAuth();
      }, [navigate]);
    
    
      const LogDetails = JSON.parse(localStorage.getItem("clergyLoginDetails"));

      // console.log(LogDetails)
    
      let image;
    
      if (LogDetails) {
        
        image = LogDetails.image;
      }


    return(

        <>


            <section className='profile'>

                <div className='profile-container'>


                    <div className="profile-title">

                        <img src ={image} alt ='avatar' className='logo-profile'/>
                        
                    </div>

                        <form className="update">


                            <div className='pwd update-pwd'>

                                <label className='update-text'>Change Name</label>

                                <input type='text' placeholder='Enter Your Name' className='pwd-input' />


                            </div>

                            <div className="pwd update-pwd">

                                <label className='update-text'>Change Photo</label> 
                                <input

                                    type="file"
                                    id="imageFile"
                                    accept="image/*"
                                    className='pwd-input'
                                />
                                    

                            </div>

                            <div className='pwd update-pwd'>

                                <label className='update-text'>Change Password</label>
                                <input type='password' placeholder='Password' className='pwd-input' />

                                <AiOutlineEye className='pwd-icon'/>
                            </div>

                            <div className='update-pwd'>

                                <button type='submit'>Update Details</button>
                                <button type='submit'><BiPowerOff className='prof-icon'/> Log Out</button>

                        
                            </div>

                        </form>


                </div>

               




            </section>



        </>
    )
}

export default Profile