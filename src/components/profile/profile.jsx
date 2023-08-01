import React from 'react'
import './profile.css'
import Avatar from '../../Assets/DefaultAvatar.png'




function Profile (){


    return(

        <>


            <section className='profile'>

                <div className='profile-container'>


                    <div className="profile-title">

                        <img src ={Avatar} alt ='avatar' className='logo-profile'/>
                        
                    </div>



                </div>

               




            </section>



        </>
    )
}

export default Profile