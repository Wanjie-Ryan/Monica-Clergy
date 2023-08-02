import React from 'react'
import './profile.css'
import Avatar from '../../Assets/DefaultAvatar.png'
import {AiOutlineEye} from 'react-icons/ai'



function Profile (){


    return(

        <>


            <section className='profile'>

                <div className='profile-container'>


                    <div className="profile-title">

                        <img src ={Avatar} alt ='avatar' className='logo-profile'/>
                        
                    </div>

                        <div className="update">


                            <div className='pwd'>

                                <label className='update-text'>Change Name</label>

                                <input type='text' placeholder='Enter Your Name' className='pwd-input' />


                            </div>

                            <div className="pwd">

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


                        </div>

                </div>

               




            </section>



        </>
    )
}

export default Profile